import request from "@/Rest";

// fetch (data and questions) all surveys in a study
export const FetchAllSurveysData = async ({ commit }, {studyId}) => {
  let response = {};
  let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute();
  await Promise.all(
    surveysSnap.docs.map(async (survey) => {      
      if (!survey.data().deleted) {
        let surveyQuestionsSnap = 
        await request.GET(`studies/${studyId}/surveys/${survey.id}/questions`).Execute();
        let questions = {};
        surveyQuestionsSnap.forEach((question) => {
          if(!question.data().deleted)
            questions[question.id] = question.data();
        });
        response[survey.id] = {
          data: survey.data(),
          questions: questions,
        };
      }
    })
  );
  commit("saveSurveysData", {
    studyId: studyId,
    surveys: JSON.parse(JSON.stringify(response)),
  });
};

// Get all Responses of specific Survey
export const FetchSurveyDataAnswers = async (
  { commit },
  { studyId, surveyId }
) => {
  let QuestionsResults = [];
  let users = await request.GET(`studies/${studyId}/users`).Execute();
  await Promise.all(
    users.docs.map(async (user) => {
      let surveyData = await request
        .GET(`studies/${studyId}/users/${user.id}/surveys/${surveyId}`)
        .Execute();
      if (surveyData.exists) {
        let dataResuls = surveyData.data().results;
        dataResuls["userId"] = user.id;
        QuestionsResults.push(dataResuls);
      }
    })
  );
  commit("saveSurveyAnswers", {
    results: QuestionsResults,
    surveyId: surveyId,
    studyId: studyId,
  });
};

// Get Data,Questions of specific Survey
export const FetchSurveyData = async ({ commit }, { studyId, surveyId }) => {
  let questions = {};
  let surveyData = await request.GET(`studies/${studyId}/surveys/${surveyId}`).Execute();
  let questionsSnap = await request.GET(`studies/${studyId}/surveys/${surveyId}/questions`).Execute();
  questionsSnap.forEach((question) => {
    questions[question.id] = question.data();
  });
  commit("saveSurveyData", {
    data: surveyData.data(),
    questions: questions,
    surveyId: surveyId,
    studyId: studyId,
  });
};

// Get All surveys answers of specific user
export const FetchUserSurveyData = async ({ commit }, { studyId, userId }) => {
  let questionsExclude = ["summary","signature"]
  let response = {};
  //Get user answers
  let userSurveysSnap = await request.GET(`studies/${studyId}/users/${userId}/surveys`).Execute();
  // get questions data
  await Promise.all(
    userSurveysSnap.docs.map(async (survey) => {
      let id = survey.id
      //TO CHANGE
      if(survey.data().results){
        if(survey.data().results[0]){
          id = survey.data().results[0].identifier
        }
      }
      let surveyData = await request.GET(`studies/${studyId}/surveys/${id}`).Execute()
      

      if(surveyData.data()){
        let surveyQuestions = await request.GET(`studies/${studyId}/surveys/${id}/questions`).Execute()
        let questions = []
        surveyQuestions.docs.map((question)=>{
       //   console.log(question.data().type)
          if(!questionsExclude.includes(question.data().type)){
            questions.push(question.data())
          }
        })
        if(questions.length>0){
          response[id]={
            answers:survey.data(),
            data:surveyData.data(),
            questions:questions
          }
        }
      }
    }))
  // userSurveysSnap.forEach((survey) => {
  //   answers[survey.id] = survey.data();
  // });
  console.log("save")
  commit("saveUserAnswers", {studyId,userId, response});
};

//Create survey

export const AddSurvey = async ({ commit }, { studyId, id, questions, data }) => {
  await request
    .POST(`/studies/${studyId}/surveys/${id}/`, {
      data: data,
    })
    .Execute();
  Object.keys(questions).forEach(async (key) => {
    let element = questions[key];
    await request
      .POST(`/studies/${studyId}/surveys/${id}/questions/${element.id}/`, {
        data: element,
      })
      .Execute();
  });
};

//Delete Survey

export const DeleteSurvey = async ({ commit }, {studyId,surveyId}) => {
/*   console.log("survey Id",surveyId)
  console.log("study  Id",studyId) */
  
  await request.PUT(`/studies/${studyId}/surveys/${surveyId}/`,{
    data:{
      deleted:true
    }
  }).Execute()
};

//Scheduler

export const FetchStudyScheduler = async ({ commit }, { studyId }) => {
  let tasks = await request
    .GET(`/studies/${studyId}/carekit-store/v2/tasks/`)
    .Execute();
  let taskDictionary = {};
  tasks.forEach((task) => {
    taskDictionary[task.id] = task.data();
  });
  commit("saveSchedulesByStudy", { studyId: studyId, tasks: taskDictionary });
};

