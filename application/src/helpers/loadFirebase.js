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
  }
  return permissions;
};

export const registerFirebaseUser = async (name, email, studies) => {
  const res = {
    status: false,
    error: "",
  };
  const resCreateUser = await secondApp
    .auth()
    .createUserWithEmailAndPassword(email, uuid())
    .catch((error) => {
      console.log(error, "error");
      res.error = error.message;
    });

  if (resCreateUser) {
    const { user } = resCreateUser;

    secondApp.auth().signOut();
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

    const sended = auth
      .sendPasswordResetEmail(email, actionCodeSettings)
      .catch((error) => {
        res.error = error.message;
      });

    res.status = sended !== undefined;
  }
  return res;
};

export const getAllUsersDataByStudyType = async (studyId, studyType) => {
  const usersSnap = await db.collection(`studies/${studyId}/users`).get();
  const records = {};
  await Promise.all(
    usersSnap.docs.map(async (user) => {
      let recordsSnap = await db
        .collection(`studies/${studyId}/users/${user.id}/${studyType}`)
        .get();

      await Promise.all(
        recordsSnap.docs.map(async (record) => {
          if (!(record.id in records)) {
            records[record.id] = [];
          }
          records[record.id].push(record.data());
        })
      );
    })
  );
  return records;
};
