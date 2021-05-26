
import {FetchCategoryTypeData} from "../../index"

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
