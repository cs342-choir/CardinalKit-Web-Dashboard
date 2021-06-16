import { transformAppleCode,transformHealthDataToGlobalFormat } from "@/common/helpers/healthKit"
import { dataTypeToCalculateAverage } from "@/common/static_data"



export function saveSpecificTypeData(state, payload) {
    let copy = {...state.healthData}
    copy[payload.datatype] = payload.data
    state.healthData=copy
}



export function saveLastCategoryData(state, {category,data}){
    let categoryWebFormat = []
    data.forEach(element => {        
        if(element && element.length>0){
            let transform = transformHealthDataToGlobalFormat(element[0])
            transform.Value = 0
            element.forEach(record => {
                let NewRecord = transformHealthDataToGlobalFormat(record)
                transform.Value += NewRecord.Value
            });        
            if(dataTypeToCalculateAverage.includes(transform.HkCode)){
                transform.Value=transform.Value/element.length
            }
            categoryWebFormat.push(transform)
        }
    });
    let copyHealth = {...state.healthData}
    copyHealth[category]=data
    state.healthData=copyHealth
    
    let copyWebFormat = {...state.healthWebFormat}
    copyWebFormat[category]=categoryWebFormat
    state.healthWebFormat=copyWebFormat
}