import { types } from "../types/types";
import { loadStudies, loadUsersByStudy } from "../helpers/loadFirebase";

export const setStudies=( studies)=>({
    type: types.studiesLoad,
    payload: studies
})

export const fetchStudies=()=>{
    return (dispatch)=>{
        loadStudies().then((studies)=>{
            dispatch(setStudies(studies)) 
          })
    }
}

export const setUserStudy=(studyId, users)=>({
    type: types.usersLoad,
    payload:{
        id:studyId,
        users: users
    }
})

export const fetchUsersStudy=(studyId)=>{
    return (dispatch)=>{
        loadUsersByStudy(studyId).then((users)=>{
            console.log(users);
            dispatch(setUserStudy(studyId,users))
        })
    }
}