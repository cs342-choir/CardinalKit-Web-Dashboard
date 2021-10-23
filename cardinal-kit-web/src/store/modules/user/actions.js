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
                if(userSnap.exists){
                    if(userSnap.data().rol=="doctor"){
                        if(userSnap.data().studies.length==1){
                            let allUsers = [];
                            const usersSnap = await request.GET(`studies/${userSnap.data().studies[0]}/users`).Execute();
                            allUsers = usersSnap.docs.map((record) => {
                            return {id:record.id,...record.data()}
                            })
                        }
                        commit("saveUserRol",{...userSnap.data(),id:user.uid})
                    }
                    else if(userSnap.data().rol=="superAdmin"){
                        const studiesSnap = await request.GET(`studies`).Execute()
                        let studies = []
                        studiesSnap.docs.forEach(element => {
                            studies.push(element.id)
                        });
                        commit("saveUserRol",{rol:"superAdmin",studies:studies,id:user.uid})
                    }
                    else{
                        commit("saveUserRol",{...userSnap.data(),id:user.uid})
                    }
                }
                resolve()
            }
            else{
                commit("saveUserRol",{rol:"NoAccess",studies:[],id:''})
                resolve()
            }
        })
    })
    
}