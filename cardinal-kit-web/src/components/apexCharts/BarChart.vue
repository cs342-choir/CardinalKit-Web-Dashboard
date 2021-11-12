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
          toolbar:{
            show:false
          },
           zoom:{
             enabled:false
           }
        },
        xaxis: {
          categories: this.categories,
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'MMM dd',
              hour: 'HH:mm'
            }
          }
        },
      }
    }
  }
};
</script>