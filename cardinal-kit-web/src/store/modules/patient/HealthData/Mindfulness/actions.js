import { FetchQuantityData, FetchCategoryTypeData } from "../../index";

export const FetchLastMindfulnessData = async ({ commit }, payload) => {
  commit("saveLastCategoryData", {
    category: payload.category,
    data: await Promise.all([
      FetchCategoryTypeData("HKCategoryTypeIdentifierMindfulSession", {...payload,limit: 1,}),
    ]),
  });
};
