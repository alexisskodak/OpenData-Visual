<script>
import {Doughnut} from 'vue-chartjs/dist/vue-chartjs'

export default {
  extends: Doughnut,
  name: "DoughnutChart",
  props: {
    labels: {
      type: Array,
    },
    regionData: {
      type: Array,
    },
    nationalData: {
      type: Array
    },
    displayNationalData: {
      type: Boolean
    },
    percentages: {
      type: Array
    },
    options: {
      type: Object,
    },
    colors: {
      type: Array
    }
  },
  methods: {
    renderDonutChart: function () {
      let national = {
        label: "national",
        data: this.nationalData,
        //borderWidth: 0,
        //weight: 0.75,
        backgroundColor: [
          this.colors[0],
          this.colors[1],
          this.colors[2],
          this.colors[3],
          this.colors[4],
          this.colors[5],
        ]
      }
      let chartData = {
        labels: this.labels,
        datasets: [
          {
            label: "regional",
            data: this.regionData,
            //borderWidth: 0,
            //weight: 0.75,
            backgroundColor: [
              this.colors[0],
              this.colors[1],
              this.colors[2],
              this.colors[3],
              this.colors[4],
              this.colors[5],
            ]
          },
        ]
      }
      if (this.displayNationalData) {
        chartData.datasets.push(national)
      }
      this.renderChart(chartData, this.options);
    }
  },
  mounted() {
    this.renderDonutChart()
  },
  watch: {
    regionData: function () {
      this.$data._chart.destroy()
      this.renderDonutChart()
    },
    colors: function () {
      this.$data._chart.destroy()
      this.renderDonutChart()
    },
    displayNationalData: function () {
      this.$data._chart.destroy()
      this.renderDonutChart()
    }
  }
}
</script>

<style scoped>

</style>
