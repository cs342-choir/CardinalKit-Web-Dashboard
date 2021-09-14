import { initialState } from "./index";

export function RESET(state) {
  const newState = initialState();
  Object.keys(newState).forEach((key) => {
    state[key] = newState[key];
  });
}

export function saveQuestionBySurveyId(state,questions){
  state.questionBySurveyId = questions.results;
} 

export function saveAllQuestions(state,questions){
  state.allQuestions = questions.results;
} 

export function saveSurveysListData(state, { idStudy, surveys }) {
  state.surveysListData[idStudy] = JSON.parse(JSON.stringify(surveys));
} 

export function saveSurveysList(state, { idStudy, surveys }) {
  state.surveysList[idStudy] = surveys;
}

export function saveSurveyDetail(state, { results, studyId, surveyId }) {
  console.log("results",results)
  let dictResult = {};
  results.forEach((records) => {
    //each record
    records.forEach((record) => {
      if (record.results) {
        //Each Question
        record.results.forEach((question) => {
          if (
            (question.results && question.results.length > 0) ||
            !Array.isArray(question.results)
          ) {
            if (Symbol.iterator in question.results) {
              question.results.forEach((Nquestion) => {
                addQuestionToDictionary(
                  question,
                  Nquestion,
                  dictResult,
                  records["userId"]
                );
              });
            } else {
              addQuestionToDictionary(
                question,
                question.results,
                dictResult,
                records["userId"]
              );
            }
          }
        });
      }
    });
  });
  
  let surveyDetail = state.surveyDetail;
  surveyDetail[studyId] = [];
  surveyDetail[studyId][surveyId] = transformDictionaryInJsonReadable(
    dictResult
  );
  state.surveyDetail = surveyDetail;
}

function transformDictionaryInJsonReadable(dictionary) {
  let result = [];
  for (const [key, value] of Object.entries(dictionary)) {
    delete value["startDate"];
    result.push(value);
  }
  return result;
}

function addQuestionToDictionary(question, Nquestion, dictResult, userId) {
  let result = Nquestion;
  if (!Nquestion.question && question.question) {
    result["question"] = question.question;
  }
  if (!Nquestion.Options && question.Options) {
    result["Options"] = question.Options;
  }
  if (!Nquestion.questionType && question.questionType) {
    result["questionType"] = question.questionType;
  }
  if (!Nquestion.questionTypeText && question.questionTypeText) {
    result["questionTypeText"] = question.questionTypeText;
  }

  if (!result.question) {
    result["question"] = Nquestion.identifier;
  }
  result["userId"] = userId;
  addIdentifierIfNotExists(Nquestion.identifier, dictResult, Nquestion);
  if (!Nquestion.startDate) {
    result["startDate"] = question.startDate;
  }
  dictResult[Nquestion.identifier]["answers"].push(
    transformAnswerFormat(result)
  );
  delete dictResult[Nquestion.identifier]["answer"];
}

function addIdentifierIfNotExists(identifier, dictionary, question) {
  if (!dictionary[identifier]) {
    dictionary[identifier] = {};
    dictionary[identifier] = question;
    delete dictionary[identifier]["class"];
    dictionary[identifier]["answers"] = [];
  }
}

function transformAnswerFormat(question) {
  let answer = "";
  answer = question.answer;
  if (question.fileURL) {
    answer = question.fileURL;
  }
  if (question.urlStorage) {
    answer = question.urlStorage;
  }
  let date = "";
  try {
    date = question.startDate.toDate().toLocaleString('en-US',{timeZone: 'UTC'});
  } catch {
    date = "";
  }
  return { userId: question.userId, answer: answer, date: date };
}
export function saveSurveysUserQuestions(state,{results}) {
  state.SurveyUserQuestions = results
}
export function saveSurveysBuilderUser(state,{results}) {
  state.SurveyBuilderUser = results
}
export function saveUserSurveys(state,{results,userId}) {
  let dictExternal = {}
  for (const [key, value] of Object.entries(results)) {
    let dictInternal = {};
    value.forEach(record => {
        if(record.results){
          record.results.forEach((question) => {
                  if (
                    (question.results && question.results.length > 0) ||
                    !Array.isArray(question.results)
                  ) {
                    if (Symbol.iterator in question.results) {
                      question.results.forEach((Nquestion) => {
                        addQuestionToDictionary(
                          question,
                          Nquestion,
                          dictInternal,
                          userId
                        );
                      });
                      
                    } else {
                      addQuestionToDictionary(
                        question,
                        question.results,
                        dictInternal,
                        userId
                      );
                    }
                  }
                });
        }
    });
    dictExternal[key]=dictInternal
  }
  
  state.userSurveys = dictExternal
}


/// Scheduler

export function saveSchedulesByStudy(state,{studyId,tasks}){
  state.schedulesByStudy[studyId]={}
  state.schedulesByStudy[studyId]=tasks
}

export function saveSchedulerByUser(state,{studyId,userId,tasks}){
  state.schedulesByUser[studyId][userId] = {}
  state.schedulesByUser[studyId][userId] = tasks
}