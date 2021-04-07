<script>
import { Line } from 'vue-chartjs/dist/vue-chartjs'

export default {
  extends: Line,
  name: "AreaChart",
  props: {
    labels: {
      type: Array
    },
    chartData: {
      type: Object
    },
    options: {
      type: Object
    },
    axesOptions: {
      type: Object
    },
    colors: {
      type: Array
    }
  },
  methods: {
    renderLineChart: function () {
      this.renderChart({
            labels: this.labels,
            datasets: [
              {
                data: this.chartData.histProdData,
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: this.colors[0],
                yAxisID: this.axesOptions.ids[0] ?? null
              },
              {
                data: this.chartData.histConsData,
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: this.colors[1],
                yAxisID: this.axesOptions.ids[1] ?? null
              },
            ],
          }, this.options
      )
    }
  },
  mounted() {
    this.renderLineChart()
  },
  watch: {
    chartData: function () {
      this.$data._chart.destroy()
      this.renderLineChart()
    },
    options: function () {
      this.$data._chart.destroy()
      this.renderLineChart()
    }
  },
}
</script>

<style scoped>

</style>
