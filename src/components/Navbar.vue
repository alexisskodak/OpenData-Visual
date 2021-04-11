<template>
  <v-app-bar app dark :color="$vuetify.theme.dark ? 'dark' : 'primary'" clipped-left dense flat>

    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-h6">Open Data - Visual</v-app-bar-title>
    <v-spacer></v-spacer>
    <div class="d-flex align-center mb-n5">
      <v-switch
          v-model="$vuetify.theme.dark"
          color="secondary">
        <template v-slot:label>
          <v-icon>mdi-weather-night</v-icon>
        </template>
      </v-switch>
    </div>

    <template v-slot:extension>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tabs-slider color="pink"></v-tabs-slider>

        <v-tab :to="{ name: 'Yearly', params: {year: storedYear, region: storedRegion} }" dark>Chiffres clés</v-tab>
        <v-tab :to="{ name: 'Overview', params: {region: storedRegion} }" dark>Vue d'ensemble</v-tab>
        <v-tab :to="{ name: 'Emissions'}">Données Eco2mix</v-tab>

      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    drawer: Boolean,
  },
  data: () => ({
    tab: null,
  }),
  computed: {
    storedYear: function () {
      return this.$store.getters.getYear
    },
    storedRegion: function () {
      return this.$store.getters.getRegion
    }
  }
}
</script>

<style scoped>

</style>
