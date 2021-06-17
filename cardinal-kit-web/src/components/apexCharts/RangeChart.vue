<template>
  <div>
    <apexchart
      ref="chart"
      height="300"
      type="rangeBar"
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
  data() {
    return {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  props: {
    series: {
      type: Array,
      required: true,
    },
    yAxisFormat:{
      type: Function,
      required: false
    },
    yMax:{
      type: Number,
      required: false
    },
     yMin:{
      type: Number,
      required: false
    },
    customTooltip:{
      type: Function,
      required: false
    },
    titleFormatter:{
      type: Function,
      required: false
    }
  },
  methods: {
    zoomX(fromDate, toDate) {
      if (this.$refs.chart.chart) {
        this.$refs.chart.zoomX(fromDate.getTime(), toDate.getTime());
      }
    },
  },
  computed: {
    format(val) {
      if (Date.parse(value)) {
        let date = new Date(value);
        return date.getDate() + " - " + this.monthNames[date.getMonth()];
      } else {
        return new Date(value * 1000).toISOString().substr(11, 8);
      }
    },
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          custom: this.customTooltip,
          y:{
            formatter:(value,{series,seriesIndex,dataPointIndex,w})=>{
              let y = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y

              if(this.yAxisFormat){
                y= [this.yAxisFormat(y[0]),this.yAxisFormat(y[1])]
              }

              return y[0]+" - "+y[1]
            },
            title: {
              formatter: this.titleFormatter
          },
          }        
        },
        yaxis: {
          max: this.yMax?this.yMax: 24 * 3600 - 1,
          min: this.yMin?this.yMin:0,
          labels: {
            formatter:this.yAxisFormat
          },
        },
      };
    },
  },
};
</script>
