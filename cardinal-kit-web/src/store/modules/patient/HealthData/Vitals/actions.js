import {
    FetchQuantityData,
    FetchCategoryTypeData
  } from "../../index";
  
  export const FetchLastVitalsData = async ({ commit }, payload) => {
    commit("saveLastCategoryData", {
      category: payload.category,
      data: await Promise.all([
        FetchQuantityData("HKQuantityTypeIdentifierOxygenSaturation", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierRespiratoryRate", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierBasalBodyTemperature", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierBloodPressureSystolic", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierBloodPressureDiastolic", {...payload,limit: 1,}),
        FetchQuantityData("HKQuantityTypeIdentifierBloodGlucose", {...payload,limit: 1,}),
        FetchCategoryTypeData("HKQuantityTypeIdentifierMenstrualFlow", {...payload,limit: 1,}),
      ]),
    });
  };