import { db } from "../firebase/firebase";

export const loadStudies = async () => {
  const studiesSnap = await db.collection(`studies`).get();
  const studies = [];
  studiesSnap.forEach((studie) => {
    studies.push({
      id: studie.id,
      text: studie.id,
      ...studie.data(),
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
