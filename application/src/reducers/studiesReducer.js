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
    case types.studyTypeData:
      const studyData= state.studyTypeData?state.studyTypeData:{}
      let studyTypeData=studyData[action.payload.studyId]?studyData[action.payload.studyId]:{}
      studyTypeData[action.payload.typeId]=action.payload.data
      studyData[action.payload.studyId]=studyTypeData
      return {
        ...state,
        studyTypeData:studyData
      }
      
    default:
      return state;
  }
};
