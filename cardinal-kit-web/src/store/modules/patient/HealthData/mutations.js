import { transformAppleCode,transformHealthDataToGlobalFormat } from "@/common/helpers/healthKit"

export function saveSpecificTypeData(state, payload) {
    let copy = {...state.healthData}
    copy[payload.datatype] = payload.data
    state.healthData=copy
}

export function saveLastCategoryData(state, {category,data}){
    let categoryWebFormat = []
    data.forEach(element => {
        
        if(element && element.length>0){
            categoryWebFormat.push(transformHealthDataToGlobalFormat(element[0]))
        }
    });
    let copyHealth = {...state.healthData}
    copyHealth[category]=data
    state.healthData=copyHealth
    
    let copyWebFormat = {...state.healthWebFormat}
    copyWebFormat[category]=categoryWebFormat
    state.healthWebFormat=copyWebFormat
}