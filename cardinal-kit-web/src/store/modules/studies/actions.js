import request from "@/Rest";

export function reset({ commit }) {
  commit("RESET");
}

export const FetchAllStudies = async ({ commit }) => {
  let studies = [];
  const studiesSnap = await request.GET("studies");
  studiesSnap.forEach((study) => {
    studies.push({
      id: study.id,
      text: study.id,
      ...study.data(),
    });
  });
  
  console.log("aca return antes")
  commit("saveStudies", studies);
  console.log("aca return despues")
  return studies
};

export const FetchStudyHealthData = async ({ commit }, payload) => {
  let allRecords = [];
  const dataSnap = await request.GET(`studies/${payload.studyId}/users`);
  allRecords = await Promise.all(dataSnap.docs.map(async (user) => {
    const userSnap = await request.GET(
      `studies/${payload.studyId}/users/${user.id}/healthFhir`
    );
    const records = userSnap.docs.map((record) => {
      return record.data()
    })
    return records
  }));
  console.log(allRecords)
  commit("saveRecords", allRecords);
};


export const FetchUsers = async ({commit},payload)=>{
  let allUsers = [];
  const usersSnap = await request.GET(`studies/${payload.studyId}/users`);
  allUsers = usersSnap.docs.map((record) => {
    return {id:record.id,...record.data()}
  })
  commit("SaveUsers", allUsers)
}