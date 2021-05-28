export function saveSpecificTypeData(state, payload) {
    let copy = {...state.healthData}
    copy[payload.datatype] = payload.data
    state.healthData=copy
}