<template>
  <v-app-bar app color="primary" dark clipped-left dense flat>
    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-h6">Open Data - Visual</v-app-bar-title>
    <template v-slot:extension>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tabs-slider color="secondary"></v-tabs-slider>

        <v-tab :to="{ name: 'Yearly' }">Chiffres clés</v-tab>
        <v-tab :to="{ path: 'regional' }">Vue d'ensemble</v-tab>

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
  })
}
</script>

<style scoped>

</style>
