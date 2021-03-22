import { types } from "../types/types";
import {
  getAllUsersDataByStudyType,
  loadStudies,
  loadUsersByStudy,
} from "../helpers/loadFirebase";

export const setStudies = (studies) => ({
  type: types.studiesLoad,
  payload: studies,
});

export const fetchStudies = () => {
  return (dispatch) => {
    loadStudies().then((studies) => {
      dispatch(setStudies(studies));
    });
  };
};

export const setUserStudy = (studyId, users) => ({
  type: types.usersLoad,
  payload: {
    id: studyId,
    users: users,
  },
});

export const setStudyTypeData = (studyId, typeId, data) => {
  return {
    type: types.studyTypeData,
    payload: {
      studyId: studyId,
      typeId: typeId,
      data: data,
    },
  };
};

export const fetchUsersStudy = (studyId) => {
  return (dispatch) => {
    loadUsersByStudy(studyId).then((users) => {
      console.log(users);
      dispatch(setUserStudy(studyId, users));
    });
  };
};

export const getDataStudy = (studyId, studyType) => {
  return (dispatch) => {
    getAllUsersDataByStudyType(studyId, studyType).then((res) => {
      dispatch(setStudyTypeData(studyId, studyType, res));
    });
  };
};
