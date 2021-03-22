import { types } from "../types/types";
import { auth, googleAuthProvider } from "../firebase/firebase";
import { loading } from "./ui";
import { getUserPermissions, registerFirebaseUser } from "../helpers/loadFirebase";
import { setStudies } from "./studies";

export const loginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(loading(true));
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loading(false));
        dispatch(login(user.uid, user.displayName));
      })
      .catch(() => {
        dispatch(loading(false));
      });
  };
};

export const loginGoogle = () => {
  return (dispatch) => {
    auth.signInWithPopup(googleAuthProvider).then(({ user }) => {
      console.log(user);
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const logout = () => {
  return (dispatch) => {
    auth.signOut().then(() => {
      dispatch(logoutAction());
    });
  };
};

const logoutAction = () => ({
  type: types.logout,
});

export const fethUserPermissions = (userId) => {
  return (dispatch) => {
    getUserPermissions(userId).then((data) => {
      dispatch(setStudies(data.studies));
      dispatch(userType(data.isSuperAdmin));
    });
  };
};

export const userType = (isSuperAdmin) => ({
  type: types.userType,
  payload: {
    isSuperAdmin: isSuperAdmin,
  },
});


export const registerUser=(name,email,studies)=>{
  return async ()=>{
    return await registerFirebaseUser(name,email,studies)
  }
}