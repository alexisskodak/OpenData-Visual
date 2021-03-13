<template>
  <v-navigation-drawer app right class="app-drawer">
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-title><v-icon>mdi-view-dashboard</v-icon> Tableau de bord</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title><v-icon>mdi-chart-timeline-variant</v-icon> Jeux de donnees</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title><v-icon>mdi-account-group</v-icon> A propos</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title><v-icon>mdi-license</v-icon> Licence</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
name: "AppDrawer"
}
</script>

<style scoped>
</style>
