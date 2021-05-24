<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12"><BarChart></BarChart></v-col>
      <v-col sm="12"><LineChart></LineChart></v-col>
      <v-col sm="12">1</v-col>
      <v-col sm="12">1</v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarChart from './chart/BarChart.vue';
import LineChart from './chart/LineChart.vue';

export default {
  components: {BarChart, LineChart},
}
</script>

<style scoped>
#map{
  height:80vh
}
</style>