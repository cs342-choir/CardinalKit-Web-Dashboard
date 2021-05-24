<template>
  <div>
    <apexchart
      height="300"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    series:{
      type:Array,
      required:true
    }
  },
  computed: {
    chartOptions () {
      return {
        chart: {
          id: "vuechart-line",
        },
        xaxis: {
          type: 'datetime',
          // labels: {
          //   format: 'MMM dd HHH'
          // }
        },
        stroke: {
          curve: 'smooth'
        },
      };
    }
  },
};
</script>