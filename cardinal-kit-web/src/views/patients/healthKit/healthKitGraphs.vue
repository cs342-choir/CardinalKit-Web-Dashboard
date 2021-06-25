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
    <range-chart
      v-if="GetGraphType == 'sleep'"
      ref="chart"
      :key="3"
      :series="getSpecificHealthDataGrapFormat(hkCode)"
      :yAxisFormat=" function(value) {return new Date(value).toISOString().substr(11, 8);}"
      :yMax="24 * 3600 - 1"
      :yMin="0"
    />  
    <range-chart
      v-if="GetGraphType == 'heart'"
      ref="chart"
      :key="4"
      :series="getSpecificHealthDataGrapFormat(hkCode)"
      :yMax = 100
      :yMin = 0
      :titleFormatter="(seriesName,{w,seriesIndex,dataPointIndex}) => {
              x=w.globals.initialSeries[seriesIndex].data[dataPointIndex].x
              hourStart = x.getHours()
              hourEnd = hourStart+1
              return seriesName +': '+ hourStart+' - '+hourEnd}"
    />
    <range-chart
      v-if="GetGraphType == 'mindful'"
      ref="chart"
      :key="5"
      :series="getSpecificHealthDataGrapFormat(hkCode)"   
      :horizontal=true
      :toolTipYFormat=" function(value) {return new Date(value).toISOString().substr(11, 8);}"
    />
<alt-table :columns="[{ header: 'Date' }, { header: 'Value' }]">
    <template #t-row>
      <tr v-for="(data, index) in getSpecificHealthData(hkCode)" :key="index">
        <td>
          {{data.Date.Date}}
        </td>
        <td>
        {{data.Value}} {{data.Unit}}
        </td>
        <!-- <td>{{index + 1}}</td>
        <td>
          {{patient.name || 'NN'}}
        </td>
        <td>
          <span class="pointer" @click="handleSelecPatient(patient.id)">
            detail
          </span>
        </td> -->
      </tr>
    </template>
  </alt-table>

    </div>
  </section>
</template>

<script>
import store from "@/store";
import multipleRadialBars from "@/components/apexCharts/multipleRadialBars";
import BarChart from "@/components/apexCharts/BarChart";
import LineChart from "@/components/apexCharts/LineChart";
import ScatterChart from "@/components/apexCharts/ScatterChart";
import RangeChart from "@/components/apexCharts/RangeChart"
import { ANALYTICS_TO_GRAPH } from "@/plugins/mock/analytics";
import MultipleRadialBars from "../../../components/apexCharts/multipleRadialBars.vue";
import { mapActions, mapGetters } from "vuex";
import {
  transformAppleCode,
  GetCategoriesByHkType,
} from "@/common/helpers/healthKit";
import AltDate from "@/components/calendar/AltDate.vue";
import altTable from '@/components/tables/altTable';

export default {
  components: {
    multipleRadialBars,
    BarChart,
    LineChart,
    MultipleRadialBars,
    ScatterChart,
    AltDate,
    RangeChart,
    altTable
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
    ...mapGetters("patient", ["getSpecificHealthDataGrapFormat","getSpecificHealthData"]),
    GetGraphType() {
      if(this.hkCode=="HKCategoryTypeIdentifierSleepAnalysis"){
        console.log("return sleep")
        return "sleep"
      }
      else if(this.hkCode=="HKQuantityTypeIdentifierHeartRate"){
        console.log("return Heart")
        return "heart"
      }
      else if(this.hkCode=="HKCategoryTypeIdentifierMindfulSession"){
        return "mindful"
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
    ...mapActions("patient",["FetchSpecificTypeData"]),
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
