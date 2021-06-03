import {
  transformAppleCode,
  GetCategoriesByHkType,
} from "@/common/helpers/healthKit";

export function getHealthData(state) {
  return state.healthData;
}

export function getSpecificHealthData(state) {
  return (code) => {
    return state.healthData[code];
  };
}

export function getSpecificHealthDataGrapFormat(state) {
  return (code) => {
    //Merge Data Same Date
    let data = state.healthData[code] ;
    
    let dataFormat = [];
    if (code.includes("Quantity")) {
      let dataDict = {};
      data.forEach((record) => {
        let value = record.Value;
        let dateFormat=record.Date.Date.getFullYear()+"/"+record.Date.Date.getMonth()+"/"+record.Date.Date.getDate()
        console.log(record.Date.Date)
        if(dateFormat in dataDict){
          dataDict[dateFormat].value+=value
        }
        else{
          dataDict[dateFormat]={date:record.Date.Date,value:value}
        }
      });
      console.log(dataDict)

      for (const [key, value] of Object.entries(dataDict)) {
        dataFormat.push({x:value.date,y:value.value})
      }



    } else {
      
      data.forEach((record) => {
        let yValue = record.Value;
        if (code.includes("Category")) {
          let array = GetCategoriesByHkType(code);
          yValue = array.indexOf(yValue);
        }
        dataFormat.push({ x: record.Date.Date, y: yValue });
      });
    }

    return [
      {
        name: code,
        data: dataFormat,
      },
    ];
  };
}

export function getCategoryDataWebFormat(state) {
  return (categoryId) => {
    console.log(categoryId);
    console.log(state.healthWebFormat);
    return state.healthWebFormat[categoryId];
  };
}
