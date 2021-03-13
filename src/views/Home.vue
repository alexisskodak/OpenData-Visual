<template>
  <v-app>
    <landing-screen :regions="regions" :years="years"></landing-screen>
  </v-app>
</template>

<script>

import LandingScreen from "@/components/LandingScreen"

export default {
  name: 'Home',
  components: {
    LandingScreen,
  },
  data() {
    return {
      regions: ['Auvergne-Rhone-Alpes', 'Bourgogne-Franche-Comte', 'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est', 'Hauts-de-France', 'Ile-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', `Provence-Alpes-Cote d'Azur`],
      years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
    }
  }
}
</script>

<style>
</style>
