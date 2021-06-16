import {
    FetchQuantityData,
    FetchLastQuantityData
  } from "../../index";
  
  export const FetchLastHeartData = async ({ commit }, payload) => {
    commit("saveLastCategoryData", {
      category: payload.category,
      data: await Promise.all([
        FetchLastQuantityData("HKQuantityTypeIdentifierBloodPressureSystolic", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierBloodPressureDiastolic", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierHeartRateVariabilitySDNN", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierPeripheralPerfusionIndex", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierRestingHeartRate", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierHeartRate", {...payload,limit: 1,}),
      ]),
    });
  };