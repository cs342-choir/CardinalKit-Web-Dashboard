import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import Home from "../views/Home.vue";
import Login from "@/views/auth/login";
import SignUp from "@/views/auth/signUp";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      // requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: {
      // requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("to fuera de auth",to.name,"from",from.name)
  if (process.env.VUE_APP_AUTH_MODE == "firebase") {
    let { auth } = require("@/plugins/firebase/firebase");
    let unsubscribe = auth.onAuthStateChanged(function(user){
      console.log("to dentro de auth",to.name,"from",from.name)
        if (user) {
          if(to.name=="Login"){
            console.log("nextHome")
            next({name:'Home'})
          }
          else{
            console.log("nextNormal1")
            next()
          }
        } else {
          
          
          if (to.matched.some((record) => record.meta.requiresAuth || to.name!="Login")) {
            console.log("nextLogin")
            next({name:'Login'})
          }
          else{
            console.log("nextNormal2")
            next()
          }
        }
        unsubscribe()
    });
    // console.log(unsubscribe)
  } else {

  }
});

// router.beforeEach((to, from, next) => {
//   console.log("Logged1",)
//   if (localStorage.getItem("logged")) {
//     store.commit('auth/isLogged',true)
//     if (to.name == "Login") {
//       next({ name: "Home" });
//     } else {
//       next();
//     }
//   } else {
//     store.commit('auth/isLogged',false)
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       next({ name: "Login" });
//     } else {
//       next();
//     }
//   }

// });

// if (process.env.VUE_APP_AUTH_MODE == "firebase") {
//   let { auth } = require("@/plugins/firebase/firebase");
//   auth.onAuthStateChanged((user) => {
//     console.log("callUserChange")
//     let isLogged = user!=undefined
//     let previousIsLogged = localStorage.getItem("logged")
//     if(previousIsLogged!=isLogged){
//       console.log("rerounteonauthChange")
//       if(isLogged){
//         console.log("pushHome")
//         router.push({name:'Home'})
//       }
//       else{
//         console.log("pushLogin")
//         router.push({name:'Login'})
//       }
//     }
//   });
// }

export default router;
