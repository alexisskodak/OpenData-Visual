<script>

import {Pie} from 'vue-chartjs/dist/vue-chartjs'

export default {
  extends: Pie,
  name: "PieChart",
  props: {
    labels: {
      type: Array
    },
    colors: {
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
              borderWidth: 0,
              backgroundColor: [
                this.colors[0],
                this.colors[1],
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
    },
    colors: function () {
      this.$data._chart.destroy()
      this.renderPieChart()
    }
  }
}
</script>

<style scoped>

</style>
