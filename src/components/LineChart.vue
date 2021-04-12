<script>
import {Line} from 'vue-chartjs/dist/vue-chartjs'

export default {
  extends: Line,
  name: "LineChart",
  props: {
    dates: {
      type: Array
    },
    mins: {
      type: Array
    },
    maxs: {
      type: Array
    },
    sums: {
      type: Array
    },
    means: {
      type: Array
    },
    options: {
      type: Object
    },
    displayExtremes: {
      type: Boolean
    }
  },
  methods: {
    renderLineChart: function () {
      let chartData = {
        labels: this.dates,
        datasets: [
          {
            data: this.means,
            label: "Taux moyen",
            backgroundColor: 'rgb(85,218,244, 0.3)',
            borderColor: 'rgb(85,218,244)'
          }
        ]
      }
      let mins = {
        data: this.mins,
        label: "Taux min.",
        backgroundColor: 'rgb(207,244,85,0.3)',
        borderColor: 'rgb(207,244,85)'
      }
      let maxs = {
        data: this.maxs,
        label: "Taux max",
        backgroundColor: 'rgb(244,135,85,0.3)',
        borderColor: 'rgb(244,135,85)'
      }
      if (this.displayExtremes) {
        chartData.datasets.push(mins)
        chartData.datasets.push(maxs)
      }
      this.renderChart(chartData, this.options)
    }
  },
  mounted() {
    this.addPlugin({
      id: "zoom"
    })
    this.renderLineChart()
  },
  watch: {
    displayExtremes: function () {
      this.renderLineChart()
    }
  }
}
</script>

<style scoped>

</style>
