import request from "@/Rest";
export const FetchSurveyByStudy = async ({ commit }, {studyId}) => {
   let surveysList = []
   let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute()
   surveysSnap.forEach((survey)=>{
     surveysList.push(survey.id)
   })
   commit("saveSurveysList",{idStudy:studyId,surveys:surveysList})
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