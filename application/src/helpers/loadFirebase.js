import { db } from "../firebase/firebase";

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

export const getUserPermissions=async(userId)=>{
  const userPermision=await db.doc(`userPermisions/${userId}`).get()
  const permissions={
    isSuperAdmin:false,
    studies:[]
  }
  if(userPermision.exists){
    if(userPermision.data().isSuperAdmin){
      permissions.isSuperAdmin=true
      const allStudies = await loadStudies()
      permissions.studies=allStudies
    }
    else{
      //GetStudies
      const studiesSnap = await db.collection(`userPermisions/${userId}/studiesPermission`).get()
      studiesSnap.forEach((study)=>{
        permissions.studies.push({
          id: study.id,
          text: study.id,
          ...study.data(),
        })
      })
    }
    console.log("permissions",permissions);
  }
  return permissions
}