export const FetchUserScheduler = async ({ commit }, { studyId, userId }) => {
  let tasks = await request
    .GET(`/studies/${study}/users/${studyId}/carekit-store/v2/tasks/`)
    .Execute();
  let taskDictionary = {};
  tasks.forEach((task) => {
    taskDictionary[task.id] = task.data();
  });
  commit("saveSchedulerByUser", {
    studyId: studyId,
    tasks: taskDictionary,
    userId: userId,
  });
};

export const CreateStudySchedule = async ({ commit }, { studyId, payload }) => {
  let surveysTaskId = null;
  let scheduleElements = [];
  let tasks = await request
    .GET(`/studies/${studyId}/carekit-store/v2/tasks/`)
    .Execute();
  tasks.forEach((task) => {
    if (task.data().id && task.data().id == "surveys") {
      surveysTaskId = task.id;
      if (task.data().scheduleElements) {
        scheduleElements = task.data().scheduleElements;
        console.log("schedule", scheduleElements);
      }
    }
  });
  scheduleElements.push(payload);
  if (surveysTaskId == null) {
    await request
      .POST(`/studies/${studyId}/carekit-store/v2/tasks/`, {
        data: {
          scheduleElements: scheduleElements,
          id: "surveys",
          impactsAdherence: true,
          instructions: "Complete Daily Surveys",
          title: "Surveys",
          updateTime: new Date(),
        },
        emptyDoc: true,
      })
      .Execute();
  } else {
    await request
      .PUT(`/studies/${studyId}/carekit-store/v2/tasks/${surveysTaskId}/`, {
        data: {
          scheduleElements: scheduleElements,
          updateTime: new Date(),
        },
      })
      .Execute();
  }
};

export const CreateUserSchedule = async (
  { commit },
  { studyId, userId, payload }
) => {
  let surveysTaskId = null;
  let scheduleElements = [];
  let tasks = await request
    .GET(`/studies/${studyId}/users/${userId}/carekit-store/v2/tasks/`)
    .Execute();
  tasks.forEach((task) => {
    if (task.data().id && task.data().id == "surveys") {
      surveysTaskId = task.id;
      if (task.data().scheduleElements) {
        scheduleElements = task.data().scheduleElements;
        console.log("schedule", scheduleElements);
      }
    }
  });
  scheduleElements.push(payload);
  if (surveysTaskId == null) {
    console.log("post without id");
    await request
      .POST(`/studies/${studyId}/users/${userId}/carekit-store/v2/tasks/`, {
        data: {
          scheduleElements: scheduleElements,
          id: "surveys",
          impactsAdherence: true,
          instructions: "Complete Daily Surveys",
          title: "Surveys",
          updateTime: new Date(),
        },
        emptyDoc: true,
      })
      .Execute();
  } else {
    await request
      .PUT(
        `/studies/${studyId}/users/${userId}/carekit-store/v2/tasks/${surveysTaskId}/`,
        {
          data: {
            scheduleElements: scheduleElements,
            updateTime: new Date(),
          },
        }
      )
      .Execute();
  }
};

// //All Surveys

// export const FetchSurveyQuestions = async ({ commit }, { studyId }) => {
//   console.log("call fetch questions")
//   //let surveyquestions={}
//   let questions = [];
//   let allQuestions = [];
//   let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute();
//   await Promise.all(
//     surveysSnap.docs.map(async (survey) => {
//       let surveyData = await request
//         .GET(`studies/${studyId}/surveys/${survey.id}/questions`)
//         .Execute();
//       if (surveyData.docs.length) {
//         surveyData.docs.map((o) => {
//           allQuestions.push(o.data());
//           questions.push(o.data());
//         });
//         // surveyquestions[survey.id]=questions
//         questions = [];
//       }
//     })
//   );

//   console.log(allQuestions)
//   //  commit("saveQuestionBySurveyId",{results:surveyquestions})
//   commit("saveAllQuestions", { results: allQuestions });
// };

