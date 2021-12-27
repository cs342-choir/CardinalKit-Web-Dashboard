import request from "@/Rest"

export const FetchUserHaveMyData = async ({ commit }) => {
    let { auth } = require("@/plugins/firebase/firebase");
    auth.onAuthStateChanged(async function (user){
        console.log(user.uid)
        let users = []
        const usersSnap = await request.GET("users_roles").WHERE(["users_access", "array-contains", user.uid]).Execute()
        usersSnap.forEach(user => {
            users.push({
                id: user.id,
                ...user.data()
            })
        });
        console.log("users",users)
        commit("saveUsersHaveMyData",users)
    })
    
}

// .collection("users_roles")
// .where("users_access", "array-contains", "eetPw3yVxig1Mkcp7ltGUHSXOHa2")
export const FetchUsersIHaveAccessTo = async ({commit}) =>{
    // let { auth } = require("@/plugins/firebase/firebase");
    // auth.onAuthStateChanged(async function (user){
    //     console.log("user",user.uid)
    //     let users = []
    //     const usersSnap = await request.GET(`users_roles/${user.uid}`)
    //     usersSnap.forEach(user => {
    //         users.push({
    //             id: user.id,
    //             ...user.data()
    //         })
    //     })
    //     commit("saveUserIHaveAccess",users)
    // })
}

export const FetchAllDoctorsAndSuperAdmin = async ({commit})=>{
    let { auth } = require("@/plugins/firebase/firebase");
    let users = []
    const usersSnap = await request.GET("users_roles").WHERE(["rol", "in",['doctor','superAdmin']]).Execute()
    await auth.onAuthStateChanged(async function (user){
        usersSnap.forEach(admin => {
            let push=true
            if( admin.data() && admin.data()["users_access"]){
                if (admin.data()["users_access"].includes(user.uid)){
                    push=false
                }
            }
            if(push){
                users.push({
                    id: admin.id,
                    ...admin.data()
                })
            }
        
        });
        
        commit("saveDoctorsAdmin",users)
    })
}

export const ShareMyData = async ({commit},userId)=>{
    return new Promise((resolve,reject)=>{
        let { auth } = require("@/plugins/firebase/firebase");
        auth.onAuthStateChanged(async function (user){
            const usersSnap = await request.GET(`users_roles/${userId}`).Execute()
            let previousUser = []
            let data= usersSnap.data()
            if (data && data['users_access']){
                previousUser = [...data['users_access']]
            }
            previousUser.push(user.uid)
            await request.PUT(`/users_roles/${userId}/`,{
                data:{
                    'users_access':previousUser
                }
            }).Execute()
            resolve()
        })
        
    })
}

export const RemoveAccess = async({commit}, userId)=>{
    return new Promise((resolve,reject)=>{
        let { auth } = require("@/plugins/firebase/firebase");
        auth.onAuthStateChanged(async function (user){
            let previousUser = []
            const usersSnap = await request.GET(`users_roles/${userId}`).Execute()
            let data= usersSnap.data()
            if (data && data['users_access']){
                previousUser = [...data['users_access']]
            }
            var filtered = previousUser.filter(function(value, index, arr){ 
                return value!=user.uid;
            });
            await request.PUT(`/users_roles/${userId}/`,{
                data:{
                    'users_access':filtered
                }
            }).Execute()
            resolve()
        })
    })
   
}