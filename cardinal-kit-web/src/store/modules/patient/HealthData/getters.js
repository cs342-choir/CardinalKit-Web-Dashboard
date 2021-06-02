import { transformAppleCode,GetCategoriesByHkType } from "@/common/helpers/healthKit";

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
      let yValue = record.Value
      if(code.includes("Category")){
        let array=GetCategoriesByHkType(code)
        yValue = array.indexOf(yValue)
      }
      dataFormat.push({"x":record.Date.Date,"y":yValue})
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