// // fetch all surveys of study
// export const FetchSurveyByStudy = async ({ commit }, { studyId }) => {
//   let surveysListData = {};
//   let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute();
//   await Promise.all(
//     surveysSnap.docs.map(async (survey) => {
//       let invalidQuestionTypes = ["summary", "instruction"];
//       if (!survey.data().deleted) {
//         let surveyQuestionsSnap = await request
//           .GET(`studies/${studyId}/surveys/${survey.id}/questions`)
//           .Execute();
//         let questions = {};
//         surveyQuestionsSnap.forEach((question) => {
//           if (!invalidQuestionTypes.includes(question.data().type)) {
//             questions[question.id] = question.data();
//           }
//         });
//         surveysListData[survey.id] = {
//           data: survey.data(),
//           questions: questions,
//         };
//       }
//     })
//   );
//   commit("saveSurveysListData", {
//     idStudy: studyId,
//     surveys: JSON.parse(JSON.stringify(surveysListData)),
//   });
// };

// //Get Data specific Survey
// export const FetchSurveyAllData = async ({ commit }, { studyId, surveyId }) => {
//   console.log("call survey Detail")
//   let QuestionsResults = [];
//   let users = await request.GET(`studies/${studyId}/users`).Execute();
//   await Promise.all(
//     users.docs.map(async (user) => {
//       let surveyData = await request
//         .GET(`studies/${studyId}/users/${user.id}/surveys/${surveyId}`)
//         .Execute();
//       if (surveyData.exists) {
//         let dataResuls = surveyData.data().results;
//         dataResuls["userId"] = user.id;
//         QuestionsResults.push(dataResuls);
//       }
//     })
//   );
//   commit("saveSurveyDetail", {
//     results: QuestionsResults,
//     surveyId: surveyId,
//     studyId: studyId,
//   });
// };

// // Fetch survey Data specific user
// export const FetchSurveyDataByUser = async (
//   { commit },
//   { studyId, userId }
// ) => {
//   console.log("call survey by user")
//   let surveyResults = {};
//   let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute();
//   await Promise.all(
//     surveysSnap.docs.map(async (survey) => {
//       let surveyData = await request
//         .GET(
//           `studies/${studyId}/users/${userId}/surveys/${survey.data().title}`
//         )
//         .Execute();
//       if (surveyData.exists) {
//         surveyResults[survey.id] = surveyData.data().results;
//       }
//     })
//   );
//   commit("saveUserSurveys", { results: surveyResults, userId: userId });
// };

// // fetch data from specific survey
// export const FetchSurveyData = async ({ commit }, { studyId, surveyId }) => {
//   let questions = [];
//   let questionsbyId = {};
//   let surveyData = await request
//     .GET(`studies/${studyId}/surveys/${surveyId}/questions`)
//     .Execute();
//   if (surveyData.docs.length) {
//     surveyData.docs.map((o) => {
//       questions.push(o.data());
//     });
//     questionsbyId[surveyId] = questions;
//   }
//   commit("saveSurveysUserQuestions", { results: questionsbyId });
// };

// // Create Update Survey

// export const SaveSurvey = async ({ commit }, data) => {
//   let studyId = data.studyId;
//   await request
//     .POST(`/studies/${studyId}/surveys/${data.id}/`, {
//       data: data.data,
//     })
//     .Execute();
//   Object.keys(data.questions).forEach(async (key) => {
//     let element = data.questions[key];
//     await request
//       .POST(`/studies/${studyId}/surveys/${data.id}/questions/${element.id}/`, {
//         data: element,
//       })
//       .Execute();
//   });
// };
// export const SaveQuestion = async ({ commit }, data) => {
//   let studyId = data.studyId;
//   Object.keys(data.questions).forEach(async (key) => {
//     let element = data.questions[key];
//     await request
//       .POST(`/studies/${studyId}/surveys/${data.id}/questions/${element.id}/`, {
//         data: element,
//       })
//       .Execute();
//   });
// };

// export const UpdateSurveyData = async ({ commit }, data) => {
//   let studyId = data.studyId;
//   await request
//     .PUT(`/studies/${studyId}/surveys/${data.id}/`, {
//       data: data.data,
//     })
//     .Execute();
//   if (data.questions) {
//     Object.keys(data.questions).forEach(async (key) => {
//       let element = data.questions[key];
//       await request
//         .PUT(
//           `/studies/${studyId}/surveys/${data.id}/questions/${element.id}/`,
//           {
//             data: element,
//           }
//         )
//         .Execute();
//     });
//   }
// };

// //Delete Survey

// export const DeleteSurvey = async ({ commit }, data) => {
//   let studyId = data.studyId;
//   await request.DELETE(`/studies/${studyId}/surveys/${data.name}/`).Execute();
// };

// export const DeleteSurveyQuestion = async ({ commit }, data) => {
//   let studyId = data.studyId;
//   await request
//     .DELETE(`/studies/${studyId}/surveys/${data.name}/questions/${data.id}/`)
//     .Execute();
// };
