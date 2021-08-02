import {
  transformAppleCode,
  GetCategoriesByHkType,
} from "@/common/helpers/healthKit";
import {transformDistanceToGlobalUnit, transformTimeToSeconds, transformSecondsToBetterFormat} from '@/common/helpers/units'
import store from "@/store";


import { dataTypeToCalculateAverage } from "@/common/static_data";

export function getHealthData(state) {
  return state.healthData;
}

export function getSpecificHealthData(state) {
  return (code) => {
    return state.healthData[code];
  };
}

function ResumeRange(data,transformValueCallBack,unit){
  let min=transformValueCallBack(data[0].Value,unit);
  let max=transformValueCallBack(data[0].Value,unit);
  data.forEach(record=>{
    let newValue = transformValueCallBack(record.Value,record.Unit)
    if(newValue>max){
      max = newValue
    }
    if(newValue<min)
    {
      console.log("new Min")
      console.log(record)
      min=newValue
    }
  })
  return {title:"Range",value:`${min} - ${max}  ${unit}`}
}
function ResumeSum(data,transformValueCallBack, unit){
  let total=0
  data.forEach((record) => {
    total+= transformValueCallBack(record.Value,record.Unit)
  })
  if(total%1!=0){
    total=total.toFixed(2)
  }
  return {title:"Total",value:`${total} ${unit}`}
  
}
function ResumeAverage(data,transformValueCallBack,unit){

}

function ResumeCount(data){
  return {title:"Total",value:`${data.length} entries`}
}

function ResumeSleepAnalisis(data){
  let sumInBedSeconds = 0;
  let sumASleepSeconds = 0;
  let countInBed = 0;
  let countASleep=0;

  data.forEach(record => {
    if(record.HkValue=="InBed"){
      sumInBedSeconds+=transformTimeToSeconds(record.Value,record.Unit)
      countInBed++;
    }
    else{
      
      sumASleepSeconds+=transformTimeToSeconds(record.Value,record.Unit)
      countASleep++;
    }
  });
  let inBedAverage = transformSecondsToBetterFormat(sumInBedSeconds/countInBed);
  let aSleepAverage =transformSecondsToBetterFormat(sumASleepSeconds/countASleep);



  return {title:"Sleep Average",value:`Average In Bed: ${inBedAverage.Value} ${inBedAverage.Unit} / Average ASleep: ${aSleepAverage.Value} ${aSleepAverage.Unit}` }
}

export function getHealthDataGraphResume(state){
  return (code)=>{
    let data= state.healthData[code]

    let result = { title:"", value:"",date:""}

    switch(code){
      case "HKQuantityTypeIdentifierHeartRate": 
        result = ResumeRange(data,(param,unit)=>{return param},data[0].Unit)
      break;
      case "HKCategoryTypeIdentifierSleepAnalysis":
        result = ResumeSleepAnalisis(data)
        break;
      case "HKQuantityTypeIdentifierDistanceWalkingRunning":
        result = ResumeSum(data,transformDistanceToGlobalUnit,store.getters['units/getDistanceUnit'])
      break;
      case "HKQuantityTypeIdentifierFlightsClimbed":
        result = ResumeSum(data,(param,unit)=>{return param},"floors")
        break;
      default:
        if (code.includes("Quantity")) {          
          result = ResumeSum(data,(param)=>{return param},data[0].Unit)
        }
        else{
          result = ResumeCount(data)
        }
        break;
    }    
    return result
  }
}

export function getSpecificHealthDataGrapFormat(state) {
  return (code) => {
    let data = state.healthData[code];
    let dataFormat = [];
    if (code == "HKCategoryTypeIdentifierSleepAnalysis") {
      return SleepAnalisysData(data);
    } else if (code == "HKQuantityTypeIdentifierHeartRate") {
      return HeartRateData(data);
    }
    else if(code == "HKCategoryTypeIdentifierMindfulSession"){
      return MinfdfulData(data)
    } else if (code.includes("Quantity")) {
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

function DateFormatHour(date) {
  return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()+"/"+date.getHours();
}


function SleepAnalisysData(data) {
  let inBedArray = [];
  let aSleepArray = [];
  data.forEach((record) => {
    let startTime = DateToSeconds(record.StartDate);
    let endTime = DateToSeconds(record.EndDate);

    if (record.EndDate.getDate() != record.StartDate.getDate()) {
      let maxValue = (23 * 60 + 59) * 60 + 59;
      let yValue1 = [startTime, maxValue];
      let yValue2 = [0, endTime];

      if (record.HkValue == "InBed") {

        inBedArray.push({
          x: record.StartDate.setHours(0,0,0),
          y: yValue1,
        });
        inBedArray.push({
          x: record.EndDate.setHours(0,0,0),
          y: yValue2,
        });

      } else {
        aSleepArray.push({
          x: record.StartDate.setHours(0,0,0),
          y: yValue1,
        });
        aSleepArray.push({
          x: record.EndDate.setHours(0,0,0),
          y: yValue2,
        });
      }
    } else {
      let yValue = [startTime, endTime];
      if (record.HkValue == "InBed") {
        inBedArray.push({
          x: record.StartDate.setHours(0,0,0),
          y: yValue,
        });
      } else {
        aSleepArray.push({
          x: record.StartDate.setHours(0,0,0),
          y: yValue,
        });
      }
    }
  });
  
  return [
    {
      name: "inBed",
      data: inBedArray,
    },
    {
      name: "aSleep",
      data: aSleepArray,
    },
  ];
}

function HeartRateData(data) {
  let dataFormat = []
  let dataDict = {};
  data.forEach((record) => {
    let value = record.Value;
    if(value%1!=0){
      value = parseFloat(value.toFixed(2))
    }
    let dateFormat = DateFormatHour(record.Date.Date);
    if (dateFormat in dataDict) {
      if(value>dataDict[dateFormat].max){
        dataDict[dateFormat].max= value;
      }
      if(value<dataDict[dateFormat].min){
        dataDict[dateFormat].min= value;
      }
    } else {
      let date = new Date(record.Date.Date.setMinutes(0,0))
      dataDict[dateFormat] = {
        date: date,
        max: value,
        min: value
      };
    }
  });
  for (const [key, value] of Object.entries(dataDict)) {
    dataFormat.push({ x: value.date, y: [value.min,value.max] });
  }
  return [
    {
      name: "Heart Rate",
      data: dataFormat,
    },
  ];
}

function MinfdfulData(data){
  let dataFormat = []
  // dataFormat.push({x:"TEST",y:[new Date(),]})
  data.forEach((record)=>{
    dataFormat.push({ x: "Mind", y: [record.StartDate.getTime() ,record.EndDate.getTime()] });
  })

  return[{
    name: "Mindful Minutes",
    data:dataFormat
  }]
}

export function getCategoryDataWebFormat(state) {
  return (categoryId) => {
    console.log(" -- ",state.healthWebFormat[categoryId])
    return state.healthWebFormat[categoryId];
  };
}

export function getValidCategories(state){
  return state.validCategories
}