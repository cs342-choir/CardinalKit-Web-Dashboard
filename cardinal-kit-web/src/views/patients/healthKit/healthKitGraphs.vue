<template>
  <section class="page">
    <h1 class="mb-5">Statistics</h1>
    <div class="mb-5">
      <alt-date calendar range @update:model-value="handleChangeDate"/>
    </div>
    <!-- <div class="flex mb-1">
      <p>study: {{studyId}}</p>
      <p>user: {{userId}}</p>
      <p>health Kit Workout: {{hkCode}}</p>
    </div> -->
    <div class="mb-1">
      <h3>{{ transformAppleCode(hkCode) }}</h3>
      <!-- <div class="flex">
        <p>34</p><label>brazadas</label>
      </div>
      <div class="date">
        <p>Actividad</p>
        <small>Jueves, 13 de mayo 2021</small>
      </div> -->
    </div>
    <div class="wrapper-graphs">
      <line-chart 
        v-if="GetGraphType=='line'"
        :key="1" 
        :series="getSpecificHealthDataGrapFormat(hkCode)" 
      />
      <scatter-chart
        v-if="GetGraphType=='scatter'"
        :key="2"
        :series="getSpecificHealthDataGrapFormat(hkCode)"
        :labels="GetCategoriesByHkType(hkCode)"
      />
    </div>
  </section>
</template>

<script>
import store from "@/store";
import multipleRadialBars from "@/components/apexCharts/multipleRadialBars";
import BarChart from "@/components/apexCharts/BarChart";
import LineChart from "@/components/apexCharts/LineChart";
import ScatterChart from "@/components/apexCharts/ScatterChart";
import { ANALYTICS_TO_GRAPH } from "@/plugins/mock/analytics";
import MultipleRadialBars from "../../../components/apexCharts/multipleRadialBars.vue";
import { mapGetters } from "vuex";
import { transformAppleCode,GetCategoriesByHkType } from "@/common/helpers/healthKit";
import AltDate from '@/components/calendar/AltDate.vue';
import { ref, watchEffect } from 'vue';

export default {
  components: {
    multipleRadialBars,
    BarChart,
    LineChart,
    MultipleRadialBars,
    ScatterChart,
    AltDate,
  },
  props: {
    studyId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    hkCode: {
      type: String,
      required: true,
    },
  },
  setup() {
    const analytics = ANALYTICS_TO_GRAPH;
    const date = ref();

    function handleChangeDate(value) {
      date.value = value;
      console.log(date.value);
    }

    return {
      analytics,
      date,
      handleChangeDate
    };
  },
  computed: {
    ...mapGetters("patient", ["getSpecificHealthDataGrapFormat"]),
    GetGraphType(){
      if(this.hkCode.includes("Category")){
        return "scatter"
      }
      else{
        return "line"
      }
    }
  },
  methods: {
    transformAppleCode,
    GetCategoriesByHkType
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("patient/FetchSpecificTypeData", {
        studyId: `${to.params.studyId}`,
        userId: `${to.params.userId}`,
        dataType: `${to.params.hkCode}`,
      }),
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
</style>
