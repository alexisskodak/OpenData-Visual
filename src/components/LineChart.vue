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
  },
  methods: {
    renderLineChart: function () {
      this.renderChart({
        labels: this.dates,
        datasets: [
          {
            data: this.mins,
            label: "Min",
            backgroundColor: 'rgb(207,244,85,0.3)',
            borderColor: 'rgb(207,244,85)'
          },
          {
            data: this.maxs,
            label: "Max",
            backgroundColor: 'rgb(244,135,85,0.3)',
            borderColor: 'rgb(244,135,85)'
          },
          {
            data: this.means,
            label: "Moyenne",
            backgroundColor: 'rgb(85,218,244, 0.3)',
            borderColor: 'rgb(85,218,244)'
          }
        ]
      }, this.options)
    }
  },
  mounted() {
    this.renderLineChart()
  }
}
</script>

<style scoped>

</style>
