<template>
  <section class="page">
    <h1 class="mb-5">Statistics</h1>
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
          :key="1"
          :series="getSpecificHealthDataGrapFormat(hkCode)"
        />
<!-- 
      <template v-for="(analytic, index) in analytics">
        <multiple-radial-bars
          v-if="analytic.graph.type === 'radialBar'"
          :key="index"
          :series="analytic.graph.series"
          :labels="analytic.graph.labels"
        />
        <bar-chart
          v-if="analytic.graph.type === 'bar'"
          :key="index"
          :series="analytic.graph.series"
          :categories="analytic.graph.categories"
        />
        <line-chart
          v-if="analytic.graph.type === 'line'"
          :key="index"
          :series="analytic.graph.series"
        />
      </template> -->
    </div>
  </section>
</template>

<script>
import store from "@/store";
import multipleRadialBars from "@/components/apexCharts/multipleRadialBars";
import BarChart from "@/components/apexCharts/BarChart";
import LineChart from "@/components/apexCharts/LineChart";
import { ANALYTICS_TO_GRAPH } from "@/plugins/mock/analytics";
import MultipleRadialBars from "../../../components/apexCharts/multipleRadialBars.vue";
import { mapGetters } from 'vuex';
import {transformAppleCode} from "@/helpers/healthKit"

export default {
  components: {
    multipleRadialBars,
    BarChart,
    LineChart,
    MultipleRadialBars,
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
    return {
      analytics,
    };
  },
  computed:{
    ...mapGetters("patient",["getSpecificHealthDataGrapFormat"])
  },
  methods: {
    transformAppleCode
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("patient/FetchSpecificTypeData", {
        studyId: `${to.params.studyId}`,
        userId: `${to.params.userId}`,
        dataType: `${to.params.hkCode}`
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
