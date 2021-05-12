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
