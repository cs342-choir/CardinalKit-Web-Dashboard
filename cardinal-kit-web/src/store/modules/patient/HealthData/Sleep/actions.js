import {
    FetchCategoryTypeData,
  } from "../../index";
  
  export const FetchLastSleepData = async ({ commit }, payload) => {
    commit("saveLastCategoryData", {
      category: payload.category,
      data: await Promise.all([
        FetchCategoryTypeData("HKCategoryTypeIdentifierSleepAnalysis", {...payload,limit: 1,}),
      ]),
    });
  };