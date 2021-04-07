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
        <v-col cols="12" md="12">
          <v-skeleton-loader type="table-heading, image" elevation="2"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <v-main app :style="$vuetify.theme.dark ? 'background-color: #121212' : 'background-color: #F8F9FA' " v-else>

    <v-container v-if="histConsData">

      <v-row>
        <v-col>
          <p class="text-h5 mb-0">Historique - Région {{ region }}</p>
          <p class="body-2">Période 2008 - 2019</p>
          <v-card>
            <v-card-title>
              Evolution <span class="primary--text mx-2">production</span> / <span class="secondary--text mx-2">conso.</span>
            </v-card-title>
            <v-card-subtitle>
              <v-switch :label="`Échelle: ${scale.name}`" class="mt-0" v-model="scaleSwitch"></v-switch>
              <v-switch :label="`Axe Y: ${axes.name}`" class="mt-0" v-model="axesSwitch"></v-switch>
            </v-card-subtitle>
            <v-card-text>
              <AreaChart
                  :chart-data="{histProdData, histConsData}"
                  :labels="years"
                  :colors="getChartColors"
                  :axes-options="axes"
                  :options="lineOptions">
              </AreaChart>
            </v-card-text>
          </v-card>
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
import AreaChart from "@/components/AreaChart";
import Footer from "@/components/Footer";

export default {
  name: "OverviewGraph",
  components: {
    Footer,
    AreaChart
  },
  data: () => ({
    loading: false,
    histConsData: null,
    histProdData: null,
    scaleSwitch: false,
    axesSwitch: false,
    regions: ['Auvergne-Rhone-Alpes', 'Bourgogne-Franche-Comte', 'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est', 'Hauts-de-France', 'Ile-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', `Provence-Alpes-Cote d'Azur`],
    years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
    scale: {type: 'linear', name: 'linéaire'},
    axes: {name: 'simple', options: null, ids: [null, null]},
    lineOptions: {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      animationSteps: 50,
      borderWidth: 10,
      scales: {
        yAxes: [{
          type: 'linear',
          ticks: {
            min: 0,
            //needed to change the scientific notation results from using logarithmic scale
            callback: function (value) {
              //pass tick values as a string into Number function
              return `${(Number(value)).toFixed(0)}`;
            }
          },
        }]
      }
    },
  }),
  mounted() {
    this.region = this.$route.params.region
    this.fetchData()
  },
  computed: {
    getChartColors: function () {
      const darkPalete = ["#80b3db", "#f48fb1"];
      const lightPalette = ["#1976d2", "#ff006e"];
      return this.$vuetify.theme.dark ? darkPalete : lightPalette
    },
  },
  watch: {
    /**
     * Update region on URL param change
     * @param r
     */
    '$route.params.region': function (r) {
      this.region = r
      this.fetchData()
    },
    scaleSwitch: function () {
      /**
       * Update data display on switches activation
       */
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
      /**
       * Update data display on switches activation
       */
      if (this.axesSwitch) {
        this.axes.name = 'double'
        this.axes.ids = ['left-y-axis', 'right-y-axis']
        this.axes.options = {
          id: 'right-y-axis',
          position: 'right',
          type: 'linear',
          ticks: {
            fontColor: this.getChartColors[1],
            min: 0,
            callback: function (value) {//needed to change the scientific notation results from using logarithmic scale
              return `${(Number(value)).toFixed(0)}`;//pass tick values as a string into Number function
            }
          }
        }
        this.lineOptions.scales.yAxes.push(this.axes.options)
        this.lineOptions.scales.yAxes[0].id = 'left-y-axis'
        this.lineOptions.scales.yAxes[0].position = 'left'
        this.lineOptions.scales.yAxes[0].ticks.fontColor = this.getChartColors[0]
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
  methods: {
    async fetchData() {
      const baseUrl = 'https://opendata-visual.herokuapp.com/api'
      const regionId = this.regions.indexOf(this.region)

      this.loading = true
      try {
        const responses = await Promise.all([
          fetch(`${baseUrl}/production/historical/${regionId}`),
          fetch(`${baseUrl}/consumption/historical/${regionId}`),
        ])
        const data = await Promise.all(
            responses.map(async (res) => res.json())
        );
        this.setData(data)

      } catch (err) {
        console.log(err)
      }
    },
    setData: function (data) {
      this.loading = false
      this.histProdData = Object.values(data[0])
      this.histConsData = Object.values(data[1])
      delete this.histConsData[2006]
      delete this.histConsData[2007]
    }
  }
}
</script>

<style scoped>

</style>
