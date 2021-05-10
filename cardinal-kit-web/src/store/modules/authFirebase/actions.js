import { auth, googleAuthProvider } from '@/plugins/firebase/firebase'

export function reset({commit}){
    commit('RESET')
}

export async function SignIn({commit},payload){
    console.log("auth",payload)
    return await 
      auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('isLogged',true)
        return({
          'isLogged':true
        })
      })
      .catch((error) => {
        commit('isLogged',false)
        var errorCode = error.code;
        var errorMessage = error.message;
        return({
        'isLogged':false,
        'error':errorMessage,
        'errorCode':errorCode
      })
    });

}

export async function LogInWithGoogle({commit}){
  return auth.signInWithPopup(googleAuthProvider)
    .then(() => {
      commit('isLogged',true)
      return({
        'isLogged':true
      })
    })
    .catch((error) => {
      commit('isLogged',false)
      var errorCode = error.code;
      var errorMessage = error.message;
      return({
      'isLogged':false,
      'error':errorMessage,
      'errorCode':errorCode
    })
  })
}

export function SignUp({commit},payload){
  auth.createUserWithEmailAndPassword(payload.email, payload.password)
  .then((user) => {
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

export  function Logout({commit},payload){
   auth.signOut().then(()=>{
     console.log("Logout")
    commit('isLogged',false)
  })
}