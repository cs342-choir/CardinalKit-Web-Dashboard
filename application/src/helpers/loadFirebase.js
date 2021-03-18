import { db } from "../firebase/firebase";

export const loadStudies= async ()=>{
    const studiesSnap = await db.collection(`studies`).get();
    const studies = []
    studiesSnap.forEach(studie=>{
        studies.push({
            id:studie.id,
            ...studie.data()
        })
    })
    console.log(studies);
    return studies
}