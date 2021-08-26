import request from "@/Rest";
export const FetchSurveyByStudy = async ({ commit }, {studyId}) => {
  let surveysList = []
  let surveysListData = []
  let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute()
  surveysSnap.forEach((survey)=>{
    if(Object.keys(survey.data()).length){
      surveysList.push(survey.id)
      surveysListData.push(survey.data())
    }
  })
  commit("saveSurveysList",{idStudy:studyId,surveys:surveysList})
  commit("saveSurveysListData",{idStudy:studyId,surveys:surveysListData})
};

export const FetchSurveyAllData = async ({commit},{studyId,surveyId})=>{
  let QuestionsResults=[]
  let users = await request.GET(`studies/${studyId}/users`).Execute()
  await Promise.all(users.docs.map(async(user)=>{
    let surveyData = await request.GET(`studies/${studyId}/users/${user.id}/surveys/${surveyId}`).Execute()
    if(surveyData.exists){
      let dataResuls = surveyData.data().results
      dataResuls["userId"] = user.id
      QuestionsResults.push(dataResuls)
    }
  }))
  commit("saveSurveyDetail",{results:QuestionsResults,surveyId:surveyId,studyId:studyId})
}

export const FetchSurveyUserData = async ({commit},{studyId,userId})=>{
  let surveyResults={}
  let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute()
  await Promise.all( surveysSnap.docs.map(async(survey)=>{
    let surveyData = await request.GET(`studies/${studyId}/users/${userId}/surveys/${survey.id}`).Execute()

    if(surveyData.exists){
      surveyResults[survey.id]=surveyData.data().results
    }
  }))
  commit("saveUserSurveys",{results:surveyResults,userId:userId})
}

export const FetchSurveyBuilderUser = async ({commit},{studyId, questionId})=>{
  let surveyResults={}
  let surveyquestionsIds={}
  let questions=[]
  let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute()
  await Promise.all(surveysSnap.docs.map(async(survey)=>{
    let surveyData = await request.GET(`studies/${studyId}/surveys/${survey.id}/questions`).Execute()
    if (surveyData.docs.length){
      surveyData.docs.map((o) => {
        surveyResults[survey.id]=o.data()
        if (survey.id == questionId){
          questions.push(o.data())
          surveyquestionsIds[survey.id]=questions
        }
      })
    }
  }))
  commit("saveSurveysBuilderUserQuestions",{results:surveyquestionsIds})
  commit("saveSurveysBuilderUser",{results:surveyResults})
}

export const SaveSurvey = async({commit},data)=>{
  let studyId = data.studyId
  await request.POST(`/studies/${studyId}/surveys/${data.id}/`,{
    data:data.data
  }).Execute()
  Object.keys(data.questions).forEach(async key => {
    let element = data.questions[key]
    await request.POST(`/studies/${studyId}/surveys/${data.id}/questions/${element.id}/`,{
      data:element
    }).Execute()
  })
}
export const SaveQuestion = async({commit},data)=>{
   let studyId = data.studyId
  Object.keys(data.questions).forEach(async key => {
    let element = data.questions[key]
    await request.POST(`/studies/${studyId}/surveys/${data.id}/questions/${element.id}/`,{
      data:element
    }).Execute()
  })
}

export const UpdateSurveyData = async({commit},data)=>{
  let studyId = data.studyId    
  await request.PUT(`/studies/${studyId}/surveys/${data.id}/`,{
    data:data.data
  }).Execute()
  Object.keys(data.questions).forEach(async key => {
    let element = data.questions[key]
    await request.PUT(`/studies/${studyId}/surveys/${data.id}/questions/${element.id}/`, {
      data:element
    }).Execute()
  })
}

export const DeleteSurvey = async({commit},data)=>{
  let studyId = data.studyId
  await request.DELETE(`/studies/${studyId}/surveys/${data.name}/`).Execute()
}

export const DeleteSurveyQuestion = async({commit},data)=>{
  let studyId = data.studyId
  await request.DELETE(`/studies/${studyId}/surveys/${data.name}/questions/${data.id}/`).Execute()
}