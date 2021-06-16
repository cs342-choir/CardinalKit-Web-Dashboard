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
      console.log(val);
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
          custom: ({ y1, y2, w, seriesIndex, dataPointIndex }) => {
            let date =
              w.globals.initialSeries[seriesIndex].data[dataPointIndex].x;
            return (
              w.globals.seriesNames[seriesIndex] +
              "<br>" +
              date.getDate() +
              " - " +
              this.monthNames[date.getMonth()] +
              "<br>" +
              new Date(y1 * 1000).toISOString().substr(11, 8) +
              " --- " +
              new Date(y2 * 1000).toISOString().substr(11, 8)
            );
          },
        },
        yaxis: {
          max: 24 * 3600 - 1,
          labels: {
            formatter: (value) => {
              // return Math.floor( value )
              return new Date(value * 1000).toISOString().substr(11, 8);
            },
          },
        },
      };
    },
  },
};
</script>
