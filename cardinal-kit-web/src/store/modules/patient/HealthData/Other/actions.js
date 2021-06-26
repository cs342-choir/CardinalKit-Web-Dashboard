import {
    FetchLastQuantityData,
    FetchCategoryTypeData
  } from "../../index";
  
export const FetchLastOtherData = async ({ commit }, payload) => {
  commit("saveLastCategoryData", {
    category: payload.category,
    data: await Promise.all([
      FetchLastQuantityData("HKQuantityTypeIdentifierBloodAlcoholContent", {...payload,limit: 1,}),
      FetchLastQuantityData("HKQuantityTypeIdentifierInhalerUsage", {...payload,limit: 1,}),
      FetchLastQuantityData("HKQuantityTypeIdentifierInsulinDelivery", {...payload,limit: 1,}),
      FetchLastQuantityData("HKQuantityTypeIdentifierNumberOfTimesFallen", {...payload,limit: 1,}),
      FetchLastQuantityData("HKQuantityTypeIdentifierSexualActivity", {...payload,limit: 1,}),
      FetchLastQuantityData("HKQuantityTypeIdentifierUvExposure", {...payload,limit: 1,}),
      FetchLastQuantityData("HKQuantityTypeIdentifierBloodGlucose", {...payload,limit: 1,}),
      FetchCategoryTypeData("HKCategoryTypeIdentifierToothbrushingEvent", {...payload,limit: 1,}),
      FetchCategoryTypeData("HKCategoryTypeIdentifierSexualActivity", {...payload,limit: 1,}),
      FetchCategoryTypeData("HKCategoryTypeIdentifierHandwashingEvent", {...payload,limit: 1,}),
    ]),
  });
};


        

