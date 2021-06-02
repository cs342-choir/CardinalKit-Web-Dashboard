import {
    FetchQuantityData,
  } from "../../index";
  
  export const FetchLastHeartData = async ({ commit }, payload) => {
    commit("saveLastCategoryData", {
      category: payload.category,
      data: await Promise.all([
        FetchQuantityData("HKQuantityTypeIdentifierBloodPressureSystolic", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierBloodPressureDiastolic", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierHeartRateVariabilitySDNN", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierPeripheralPerfusionIndex", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierRestingHeartRate", {...payload,limit: 1,}),
      ]),
    });
  };