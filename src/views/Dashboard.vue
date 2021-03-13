<template>
  <v-app>
    <Navbar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"></Navbar>
    <DashDrawer ref="drawer"
                :years="years"
                :regions="regions"
                @regionUpdate="updateRegion"
                @yearUpdate="updateYear"
    ></DashDrawer>

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
      <v-container ref="dashboard" class="pt-5" v-if="prodData">
        <p class="text-overline mb-0">Données régionales d'énergie</p>
        <p class="text-h5">Chiffres clés</p>
        <p class="body-2">Région {{ region }}, {{ year }}</p>

        <v-row>
          <v-col cols="12" md="6" sm="4">
            <v-row>
              <v-col>
                <v-card>
                  <v-card-subtitle class="text-overline pb-0">Production {{ year }}</v-card-subtitle>
                  <v-card-title class="pt-0">
                    <animated-number :value="total" :formatValue="getFormattedTotal" :duration="1000"></animated-number>
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
                    <animated-number :value="consData['consoNette']" :formatValue="getFormattedTotal" :duration="1000"></animated-number>
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

        <p class="text-h5 mt-10">Vue d'ensemble</p>
        <p class="body-2">Période 2008 - 2019</p>

        <v-row>
          <v-col cols="12" md="12">
            <v-card>
              <v-card-title>
                Evolution production / consommation
              </v-card-title>
              <v-card-subtitle>
                <v-switch :label="`Échelle: ${scale.name}`" class="mt-0" v-model="scaleSwitch"></v-switch>
                <v-switch :label="`Axe Y: ${axes.name}`" class="mt-0" v-model="axesSwitch"></v-switch>
              </v-card-subtitle>
              <v-card-text>
                <AreaChart
                    :chart-data="{histProdData, histConsData}"
                    :labels="years"
                    :axes-options="axes"
                    :options="lineOptions">
                </AreaChart>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import DoughnutChart from "@/components/DoughnutChart";
import AreaChart from "@/components/AreaChart";
import PieChart from "@/components/PieChart";
import DataTable from "@/components/DataTable";
import DashDrawer from "@/components/DashDrawer";
import Navbar from "@/components/Navbar";

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    DashDrawer,
    DataTable,
    PieChart,
    AreaChart,
    DoughnutChart,
    AnimatedNumber
  },
  data() {
    return {
      regions: ['Auvergne-Rhone-Alpes', 'Bourgogne-Franche-Comte', 'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est', 'Hauts-de-France', 'Ile-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', `Provence-Alpes-Cote d'Azur`],
      years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      sources: ['Nucleaire',  'Eolienne',  'Thermique', 'Hydraulique', 'Solaire',  'Bioenergies'],
      headers: [
        {text: 'Source', value: 'name', sortable: false, align: 'start'},
        {text: 'Production (GWh)', value: 'quantity'},
        {text: 'Production (%)', value: 'percent'},
      ],
      drawer: false,
      labels: [],
      quantities: [],
      chartData: {},
      total: 0,
      loading: false,
      year: 0,
      region: '',
      prodData: null,
      consData: null,
      histConsData: null,
      histProdData: null,
      scaleSwitch: false,
      axesSwitch: false,
      model: 1,
      scale: {type: 'linear', name: 'linéaire'},
      axes: {name: 'simple', options: null, ids: [null, null]},
      lineOptions: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        // aspectRatio: 2,
        animationSteps: 50,
        borderWidth: 10,
        scales: {
          yAxes: [{
            type: 'linear',
            ticks: {
              min: 0,
              callback: function (value) {//needed to change the scientific notation results from using logarithmic scale
                return `${(Number(value)).toLocaleString('fr')} GWh`;//pass tick values as a string into Number function
              }
            },
          }]
        }
      },
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
    }
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
  methods: {
    updateRegion: function (reg) {
      this.region = reg
    },
    updateYear: function (y) {
      this.year = y
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
      return this.getTableData.sort((a, b) => { return b.percent - a.percent })[0]
    },
    async fetchData() {
      const baseUrl = 'https://opendata-visual.herokuapp.com/api'
      this.loading = true
      try {
        let regionId = this.regions.indexOf(this.region)

        const responses = await Promise.all([
          fetch(`${baseUrl}/production/${this.year}`),
          fetch(`${baseUrl}/consumption/${this.year}`),
          fetch(`${baseUrl}/production/historical/${regionId}`),
          fetch(`${baseUrl}/consumption/historical/${regionId}`),
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
      this.histProdData = Object.values(data[2])
      this.histConsData = Object.values(data[3])

      let quotas = this.sources.map((source) => this.prodData[source] ?? 0);

      for (let i = 0; i < this.sources.length; i++) {
        this.chartData[this.sources[i]] = quotas[i]
      }

      const chartDataObject = Object.fromEntries(Object.entries(this.chartData))
      delete this.histConsData[2006]
      delete this.histConsData[2007]

      this.total = quotas.reduce((a, b) => a + b)
      this.quantities = Object.values(chartDataObject)
      this.labels = Object.keys(chartDataObject)
    },
  },
  mounted() {
    this.region = this.$route.query.region
    this.year = this.$route.query.year
    this.fetchData()
  },
  watch: {
    // Update year and region on change
    year: function () {
      this.fetchData()
    },
    region: function () {
      this.fetchData()
    },

    // Update Data on switches activation
    scaleSwitch: function () {
      if (this.scaleSwitch) {
        this.scale = {type: 'logarithmic', name: 'logarithmique'}
        for (let axis of this.lineOptions.scales.yAxes) {
          axis.type = 'logarithmic'
        }
      } else {
        this.scale = {type: 'linear', name: 'linéaire'}
        for (let axis of this.lineOptions.scales.yAxes) {
          axis.type = 'linear'
        }
      }
    },
    axesSwitch: function () {
      if (this.axesSwitch) {
        this.axes.name = 'double'
        this.axes.ids = ['left-y-axis', 'right-y-axis']
        this.axes.options = {
          id: 'right-y-axis',
          position: 'right',
          type: 'linear',
          ticks: {
            fontColor: '#ff006e',
            min: 0,
            callback: function (value) {//needed to change the scientific notation results from using logarithmic scale
              return `${(Number(value)).toLocaleString('fr')} GWh`;//pass tick values as a string into Number function
            }
          }
        }
        this.lineOptions.scales.yAxes.push(this.axes.options)
        this.lineOptions.scales.yAxes[0].id = 'left-y-axis'
        this.lineOptions.scales.yAxes[0].position = 'left'
        this.lineOptions.scales.yAxes[0].ticks.fontColor = '#1976d2'
      } else {
        this.axes.name = 'simple'
        this.axes.ids = [null, null]
        this.lineOptions.scales.yAxes.pop()
        delete this.lineOptions.scales.yAxes[0].id
        delete this.lineOptions.scales.yAxes[0].position
        delete this.lineOptions.scales.yAxes[0].ticks.fontColor
      }
    }
  },
};
</script>

<style>
.donut, .pie {
  max-width: 100%;
  height: 250px;
}
</style>

