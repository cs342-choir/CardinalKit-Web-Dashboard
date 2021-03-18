import { types } from "../types/types";

export const studiesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.studiesLoad:
        return{
            ...state,
            studies: [...action.payload]
        }
    default:
        return state
  }
};