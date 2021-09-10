<template>
  <div>
    esta es una ruta
    <div v-for="obj in breadCrumb" :key="obj.label">
      <span>{{obj.label}}</span>
    </div>
    <router-view></router-view>
   <!--  <categories :userId="$route.query.userId" :studyId="$route.query.studyId" /> -->
    <div class="wrapper-graphs content">
      <h1>Activity Index</h1>
      <line-chart
        ref="chart"
        :key="1"
        :series="getActivityIndexDataToGraphic"
      />
    </div>
    
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import categories from '@/components/patients/healthKit/categoryList'
import category from "@/components/patients/healthKit/categoryCard";
import store from "@/store";
import LineChart from "@/components/apexCharts/LineChart";
export default {
  name: "StudyDetail",
  components:{
    categories,
    category,
    LineChart
  },
  data(){
    return{
      path: [
        {label: "Health Categories", path: "/healthKitUser"},
        {label: "Activity", path: "/healthKitUser/categories", param: "categoryId"},
        {label: "Statistics", path: "/healthKitUser/categories/stadistics"},
      ]
    }
  },
  methods: {
    
  },
  computed:{
    ...mapGetters('patient',['getHealthData','getActivityIndexDataToGraphic']),
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

<style lang="scss" scoped>
.wrapper-graphs {
  display: grid;
  gap: 15px;
  max-width: 1200px;
  margin: auto;
}
@media (max-width: 360px) {
  .content{
    padding: 1rem;
  }
}
@media (min-width: 361px) {
  .content{
      padding: 1rem 4rem;

  }
}

</style>