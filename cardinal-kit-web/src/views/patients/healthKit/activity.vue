<template>
  <div  class="page">
    <h1 class="mb-5"> Activity </h1>
    <activity-card name="Actividad" date="7 may">
      <template v-slot:card-body>
        <div class="card-info">
          <div class="card-info__group">
            <p class="subtitle">move</p>
            <p>{{calories}} kcal</p>
          </div>
          <div class="card-info__group">
            <p class="subtitle">exercise</p>
            <p>{{exerciseTime}} min</p>
          </div>
          <div class="card-info__group">
            <p class="subtitle">Stand Up</p>
            <p>{{standUpTime}} h</p>
          </div>
        </div>
        <multiple-radial-bars :series="[calories,exerciseTime,standUpTime]" :height="'250'" :labels="['Move','exercise','Stand Up']"/>
      </template>
    </activity-card>
  </div>
</template>
<script>
import store from "@/store";
import activityCard from "@/components/patients/healthKit/activity/activityCard";
import multipleRadialBars from "@/components/apexCharts/multipleRadialBars";

import { mapGetters } from 'vuex';
export default {
  name: "activity",
  components: {
    activityCard,
    multipleRadialBars
  },
  data() {
    return {
      calories:39,
      exerciseTime:10,
      standUpTime:2      
    };
  },
  methods: {},
  computed: {
    ...mapGetters('patient',['getSpecificHealthData'])
  },
  mounted(){
    // let burnedDataArray = this.getSpecificHealthData('41981-2').data
    
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("patient/FetchActivityUser",{ studyId:`${to.params.studyId}`  , userId:`${to.params.userId}`})
      ]).then(()=>{
        next()
      })
  },
};
</script>
