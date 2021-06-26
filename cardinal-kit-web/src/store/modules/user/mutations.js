import {initialState} from './index'

export function RESET(state){
    const newState= initialState();
    Object.keys(newState).forEach(key => {
        state[key] = newState[key]
    });
}

export function saveUserRol(state,{rol,studies,id}){
    state.Rol=rol
    state.Studies=studies
    state.Id=id
}