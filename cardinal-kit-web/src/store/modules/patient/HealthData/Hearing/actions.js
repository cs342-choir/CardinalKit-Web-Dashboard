
import {FetchCategoryTypeData, FetchQuantityData, FetchSampleData,FetchLastQuantityData} from "../../index"

export function reset({ commit }) {
  commit("RESET");
}

export const FetchHearingData = async ({commit}, payload)=>{
  commit("saveHearingData",await 
    Promise.all([
      FetchCategoryTypeData("HKQuantityTypeIdentifierEnvironmentalAudioExposure",payload),
    ])
  )
}

export const FetchLastHearingData = async ({ commit }, payload) => {
  commit("saveLastCategoryData", {
    category: payload.category,
    data: await Promise.all([
      FetchSampleData("HKSampleTypeIdentifierAudiogram", {...payload,limit: 1,}),
      FetchLastQuantityData("HKQuantityTypeIdentifierEnvironmentalAudioExposure", {...payload,limit: 1,}),
    ]),
  });
};
