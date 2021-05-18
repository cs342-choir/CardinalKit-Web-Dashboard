import request from "@/Rest";

export function reset({ commit }) {
  commit("RESET");
}

export const FetchUserHealthData = async ({ commit }, payload) => {
  const userSnap = await request.GET(
    `studies/${payload.studyId}/users/${payload.userId}/healthFhir`
  );
  const records = userSnap.docs.map((record) => {
    return record.data();
  });
  commit("saveHealthData", records);
};

export const FetchActivityUser = async ({commit}, payload)=>{
  let start = new Date('2021-05-12');
  let userSnap = await request.GET_WHERE(`studies/${payload.studyId}/users/${payload.userId}/healthKit`,
  [
    ["header.schema_id.name","==","step-count"],
    ["create_At",">",start]
  ]);
  let records = userSnap.docs.map((record) => {
    return record.data();
  });
  // userSnap = await request.GET_WHERE(`studies/${payload.studyId}/users/${payload.userId}/healthKit`,
  // [
  //   ["header.schema_id.name","==","hk-quantity-sample"],
  //   ["header.create_At",">",start]
  // ]);
  // records = records.concat(userSnap.docs.map((record) => {
  //   return record.data();
  // }));
  // userSnap = await request.GET_WHERE(`studies/${payload.studyId}/users/${payload.userId}/healthKit`,
  // [
  //   ["header.schema_id.name","==","hk-workout"],
  //   ["header.create_At",">",start]
  // ]);
  // records = records.concat(userSnap.docs.map((record) => {
  //   return record.data();
  // }));
  // userSnap = await request.GET_WHERE(`studies/${payload.studyId}/users/${payload.userId}/healthKit`,
  // [
  //   ["header.schema_id.name","==","step-count"],
  //   ["header.create_At",">",start]
  // ]);
  // records = records.concat(userSnap.docs.map((record) => {
  //   return record.data();
  // }));
  console.log("records",records)
  commit("saveHealthData", records);
}