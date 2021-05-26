export function getHealthData(state){
    return state.healthData
  }

  export function getSpecificHealthData(state){
    return (code)=>{
      return state.healthData[code]
    }
  }