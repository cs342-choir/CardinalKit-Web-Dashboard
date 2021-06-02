import {
    FetchQuantityData,
  } from "../../index";
  
  export const FetchLastRespiratoryData = async ({ commit }, payload) => {
    commit("saveLastCategoryData", {
      category: payload.category,
      data: await Promise.all([
        FetchQuantityData("HKQuantityTypeIdentifierOxygenSaturation", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierInhalerUsage", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierRespiratoryRate", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierForcedExpiratoryVolume1", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierForcedVitalCapacity", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierSixMinuteWalkTestDistance", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierPeakExpiratoryFlowRate", {...payload,limit: 1,}),
      ]),
    });
  };