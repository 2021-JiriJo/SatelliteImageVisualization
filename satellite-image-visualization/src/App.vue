<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col sm="12 pa-0"><Header></Header></v-col>
        <v-col sm="1 pa-0"><Sidebar @changeType="changeType"></Sidebar></v-col>
        
        <v-col sm="11 pa-0">
          <Map
            v-if="type === 'object'" 
            v-bind:position="position"
            v-bind:zoom="zoom"
            @changePosition="changePosition"
          ></Map>
          <DualMap  
            v-else 
            v-bind:position="position"
            v-bind:zoom="zoom"
            @changePosition="changePosition"
          ></DualMap>
        </v-col>
        <v-col sm="12 pa-0"><Footer></Footer></v-col>
      </v-row>
    </v-container>
  </v-app>
  
</template>

<script>
import Map from './components/Map';
import DualMap from './components/DualMap';
// import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

import {fromLonLat, toLonLat} from 'ol/proj';

export default {
  name: 'App',

  components: {
    DualMap,Map,Sidebar,Header,Footer
  },

  data: () => ({
    type: 'object',
    longitude: 127,
    latitude: 37,
    zoom: 5
  }),
  computed:{
    position: function(){
      return fromLonLat([this.longitude,this.latitude]);
    },
  },
  methods:{
    changeType(val){
      this.type=val;
    },
    changePosition(center, zoom){
      [this.longitude, this.latitude] = toLonLat(center);
      this.zoom = zoom;
    }  
  }
};
</script>

<style>
@font-face {
    font-family: 'twayair';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

*{
  font-family: 'twayair', Arial, Helvetica, sans-serif;
}
</style>

<style scoped>
h1{
  text-align: center;
}
/* 
*{
  padding:0;
} */

</style>