<template>
  <v-app>
    <Navbar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"></Navbar>
    <DashDrawer ref="drawer" @regionUpdate="updateRegion" @yearUpdate="updateYear"></DashDrawer>
    <router-view></router-view>
  </v-app>
</template>

<script>

import Navbar from "@/components/Navbar";
import DashDrawer from "@/components/DashDrawer";

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    DashDrawer,
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    updateRegion: function (reg) {
      this.region = reg
    },
    updateYear: function (y) {
      this.year = y
    },
  },
};
</script>

<style>
.donut, .pie {
  max-width: 100%;
  height: 250px;
}
</style>

