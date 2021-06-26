export function getHealthData(state) {
  return state.healthData;
}

export function getSpecificHealthData(state) {
  return (code) => {
    return state.healthData[code];
  };
}

export function getActivityData(state){
  return state.activityData
}

export function getActivityDataWebFormat(state){
  console.log("getter",state)
  return state.activityDataWebFormat
}