import {
    FetchQuantityData,
  } from "../../index";
  
  export const FetchLastMobilityData = async ({ commit }, payload) => {
    commit("saveLastCategoryData", {
      category: payload.category,
      data: await Promise.all([
        FetchQuantityData("HKQuantityTypeIdentifierWalkingDoubleSupportPercentage", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierStairDescentSpeed", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierStairAscentSpeed", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierWalkingSpeed", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierSixMinuteWalkTestDistance", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierwalkingAsymmetryPercentage", {...payload,limit: 1,}),
      ]),
    });
  };