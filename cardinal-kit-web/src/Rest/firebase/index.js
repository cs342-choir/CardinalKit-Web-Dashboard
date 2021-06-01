import {db} from '@/plugins/firebase/firebase'
import { RESET } from '../../store/modules/patient/mutations'

export class Ref {
    constructor(object, method, payload = null) {
        this.object = object
        this.method = method
        this.payload = payload
    }
    WHERE(params) {
        this.object = this.object.where(params[0], params[1], params[2])
        return this
    }
    LIMIT(limit) {
        this.object = this.object.limit(limit)
        return this
    }
    ORDER_BY(name, desc = false) {
        this.object = this.object.orderBy(name, desc ? 'desc' : 'asc')
        return this
    }
    async Execute() {
        switch (this.method) {
            case "GET":
                return await this.object.get()
            case "ADD":
                return await this.object.add(this.payload)
            case "SET":
                return await this.object.set(this.payload)
            case "UPDATE":
                return await this.object.update(this.payload)
            case "DELETE":
                return await this.object.delete()
            default:
                return await this.object.get()
        }
    }
}





export const GET= (path)=>{
    let parts = path.split('/')
    
    let object
    if(parts.length%2!=0){
        object = db.collection(path);
    }
    else{
        object = db.doc(path);
    }
    return new Ref(object,"GET")    
}

export const  POST= (path,payload)=>{
    if(payload.emptyDoc){
        return new Ref(db.collection(path),"ADD",payload.data)
    }
    else{
        return new Ref(db.collection(path).doc(payload.docId),"SET",payload.data)
    }
}

export const PATH= async (path,payload)=>{
    return new Ref(db.collection(path).doc(payload.docId),"UPDATE",payload.data)
}

export const  PUT= async ()=>{
    return new Ref(db.collection(path).doc(payload.docId),"SET",payload.data)
}

export const DELETE= async (path,payload)=>{
    return new Ref(db.collection(path).doc(payload.docId),"DELETE")
}
