<template>
  <v-navigation-drawer
      v-model="drawer"
      bottom
      temporary
      app>
    <v-list nav dense>

      <v-list-item>
        <v-select :items="years" :label="'Année'" v-model="yearInput"></v-select>
        <v-btn small depressed color="primary" @click="updateYear(yearInput)" class="ml-3">ok</v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-subheader>REGIONS</v-subheader>

      <v-list-item-group color="primary" v-model="model" mandatory>

        <v-list-item v-for="item in regions" :key="item" @click="updateRegion(item)">
          <v-list-item-content>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DashDrawer",
  props: {
    drawerProp: Boolean,
  },
  data() {
    return {
      model: 1,
      years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      regions: ['Auvergne-Rhone-Alpes', 'Bourgogne-Franche-Comte', 'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est', 'Hauts-de-France', 'Ile-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', `Provence-Alpes-Cote d'Azur`],
      yearInput: null,
      region: null,
      year: null,
      drawer: false,
    }
  },
  methods: {
    // This function expects router instance and params object to change
    updatePathParams: function ($router, newParams) {

      // When router is not supplied path or name,
      // it simply tries to update current route with new params or query
      // Almost everything is optional.
      $router.push({params: newParams});
    },
    updateRegion: function (reg) {
      this.region = reg
      this.updatePathParams(this.$router, { region: this.region });
    },
    updateYear: function (y) {
      this.year = y
      this.updatePathParams(this.$router, { year: this.year });
    },
  },
  watch: {
    drawerProp: function () {
      this.drawer = this.drawerProp
    },
    region: function () {
      this.$emit('regionUpdate', this.region)
    },
    year: function () {
      this.$emit('yearUpdate', this.year)
    }
  }
}
</script>

<style scoped>

</style>
