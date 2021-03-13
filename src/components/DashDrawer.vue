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
    drawer: Boolean,
    years: Array,
    regions: Array,
  },
  data() {
    return {
      model: 1,
      yearInput: null,
      region: null,
      year: null,
    }
  },
  methods: {
    updateRegion: function (reg) {
      this.region = reg
    },
    updateYear: function (y) {
      this.year = y
    },
  },
  watch: {
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
