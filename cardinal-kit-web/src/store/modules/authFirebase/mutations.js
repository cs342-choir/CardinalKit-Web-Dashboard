import {initialState} from './index'

export function RESET(state){
    const newState= initialState();
    Object.keys(newState).forEach(key => {
        state[key] = newState[key]
    });
}

export function isLogged(state,isLogged){
    localStorage.setItem('logged',isLogged)
    state.isLogged=isLogged
}