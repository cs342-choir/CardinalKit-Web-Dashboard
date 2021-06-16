import {
  transformAppleCode,
  GetCategoriesByHkType,
} from "@/common/helpers/healthKit";

import { dataTypeToCalculateAverage } from "@/common/static_data";

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

    let data = state.healthData[code];

    let dataFormat = [];
    if (code.includes("Quantity")) {
      let dataDict = {};
      data.forEach((record) => {
        let value = record.Value;
        let dateFormat = DateFormat(record.Date.Date);
        if (dateFormat in dataDict) {
          dataDict[dateFormat].value += value;
          dataDict[dateFormat].count += 1;
        } else {
          dataDict[dateFormat] = {
            date: record.Date.Date,
            value: value,
            count: 1,
          };
        }
      });
      for (const [key, value] of Object.entries(dataDict)) {
        if (dataTypeToCalculateAverage.includes(code)) {
          value.value = value.value / value.count;
        }
        dataFormat.push({ x: value.date, y: value.value.toFixed(2) });
      }
    } else if (code == "HKCategoryTypeIdentifierSleepAnalysis") {
      let inBedArray = [];
      let aSleepArray = [];
      data.forEach((record) => {
        let startTime = DateToSeconds(record.StartDate);
        let endTime = DateToSeconds(record.EndDate);

        if (record.EndDate.getDate() != record.StartDate.getDate()) {
          let maxValue = (23 * 60 + 59) * 60 + 59;
          let yValue1 = [startTime, maxValue];
          let yValue2 = [0, endTime];

          if(record.HkValue=="InBed"){
            inBedArray.push({
              x:record.StartDate,
              y:yValue1
            })
            inBedArray.push({
              x:record.EndDate,
              y:yValue2
            })
          }
          else{
            aSleepArray.push({
              x:record.StartDate,
              y:yValue1
            })
            aSleepArray.push({
              x:record.EndDate,
              y:yValue2
            })
          }

        } else {
          let yValue = [startTime,endTime]
          if(record.HkValue=="InBed"){
            inBedArray.push({
              x:record.StartDate,
              y:yValue
            })
          }
          else{
            aSleepArray.push({
              x:record.StartDate,
              y:yValue
            })
          }
        }
      });

      return [
        {
          name:"inBed",
          data:inBedArray
        },
        {
          name:"aSleep",
          data:aSleepArray
        }

      ]

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

function DateToSeconds(date) {
  let dateHours = date.getHours();
  let dateMinutes = date.getMinutes();
  let dateSeconds = date.getSeconds();
  let seconds = (dateHours * 60 + dateMinutes) * 60 + dateSeconds;
  return seconds;
}

function DateFormat(date) {
  return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
}

export function getCategoryDataWebFormat(state) {
  return (categoryId) => {
    return state.healthWebFormat[categoryId];
  };
}
