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

  <v-main app :style="$vuetify.theme.dark ? 'background-color: #121212' : 'background-color: #F8F9FA'" v-else>

    <v-container v-if="prodData">
      <p class="text-h5 mb-0">Données régionales d'énergie</p>
      <p class="body-2">Région {{ region }}, {{ year }}</p>

      <v-row>

        <v-col cols="12" sm="6" md="4">
          <v-card class="fill-height">
            <v-card-subtitle class="text-overline pb-0">Production {{ year }}</v-card-subtitle>
            <v-card-title class="pt-0">
              <animated-number :value="total" :formatValue="getFormattedTotal"
                               :duration="1000"></animated-number>
              <p class="mb-0 ml-1">GWh</p>
            </v-card-title>
            <v-card-text>
              <p class="mb-0">
                Dont <span class="font-weight-bold">{{ getTopPercentage().quantity }} GWh</span> d'énergie
                {{ getTopPercentage().name }}. <br> Soit
                <span class="font-weight-bold primary--text">{{ getTopPercentage().percent }} %</span>
                du total de la région
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-card class="fill-height">
            <v-card-subtitle class="text-overline pb-0">Consommation {{ year }}</v-card-subtitle>
            <v-card-title class="pt-0">
              <animated-number :value="consData['consoNette']" :formatValue="getFormattedTotal"
                               :duration="1000"></animated-number>
              <p class="mb-0 ml-1">GWh</p>
            </v-card-title>
            <v-card-text>
              <p class="mb-0">
                Soit
                <span :class="`font-weight-bold ${this.getRatioClass}`">
                   {{ this.getConsProdRatio() }} fois
                  </span> la production
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-card class="fill-height" v-if="emissions">
            <v-card-subtitle class="text-overline pb-0">
              Taux de CO2 {{ year }}
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-information-outline</v-icon>
                </template>
                <span>
                  Taux d'émissions de CO2, France <br>
                  Exprimé en grammes par kWh d'électricité produite, réf.:
                  <ul>
                    <li>0,986 t CO2 eq /MWh pour les groupes charbon</li>
                    <li>0,777 t CO2 eq /MWh pour les groupes fioul</li>
                  </ul>
                </span>
              </v-tooltip>
            </v-card-subtitle>
            <v-card-title class="pt-0">
              <animated-number :value="emissions['mean']" :formatValue="getFormattedTotal"
                               :duration="1000"></animated-number>
              <p class="mb-0 ml-1">g <small>CO2 / kWh</small></p> <span class="caption ml-2">(moyenne)</span>
            </v-card-title>
            <v-card-text>
              <p class="mb-0">max:
                <animated-number :value="emissions['max']" :formatValue="getFormattedTotal"
                                 :duration="1000" class="secondary--text"></animated-number>
                g <small>CO2 / kWh</small></p>

              <p class="mb-0">min:
                <animated-number :value="emissions['min']" :formatValue="getFormattedTotal"
                                 :duration="1000" class="primary--text"></animated-number>
                g <small>CO2 / kWh</small></p>

            </v-card-text>
          </v-card>
          <v-card v-else class="fill-height">
            <v-card-subtitle class="text-overline pb-0">
              Taux de CO2 {{ year }}
            </v-card-subtitle>
            <v-card-title class="error--text pt-0">
              N/A
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="error" class="ml-3">mdi-information-outline</v-icon>
                </template>
                <span>
                  Les donnees sur l'émission de C02 couvrent uniquement la période 2012-2019
                </span>
              </v-tooltip>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">

          <v-card class="fill-height">
            <v-card-title>Production / consommation</v-card-title>
            <v-card-text>
              <PieChart :labels="['Production totale', 'Consommation']"
                        :chart-data="getPieData"
                        :colors="getChartColors"
                        :options="pieOptions"
                        class="pie">
              </PieChart>
            </v-card-text>
          </v-card>

        </v-col>
        <v-col cols="12" md="6">
          <v-card class="fill-height">
            <v-tabs v-model="tab">
              <v-tab>
                <v-icon>mdi-chart-donut</v-icon>
              </v-tab>
              <v-tab>
                <v-icon>mdi-chart-bar</v-icon>
              </v-tab>
            </v-tabs>
            <v-card-text>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <DoughnutChart
                      class="donut"
                      :labels="labels"
                      :colors="getChartColors"
                      :region-data="quantities"
                      :percentages="getPercentages"
                      :options="chartOptions">
                  </DoughnutChart>
                </v-tab-item>
                <v-tab-item>
                  <BarChart
                      class="donut"
                      :labels="labels"
                      :colors="getChartColors"
                      :region-data="quantities"
                      :percentages="getPercentages"
                      :options="barOptions"
                  >
                  </BarChart>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
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
import BarChart from "@/components/BarChart";

export default {
  name: "KeyFigures",
  components: {
    BarChart,
    AnimatedNumber,
    DoughnutChart,
    DataTable,
    PieChart,
    Footer
  },
  data: () => ({
    tab: null,
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
    emissions: null,
    model: 1,
    pieOptions: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'left',
        labels: {
          boxWidth: 15,
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
    barOptions: {

      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true,
            color: "rgba(87, 87, 87, 0.3)"
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true,
            color: "rgba(87, 87, 87, 0.3)"
          }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          afterBody: function () {
            return '(GWh)'
          },
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      height: 200
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 70,
      animation: {
        animateScale: true
      },
      legend: {
        position: 'left',
        labels: {
          boxWidth: 15,
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
    getChartColors: function () {
      const darkPalete = ["#80b3db", "#f48fb1", "#8c5ed3", "#ea7941", "#f4ca55", "#C5E1A5"];
      const lightPalette = ["#1976d2", "#ff006e", "#8338ec", "#fb5607", "#ffbe0b", "#7CB342"];
      return this.$vuetify.theme.dark ? darkPalete : lightPalette
    },
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
      this.loading = true
      const baseUrl = this.$store.state.baseUrl
      const promises = [
        fetch(`${baseUrl}/production/${this.year}`),
        fetch(`${baseUrl}/consumption/${this.year}`),
      ]
      if (this.year >= 2012) promises.push(fetch(`${baseUrl}/emission/${this.year}`))

      try {
        const responses = await Promise.all(promises)
        const data = await Promise.all(responses.map(async (res) => res.json()));
        // Let the setter do its thing
        this.setData(data)

      } catch (err) {
        console.error(err)
        this.error = err

      } finally {
        this.loading = false
      }
    },
    setData(data) {
      /**
       * Setter to do various things with no specific logic. To be revisited.
       */
      this.prodData = data[0][this.region]
      this.consData = data[1][this.region]
      this.emissions = data[2]

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
