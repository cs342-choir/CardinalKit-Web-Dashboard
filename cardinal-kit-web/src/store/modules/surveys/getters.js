export function getSurveysList(state) {
  return (idStudy) => {
    return state.surveysList[idStudy];
  };
}

export function getSurveysListData(state) {
  return (idStudy) => {
    return state.surveysListData[idStudy];
  };
}

export function getSurveyDetail(state){
  return (studyId)=>{
    console.log(state.surveyDetail[studyId])
    return  state.surveyDetail[studyId];
  }
}

export function getUserSurveys(state){
  return state.userSurveys;
}

export function getUserSurveysBuilder(state){
  return state.SurveyBuilderUser;
}