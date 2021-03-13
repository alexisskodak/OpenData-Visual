<template>
    <div>
      <p class="title mb-0">Consommation et production d'electricite.</p>
      <p class="subtitle-2">Region {{ region }}, {{ year }}. <span class="text-caption">Donnees accessibles depuis
        <a href="https://opendata.reseaux-energies.fr">Open Data Energies</a>
        <v-icon>mdi-link</v-icon></span></p>
    </div>
</template>

<script>
export default {
  name: "DashboardTitle",
  props: ['region', 'year']
}
</script>

<style scoped>

</style>
