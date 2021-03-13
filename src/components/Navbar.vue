<template>
  <v-app-bar app color="primary" dark clipped-left dense>
    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-h6">Open Data - Visual</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    drawer: Boolean
  },
}
</script>

<style scoped>

</style>
