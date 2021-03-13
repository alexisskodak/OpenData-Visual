<script>

import {Pie} from 'vue-chartjs/dist/vue-chartjs'

export default {
  extends: Pie,
  name: "PieChart",
  props: {
    labels: {
      type: Array
    },
    chartData: {
      type: Array
    },
    options: {
      type: Object
    }
  },
  methods: {
    renderPieChart: function () {
      this.renderChart({
            labels: this.labels,
            datasets: [{
              data: this.chartData,
              backgroundColor: [
                "#1976d2",
                "#ff006e",
              ]
            }]
          },
          this.options
      );
    }
  },
  mounted() {
    this.renderPieChart()
  },
  watch: {
    chartData: function () {
      this.$data._chart.destroy()
      this.renderPieChart()
    }
  }
}
</script>

<style scoped>

</style>
