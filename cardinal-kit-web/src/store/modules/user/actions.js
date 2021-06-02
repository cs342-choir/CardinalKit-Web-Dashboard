import request from "@/Rest";

export function reset({commit}){
    commit('RESET')
}

export const FetchUserRolesAndStudies= async ({commit})=>{
    return new Promise(function(resolve,reject){
        let { auth } = require("@/plugins/firebase/firebase");
        auth.onAuthStateChanged(async function (user){
            if(user){
                const userSnap = await request.GET(`users_roles/${user.uid}`).Execute()
                commit("saveUserRol",{...userSnap.data(),id:user.uid})
                resolve()
            }
            else{
                commit("saveUserRol",{rol:"NoAccess",studies:[],id:''})
                resolve()
            }
        })
    })
    
}