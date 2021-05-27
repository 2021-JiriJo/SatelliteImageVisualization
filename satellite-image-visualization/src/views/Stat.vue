<template>
  <v-container fluid>
    <v-row>

      <v-col sm="12">       
        <h2>객체 분석 정보</h2>
        </v-col>
      <v-col sm="6">
        <v-select
          :items="date"
          label="Date"
          solo
        ></v-select>
        <BarChart></BarChart>
        </v-col>
      <v-col sm="6">
        <v-select
          :items="objects"
          label="objects"
          solo
        ></v-select>
        <LineChart></LineChart>
      </v-col>
      <v-col sm="12"></v-col>
      <v-col sm="12"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarChart from './chart/BarChart.vue';
import LineChart from './chart/LineChart.vue';

export default {
  components: {BarChart, LineChart},
  data(){
    return {
      date:['2021-01-21','2021-01-22','2021-01-23','2021-01-24'],
      objects:['plane','car','tank','jeep']
    }
  }
}
</script>

<style scoped>
#map{
  height:80vh
}
</style>