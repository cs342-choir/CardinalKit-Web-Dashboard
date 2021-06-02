import {
  FetchQuantityData,
} from "../../index";

export const FetchLastBodyData = async ({ commit }, payload) => {
  console.log("FetchBody")
  commit("saveLastCategoryData", {
    category: payload.category,
    data: await Promise.all([
      FetchQuantityData("HKQuantityTypeIdentifierBasalBodyTemperature", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierBodyFatPercentage", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierLeanBodyMass", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierBodyTemperature", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierBodyMass", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierBodyMassIndex", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierElectrodermalActivity", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierHeight", {...payload,limit: 1,}),
      FetchQuantityData("HKQuantityTypeIdentifierWaistCircumference", {...payload,limit: 1,}),
    ]),
  });
};