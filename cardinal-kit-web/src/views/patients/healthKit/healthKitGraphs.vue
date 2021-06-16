<template>
  <section class="page">
    <h1 class="mb-5">Statistics</h1>
    <div class="mb-5">
      <alt-date withCalendar :defaultDate="date" range @update:model-value="handleChangeDate" />
    </div>
    <div class="mb-1">
      <h3>{{ transformAppleCode(hkCode) }}</h3>
    </div>
    <div class="wrapper-graphs">
      <line-chart
        v-if="GetGraphType == 'line'"
        ref="chart"
        :key="1"
        :series="getSpecificHealthDataGrapFormat(hkCode)"
      />
      <scatter-chart
        v-if="GetGraphType == 'scatter'"
        ref="chart"
        :key="2"
        :series="getSpecificHealthDataGrapFormat(hkCode)"
        :labels="GetCategoriesByHkType(hkCode)"
      />
    <sleep-graph
      v-if="GetGraphType == 'sleep'"
      ref="chart"
      :key="2"
      :series="getSpecificHealthDataGrapFormat(hkCode)"
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
import SleepGraph from "@/components/apexCharts/SleepGraph"
import { ANALYTICS_TO_GRAPH } from "@/plugins/mock/analytics";
import MultipleRadialBars from "../../../components/apexCharts/multipleRadialBars.vue";
import { mapActions, mapGetters } from "vuex";
import {
  transformAppleCode,
  GetCategoriesByHkType,
} from "@/common/helpers/healthKit";
import AltDate from "@/components/calendar/AltDate.vue";

export default {
  components: {
    multipleRadialBars,
    BarChart,
    LineChart,
    MultipleRadialBars,
    ScatterChart,
    AltDate,
    SleepGraph
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
  computed: {
    ...mapGetters("patient", ["getSpecificHealthDataGrapFormat"]),
    GetGraphType() {
      if(this.hkCode=="HKCategoryTypeIdentifierSleepAnalysis"){
        return "sleep"
      }
      else if (this.hkCode.includes("Category")) {
        return "scatter";
      } else {
        return "line";
      }
    },
  },
  data() {
    return {
      date: {startDate: new Date(new Date().setDate(-30))},
    };
  },
  methods: {
    ...mapActions("patient",["FetchSpecificTypeData","ReviewDates"]),
    transformAppleCode,
    GetCategoriesByHkType,
    handleChangeDate(value) {
      if (value) {      
        if (this.$refs.chart) {
          if (value.endDate) {
            this.FetchSpecificTypeData({studyId:this.studyId,userId:this.userId,dataType:this.hkCode, dates:{startDate:value.startDate,endDate:value.endDate}} )
            this.$refs.chart.zoomX(
              value.startDate,
              value.endDate
            );
          }
        }
      }
    },
  },
  mounted(){
      this.ReviewDates()
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
