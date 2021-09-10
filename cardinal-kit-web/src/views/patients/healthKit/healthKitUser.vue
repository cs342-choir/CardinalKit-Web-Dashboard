<template>
  <div>
    <bread-crumb :data="breadCrumb"></bread-crumb>
    <router-view></router-view>
   <!--  <categories :userId="$route.query.userId" :studyId="$route.query.studyId" /> -->
   </div>
</template>

<script>
import breadCrumb from "@/components/breadcrumb.vue"
import { mapGetters } from 'vuex';
import categories from '@/components/patients/healthKit/categoryList'
import category from "@/components/patients/healthKit/categoryCard";
import store from "@/store";
export default {
  name: "StudyDetail",
  components:{
    categories,
    breadCrumb,
    category
  },
  data(){
    return{
      path: [
        {label: "Health Categories", path: "/healthKitUser"},
        {label: "Activity", path: "/healthKitUser/categories", param: "categoryId"},
        {label: "Stadistics", path: "/healthKitUser/categories/stadistics"},
      ]
    }
  },
  methods: {},
  computed:{
    ...mapGetters('patient',['getHealthData']),
    getActivityIndexData(){
      return ","
    },
    breadCrumb(){
      let index = this.path.findIndex((obj) => obj.active)
      return  this.path.slice(0, index+1);
    }
  },
  created(){
    this.path.forEach(obj => {
      obj.active = obj.path === this.$route.path;
      if (obj.active && obj.params){  
        obj.label = to.params[obj.param]
      }
      return obj
    });
    this.path = [...this.path]
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("patient/FecthCategoryWithData", {
        studyId: `${to.query.studyId}`,
        userId: `${to.query.userId}`
      }),
      store.dispatch("patient/FetchMetricsData",{
        studyId: `${to.query.studyId}`,
        userId: `${to.query.userId}`
      })
    ]).then(() => {
      next();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.path.forEach(obj => {
      if (obj.param && to.params && to.params[obj.param]){  
        obj.label = to.params[obj.param]
        obj.path = to.path
      }
      obj.active = obj.path === to.path;
      return obj
    });
    this.path = [...this.path]
    next();
  }
};
</script>

