import {
    FetchQuantityData,
    FetchCategoryTypeData
  } from "../../index";
  
export const FetchLastOtherData = async ({ commit }, payload) => {
  commit("saveLastCategoryData", {
    category: payload.category,
    data: await Promise.all([
      FetchQuantityData("HKQuantityTypeIdentifierBloodAlcoholContent", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierInhalerUsage", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierInsulinDelivery", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierNumberOfTimesFallen", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierSexualActivity", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierUvExposure", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierBloodGlucose", {...payload,limit: 1,}),
      FetchCategoryTypeData("HKCategoryTypeIdentifierToothbrushingEvent", {...payload,limit: 1,}),
      FetchCategoryTypeData("HKCategoryTypeIdentifierSexualActivity", {...payload,limit: 1,}),
      FetchCategoryTypeData("HKCategoryTypeIdentifierHandwashingEvent", {...payload,limit: 1,}),
    ]),
  });
};


        

