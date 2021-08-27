<template>
  <div>
    <categories :userId="$route.params.userId" :studyId="$route.params.studyId" />
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
  methods: {
    
  },
  computed:{
    ...mapGetters('patient',['getHealthData','getActivityIndexDataToGraphic']),
    getActivityIndexData(){
      return ","
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("patient/FecthCategoryWithData", {
        studyId: `${to.params.studyId}`,
        userId: `${to.params.userId}`
      }),
      store.dispatch("patient/FetchMetricsData",{
        studyId: `${to.params.studyId}`,
        userId: `${to.params.userId}`
      })
    ]).then(() => {
      next();
    });
  },
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