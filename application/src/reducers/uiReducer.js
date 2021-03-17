import { types } from "../types/types";

export const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case types.loading:
        return{
            ...state,
            loading: action.payload.loadingValue
        }
    default:
        return state
  }
};
