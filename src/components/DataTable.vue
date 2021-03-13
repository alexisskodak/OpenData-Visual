<template>
    <v-data-table
        :headers="headers"
        :items="tableData"
        class="elevation-2"
    >
    </v-data-table>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    headers: Array,
    tableData: Array,
  }
}
</script>

<style scoped>

</style>
