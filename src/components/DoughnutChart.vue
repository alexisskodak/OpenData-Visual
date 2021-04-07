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
      this.renderChart({
            labels: this.labels,
            datasets: [{
              data: this.regionData,
              borderWidth: 0,
              backgroundColor: [
                this.colors[0],
                this.colors[1],
                this.colors[2],
                this.colors[3],
                this.colors[4],
                this.colors[5],
              ]
            }]
          },
          this.options
      );
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
    }
  }
}
</script>

<style scoped>

</style>
