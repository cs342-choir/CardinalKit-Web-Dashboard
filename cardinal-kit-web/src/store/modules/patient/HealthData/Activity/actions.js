import {FetchCategoryTypeData,FetchQuantityData,FetchActivities} from "../../index"

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
      FetchQuantityData("HKQuantityTypeIdentifierAppleStandHour",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierAppleExerciseTime",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierFlightsClimbed",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierPushCount",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierDistanceWheelchair",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierDistanceCycling",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierDistanceDownhillSnowSports",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierBasalEnergyBurned",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierSwimmingStrokeCount",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierDistanceSwimming",{...payload,limit:1}),
      FetchQuantityData("HKQuantityTypeIdentifierStepCount",{...payload,limit:1}),
      FetchActivities({...payload,limit:1}),
    ])
  )
}
      

