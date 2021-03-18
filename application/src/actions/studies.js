import { types } from "../types/types";

export const setStudies=( studies)=>({
    type: types.studiesLoad,
    payload: studies
})