import {
  FetchLastQuantityData,
  } from "../../index";
  
  export const FetchLastMobilityData = async ({ commit }, payload) => {
    commit("saveLastCategoryData", {
      category: payload.category,
      data: await Promise.all([
        FetchLastQuantityData("HKQuantityTypeIdentifierWalkingDoubleSupportPercentage", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierStairDescentSpeed", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierStairAscentSpeed", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierWalkingSpeed", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierSixMinuteWalkTestDistance", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierwalkingAsymmetryPercentage", {...payload,limit: 1,}),
      ]),
    });
  };