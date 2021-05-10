import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
if(process.env.VUE_APP_AUTH_MODE == "firebase"){
    let {auth}= require('./plugins/firebase/firebase')
    auth.onAuthStateChanged(function(user) {
        console.log(user.uid)
        if (user.uid) {
          store.commit('auth/isLogged',true)
        } else {
            store.commit('auth/isLogged',false)
        }
      });
}