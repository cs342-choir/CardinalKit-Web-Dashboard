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

export const FetchSurveyUserData = async ({commit},{studyId,userId})=>{
  let surveyResults={}
  let surveysSnap = await request.GET(`studies/${studyId}/surveys`).Execute()
  await Promise.all( surveysSnap.docs.map(async(survey)=>{
    let surveyData = await request.GET(`studies/${studyId}/users/${userId}/surveys/${survey.id}`).Execute()
    if(surveyData.exists){
      surveyResults[survey.id]=surveyData.data().results
    }
  }))
  console.log("userId",userId)
  commit("saveUserSurveys",{results:surveyResults,userId:userId})
}