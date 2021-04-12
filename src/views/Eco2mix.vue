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

  <v-main app :style="$vuetify.theme.dark ? 'background-color: #121212' : 'background-color: #F8F9FA'" v-else>
    <v-container>
      <v-row>
        <v-col>
          <p class="text-h5 mb-0">Emissions de CO2 liées à la production d'électricité</p>
          <p class="body-2">Période 2012 - 2019 (Echelle nationale)</p>
          <v-card>
            <v-card-title>Evolution du taux de C02 (g / kWh)</v-card-title>
            <v-card-subtitle>
              <v-checkbox v-model="displayExtremes" color="primary" label="Afficher taux min. et max."></v-checkbox>
            </v-card-subtitle>
            <v-card-text>
              <LineChart
                  :display-extremes="displayExtremes"
                  :dates="dates"
                  :sums="sums"
                  :maxs="maxs"
                  :mins="mins"
                  :means="means"
                  :options="lineOptions"
              ></LineChart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import LineChart from "@/components/LineChart";

export default {
  name: "Eco2mix",
  components: {LineChart},
  data: () => ({
    loading: false,
    displayExtremes: false,
    dates: [],
    sums: [],
    means: [],
    maxs: [],
    mins: [],
    lineOptions: {
      responsive: true,
      maintainAspectRatio: false,
      animationSteps: 50,
      borderWidth: 10,
      scales: {
        yAxes: [{
          type: 'linear',
          gridLines: {
            display: true,
            color: "rgba(87, 87, 87, 0.3)"
          },
          ticks: {
            min: 0,
            //needed to change the scientific notation results from using logarithmic scale
          },
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "rgba(87, 87, 87, 0.3)"
          },
        }]
      },
      legend: {
        labels: {
          boxWidth: 15
        }
      },
      tooltips: {
        callbacks: {
          title: function () {
            return `Taux en g / kWh`;
          },
        }
      },
      plugins: {
        zoom: {
          zoom: {
            enabled: true,
            drag: {
              animationDuration: 1000
            },
            mode: 'x',
            speed: 0.05
          }
        }
      }
    },
  }),
  async mounted() {
    const baseUrl = this.$store.state.baseUrl
    this.loading = true
    try {
      const res = await fetch(`${baseUrl}/emission`)
      const data = await res.json()
      this.setData(data)
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    setData: function (data) {
      // Set metrics from data values
      const values = Object.values(data)
      this.sums = values.map(v => {
        return v.sum
      })
      this.means = values.map(v => {
        return v.mean.toPrecision(2)
      })
      this.maxs = values.map(v => {
        return v.max
      })
      this.mins = values.map(v => {
        return v.min
      })

      // Set the dates from data keys
      const keys = Object.keys(data)
      const parsed = keys.map(k => k.replace(/[(,)]/g, ''))
      this.dates = parsed.map(p => p.replace(' ', '-'))
    }
  }
}
</script>

<style scoped>

</style>
