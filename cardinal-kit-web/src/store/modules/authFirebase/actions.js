import { auth, googleAuthProvider } from '@/plugins/firebase/firebase'

export function reset({commit}){
    commit('RESET')
}

export function SignIn({commit},payload){
    console.log("auth",payload)
    auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
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

export function LogInWithGoogle({commit}){
  auth.signInWithPopup(googleAuthProvider)
    .then(({ userCredential }) => {
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}