<template>
  <div>
    <apexchart
      ref="chart"
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
    series: {
      type: Array,
      required: true,
    },
  },
  methods: {
    zoomX(fromDate, toDate) {
      if (this.$refs.chart.chart) {
        this.$refs.chart.zoomX(fromDate.getTime(), toDate.getTime());
      }
    },
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          id: "vuechart-line",
          toolbar:{
            show:false
          },
           zoom:{
             enabled:false
           }
        },
        xaxis: {
          type: "datetime",
          // labels: {
          //   format: 'MMM dd HHH'
          // }
        },
        stroke: {
          curve: "smooth",
        },
      };
    },
  },
};
</script>
