import {FetchCategoryTypeData,FetchQuantityData} from "../../index"

export function reset({ commit }) {
  commit("RESET");
}

export const FetchActivityData = async ({commit}, payload)=>{
  commit("saveActivityData",await 
    Promise.all([
      FetchQuantityData("HKQuantityTypeIdentifierDistanceWalkingRunning",payload),
      FetchQuantityData("HKQuantityTypeIdentifierActiveEnergyBurned",payload),
      FetchQuantityData("HKQuantityTypeIdentifierAppleStandTime",payload),      
      FetchQuantityData("HKCategoryTypeIdentifierAppleStandHour",payload),
    ])
  )
}

export const FetchLastActivityData = async ({commit}, payload)=>{
  commit("saveLastActivityData", await
    Promise.all([
      FetchQuantityData("HKQuantityTypeIdentifierDistanceWalkingRunning",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierActiveEnergyBurned",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierAppleStandTime",{...payload,limit:1}),
      FetchQuantityData("HKCategoryTypeIdentifierAppleStandHour",{...payload,limit:1}),
    ])
  )
}

