<template>

  <v-main app v-if="loading">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-skeleton-loader type="table-heading, article" elevation="2"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader type="table-heading, image" elevation="2"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader type="table-heading, image" elevation="2"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader type="table-heading, image" elevation="2"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <v-main app style="background-color: #F8F9FA" v-else>

    <v-container v-if="prodData">
      <p class="text-h5 mb-0">Données régionales d'énergie</p>
      <p class="body-2">Région {{ region }}, {{ year }}</p>

      <v-row>
        <v-col cols="12" md="6" sm="4">
          <v-row>
            <v-col>
              <v-card>
                <v-card-subtitle class="text-overline pb-0">Production {{ year }}</v-card-subtitle>
                <v-card-title class="pt-0">
                  <animated-number :value="total" :formatValue="getFormattedTotal"
                                   :duration="1000"></animated-number>
                  <p class="mb-0 ml-1">GWh</p>
                </v-card-title>
                <v-card-text>
                  <p class="mb-0 text--primary">
                    <span class="font-weight-bold">{{ getTopPercentage().quantity }} GWh</span> d'énergie
                    {{ getTopPercentage().name }}
                  </p>
                  <p class="text--primary">
                    <span class="font-weight-bold primary--text">{{ getTopPercentage().percent }} %</span>
                    du total de la région
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card>
                <v-card-subtitle class="text-overline pb-0">Consommation {{ year }}</v-card-subtitle>
                <v-card-title class="pt-0">
                  <animated-number :value="consData['consoNette']" :formatValue="getFormattedTotal"
                                   :duration="1000"></animated-number>
                  <p class="mb-0 ml-1">GWh</p>
                </v-card-title>
                <v-card-text>
                  <p class="text--primary">
                    Soit
                    <span :class="`font-weight-bold ${this.getRatioClass}`">
                   {{ this.getConsProdRatio() }}x
                  </span> le total de production de la région
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6" sm="8">

          <v-card class="fill-height">
            <v-card-title>Production / consommation</v-card-title>
            <v-card-text>
              <PieChart :labels="['Production totale', 'Consommation']"
                        :chart-data="getPieData"
                        :options="pieOptions"
                        class="pie">
              </PieChart>
            </v-card-text>
          </v-card>

        </v-col>

        <v-col cols="12" md="6">
          <v-card class="fill-height">
            <v-card-title>Production par filière</v-card-title>
            <v-card-text>
              <DoughnutChart
                  class="donut"
                  :labels="labels"
                  :region-data="quantities"
                  :percentages="getPercentages"
                  :options="chartOptions">
              </DoughnutChart>
            </v-card-text>
          </v-card>

        </v-col>

        <v-col cols="12" md="6">
          <DataTable :headers="headers" :table-data="getTableData"></DataTable>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <Footer></Footer>
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import DoughnutChart from "@/components/DoughnutChart";
import DataTable from "@/components/DataTable";
import PieChart from "@/components/PieChart";
import Footer from "@/components/Footer";

export default {
  name: "KeyFigures",
  components: {
    AnimatedNumber,
    DoughnutChart,
    DataTable,
    PieChart,
    Footer
  },
  data: () => ({
    sources: ['Nucleaire', 'Eolienne', 'Thermique', 'Hydraulique', 'Solaire', 'Bioenergies'],
    headers: [
      {text: 'Source', value: 'name', sortable: false, align: 'start'},
      {text: 'Production (GWh)', value: 'quantity'},
      {text: 'Production (%)', value: 'percent'},
    ],
    labels: [],
    quantities: [],
    chartData: {},
    total: 0,
    loading: false,
    prodData: null,
    consData: null,
    model: 1,
    pieOptions: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        labels: {
          boxWidth: 15
        }
      },
      tooltips: {
        callbacks: {
          title: function () {
            return `Quantité en GWh`;
          },
        }
      },
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 70,
      animation: {
        animateScale: true
      },
      legend: {
        labels: {
          boxWidth: 15
        }
      },
      tooltips: {
        callbacks: {
          title: function () {
            return `Quantite en GWh`;
          },
          afterLabel: function (tooltipItem, data) {
            let dataset = data['datasets'][0]['data']
            let total = dataset.reduce((a, b) => a + b)
            let percent = dataset.map((a) => (a / total * 100).toFixed(0))
            return `Soit ${percent[tooltipItem['index']]} %`
          }
        }
      }
    }
  }),
  mounted() {
    this.region = this.$route.params.region
    this.year = this.$route.params.year
    this.fetchData()
  },
  computed: {
    getPieData: function () {
      return [this.total.toFixed(2), (this.consData['consoNette']).toFixed(2)]
    },
    getRatioClass: function () {
      /**
       * Used to visually indicate Consumption / Production Ratios.
       */
      return parseFloat(this.getConsProdRatio()) >= 1.0 ? 'red--text' : 'green--text'
    },
    getPercentages: function () {
      return this.quantities.map((x) => (x / this.total * 100).toFixed(2))
    },
    getTableData: function () {
      return this.sources.map((n) => ({
        'name': n, 'quantity': this.prodData[n] ?? 0,
        'percent': (this.prodData[n] / this.total * 100).toFixed(2)
      }))
    }
  },
  watch: {
    /**
     * Update year on URL param change
     * @param y
     */
    '$route.params.year': function (y) {
      this.year = y
      this.fetchData()
    },
    /**
     * Update region on URL param change
     * @param r
     */
    '$route.params.region': function (r) {
      this.region = r
      this.fetchData()
    },
  },
  methods: {
    async fetchData() {
      const baseUrl = 'https://opendata-visual.herokuapp.com/api'
      this.loading = true
      try {
        const responses = await Promise.all([
          fetch(`${baseUrl}/production/${this.year}`),
          fetch(`${baseUrl}/consumption/${this.year}`),
        ])

        // Wait until all promises are resolved and build an array of objects
        const data = await Promise.all(
            responses.map(async (res) => res.json())
        );
        // Let the setter do its thing
        this.setData(data)

      } catch (err) {
        console.error(err)
        this.error = err
      }
    },
    setData(data) {
      /**
       * Setter to do various things with no specific logic. To be revisited.
       */
      this.loading = false
      this.prodData = data[0][this.region]
      this.consData = data[1][this.region]

      let quotas = this.sources.map((source) => this.prodData[source] ?? 0);

      for (let i = 0; i < this.sources.length; i++) {
        this.chartData[this.sources[i]] = quotas[i]
      }

      const chartDataObject = Object.fromEntries(Object.entries(this.chartData))

      this.total = quotas.reduce((a, b) => a + b)
      this.quantities = Object.values(chartDataObject)
      this.labels = Object.keys(chartDataObject)
    },
    getFormattedTotal: function (value) {
      /**
       * FormattedTotal is used for 'key figures' section.
       * Required to format an 'Animated Number'
       */
      return `${parseFloat(Number(value).toFixed(0)).toLocaleString('fr')}`
    },
    getConsProdRatio: function () {
      /**
       * Consumption / Production ratio is used for 'key figures' section.
       * A good indicator to evaluate a region's energetic self-sufficiency
       */
      return parseFloat((this.consData['consoNette'] / this.total).toPrecision(2)).toLocaleString('fr')
    },
    getTopPercentage() {
      /**
       * TopPercentage is used for 'key figures' section.
       * Returns the energy source (as a percentage) that contributes most to a region's energy production
       */
      return this.getTableData.sort((a, b) => {
        return b.percent - a.percent
      })[0]
    },
  },
}
</script>

<style scoped>

</style>