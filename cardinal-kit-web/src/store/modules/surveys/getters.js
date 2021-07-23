export function getSurveysList(state) {
  return (idStudy) => {
    return state.surveysList[idStudy];
  };
}

export function getSurveyDetail(state){
    return (studyId)=>{
        console.log(state.surveyDetail[studyId])
        return  state.surveyDetail[studyId]
    }
}