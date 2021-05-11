import {db} from '@/plugins/firebase/firebase'

export const GET=async (path,payload)=>{
    if(payload.isCollection){
        return (await db.collection(path).get());
    }
    else{
        return (await db.doc(path).get());
    }
}

export const  POST= async (path,payload)=>{
    if(payload.emptyDoc){
        return await db.collection(path).add(payload.data) 
    }
    else{
        return await db.collection(path).doc(payload.docId).set(payload.data)
    }
}

export const PATH= async (path,payload)=>{
    return await db.collection(path).doc(payload.docId).update(payload.data);
}

export const  PUT= async ()=>{
    return await db.collection(path).doc(payload.docId).set(payload.data);
}

export const DELETE= async (path,payload)=>{
    return await db.collection(path).doc(payload.docId).delete();
}
