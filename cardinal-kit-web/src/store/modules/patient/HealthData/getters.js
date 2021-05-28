export function getHealthData(state) {
  return state.healthData;
}

export function getSpecificHealthData(state) {
  return (code) => {
    return state.healthData[code];
  };
}


export function getSpecificHealthDataGrapFormat(state){
  return (code)=>{
    let data = state.healthData[code]
    let dataFormat = []
    data.forEach(record => {
      console.log("record",record)
      dataFormat.push({"x":record.Date.Date,"y":record.Value})
    });

    return [
      {
        "name":code,
        "data":dataFormat
      }
    ]
  }
}

export function getCategoryDataWebFormat(state){
  return (categoryId)=>{
    console.log(categoryId)
    console.log(state.healthWebFormat)
    return state.healthWebFormat[categoryId]
  }
}