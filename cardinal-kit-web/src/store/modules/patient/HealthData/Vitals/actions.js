import {
    FetchLastQuantityData,
    FetchCategoryTypeData
  } from "../../index";
  
  export const FetchLastVitalsData = async ({ commit }, payload) => {
    commit("saveLastCategoryData", {
      category: payload.category,
      data: await Promise.all([
        FetchLastQuantityData("HKQuantityTypeIdentifierOxygenSaturation", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierRespiratoryRate", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierBasalBodyTemperature", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierBloodPressureSystolic", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierBloodPressureDiastolic", {...payload,limit: 1,}),
        FetchLastQuantityData("HKQuantityTypeIdentifierBloodGlucose", {...payload,limit: 1,}),
        FetchCategoryTypeData("HKQuantityTypeIdentifierMenstrualFlow", {...payload,limit: 1,}),
      ]),
    });
  };