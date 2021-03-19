import { types } from "../types/types";

export const studiesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.studiesLoad:
      return {
        ...state,
        studies: [...action.payload],
      };
    case types.usersLoad:
      const newUsers= state.users?state.users:{}
      newUsers[action.payload.id]=action.payload.users
      return{
        ...state,
        users:newUsers
      }
     
      
    default:
      return state;
  }
};
