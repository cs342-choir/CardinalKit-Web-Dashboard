<template>
  <div>
    <apexchart
      ref="chart"
      type="scatter"
      height="250"
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
   methods: {
    zoomX(fromDate, toDate) {
      if (this.$refs.chart.chart) {
        this.$refs.chart.zoomX(fromDate.getTime(), toDate.getTime());
      }
    },
  },
  props: {
    labels: {
      type: Array,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: "scatter",
          zoom: {
            type: "xy",
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          show: true,
          showAlways: true,
          showForNullSeries: true,
          opposite: false,
          reversed: false,
          logarithmic: false,
          tickAmount: this.labels.length,
          min: 0,
          max: this.labels.length - 1,
          forceNiceScale: true,
          floating: false,
          decimalsInFloat: 0,
          labels: {
            show: true,
            align: "right",
            minWidth: 0,
            maxWidth: 160,
            style: {
              colors: [],
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            offsetX: 0,
            offsetY: 0,
            rotate: -45,
            formatter: (value) => {
              // return Math.floor( value )
              return this.labels[Math.floor(value)];
            },
          },
          axisBorder: {
            show: true,
            color: "#78909C",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "#78909C",
            width: 5,
            offsetX: 0,
            offsetY: 0,
          },
        },
      };
    },
  },
};
</script>
