import { db, auth, secondApp } from "../firebase/firebase";
import uuid from "react-uuid";

export const loadStudies = async () => {
  const studiesSnap = await db.collection(`studies`).get();
  const studies = [];
  studiesSnap.forEach((study) => {
    studies.push({
      id: study.id,
      text: study.id,
      ...study.data(),
    });
  });
  return studies;
};

export const loadUsersByStudy = async (studyId) => {
  const usersSnap = await db.collection(`studies/${studyId}/users`).get();
  const users = [];
  usersSnap.forEach((user) => {
    users.push({
      id: user.id,
      text: user.text,
      ...user.data(),
    });
  });
  return users;
};

export const getUserPermissions = async (userId) => {
  const userPermision = await db.doc(`userPermisions/${userId}`).get();
  const permissions = {
    isSuperAdmin: false,
    studies: [],
  };
  if (userPermision.exists) {
    if (userPermision.data().isSuperAdmin) {
      permissions.isSuperAdmin = true;
      const allStudies = await loadStudies();
      permissions.studies = allStudies;
    } else {
      const studiesSnap = await db
        .collection(`userPermisions/${userId}/studiesPermission`)
        .get();
      studiesSnap.forEach((study) => {
        permissions.studies.push({
          id: study.id,
          text: study.id,
          ...study.data(),
        });
      });
    }
    console.log("permissions", permissions);
  }
  return permissions;
};

export const registerFirebaseUser = async (name, email, studies) => {
  secondApp
    .auth()
    .createUserWithEmailAndPassword(email, uuid())
    .then(async ({ user }) => {
      secondApp.auth().signOut();
      console.log(user.uid);
      let path = `userPermisions/${user.uid}`;
      await db.doc(path).set({
        isSuperAdmin: false,
      });
      path += "/studiesPermission";
      studies.map((element) =>
        db.collection(path).doc(element.value).set({ exists: true })
      );

      var actionCodeSettings = {
        url: "http://localhost:3000/",
        handleCodeInApp: true,
      };
      auth
        .sendPasswordResetEmail(email, actionCodeSettings)
        .then(function () {
          console.log("sendDed");
        })
        .catch(function (error) {
          console.log("error", error);
        });
    });
};
