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
    }
  },
  methods: {
    renderDonutChart: function () {
      this.renderChart({
            labels: this.labels,
            datasets: [{
              data: this.regionData,
              backgroundColor: [
                "#1976d2",
                "#ff006e",
                "#8338ec",
                "#fb5607",
                "#ffbe0b",
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
    }
  }
}
</script>

<style scoped>

</style>
