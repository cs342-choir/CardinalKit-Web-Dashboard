<template>
  <div>
    <apexchart
      type="radialBar"
      height="250"
      :options="chartBarOptions"
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
    labels:{
      type:Array,
      required:true
    },
    series:{
      type:Array,
      required:true
    }
  },
  computed: {
    chartBarOptions() {
      return {
       
        chart: {
          id: "vuechart-example",
           background: '#000',
           toolbar:{
            show:false
          },
           zoom:{
             enabled:false
           }
        },
        xaxis: {
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'MMM dd',
              hour: 'HH:mm'
            }
          }
        },
        plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: '22px',
                    color:'#fff'
                  },
                  value: {
                    fontSize: '16px',
                    color:'#fff'
                  },
                }
              }
            },
        labels: this.labels,
      };
    },
  },
};
</script>
