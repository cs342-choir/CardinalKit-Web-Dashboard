import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import Home from "../views/Home.vue";
import Login from "@/views/auth/login";
import SignUp from "@/views/auth/signUp";
import StudiesList from "@/views/studies/patientsList";
import StudyDetail from "@/views/studies/studyDetail";
import HealthUser from "@/views/patients/healthKit/healthKitUser";
import Activity from "@/views/patients/healthKit/activity";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
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
      requiresAuth: true,
    },
  },
  {
    path: "/studies",
    name: "studies",
    component: StudiesList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/studyDetail/:idStudy",
    name: "studyDetail",
    component: StudyDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/healthKitUser/:studyId/:userId",
    name: "healthUser",
    component: HealthUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/userActivity/:studyId/:userId",
    name: "userActivity",
    component: Activity,
    meta: {
      requiresAuth: true,
    },
  },

  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (process.env.VUE_APP_AUTH_MODE == "firebase") {
    let { auth } = require("@/plugins/firebase/firebase");
    let unsubscribe = auth.onAuthStateChanged(function(user){
        if (user) {
          if(to.name=="Login"){
            next({name:'Home'})
          }
          else{
            next()
          }
        } else {
          
          
          if (to.matched.some((record) => record.meta.requiresAuth && to.name!="Login")) {
            next({name:'Login'})
          }
          else{
            next()
          }
        }
        unsubscribe()
    });
  } else {

  }
});


export default router;
