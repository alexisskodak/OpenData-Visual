<script>
import {Bar} from 'vue-chartjs/dist/vue-chartjs'
export default {
  name: "BarChart",
  extends: Bar,
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
    renderBarChart: function () {
      this.renderChart({
            labels: this.labels,
            datasets: [{
              data: this.regionData,
              backgroundColor: this.colors[0]
            }]
          },
          this.options
      );
    }
  },
  mounted() {
    this.renderBarChart()
  },
  watch: {
    regionData: function () {
      this.$data._chart.destroy()
      this.renderBarChart()
    },
    colors: function () {
      this.$data._chart.destroy()
      this.renderBarChart()
    }
  }
}
</script>

<style scoped>

</style>
