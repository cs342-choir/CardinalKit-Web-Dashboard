<template>
  <div>
    <apexchart
      height="300"
      type="bar"
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
    },
    categories: {
      type:Array,
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: this.categories,
        },
      }
    }
  }
};
</script>