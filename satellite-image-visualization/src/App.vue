<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col sm="12 pa-0"><Header></Header></v-col>
        <v-col sm="2 pa-0">
          <Sidebar/>
        </v-col>
        <v-col sm="10 pa-0">
          <router-view
            v-if="hasMap()"
            :position="position"
            :zoom="zoom"
            @changePosition="changePosition"
          ></router-view>
          <router-view v-else></router-view>
        </v-col>
        <v-col sm="12 pa-0"><Footer></Footer></v-col>
      </v-row>
    </v-container>
  </v-app>
  
</template>

<script>
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

import {fromLonLat, toLonLat} from 'ol/proj';

export default {
  name: 'App',

  components: {
    Sidebar, Header,Footer
  },

  data: () => ({
    longitude: 127,
    latitude: 37,
    zoom: 5
  }),
  computed:{
    position: function(){
      return fromLonLat([this.longitude,this.latitude]);
    }
  },
  methods:{
    changeType(val){
      this.type=val;
    },
    changePosition(center, zoom){
      [this.longitude, this.latitude] = toLonLat(center);
      this.zoom = zoom;
    },
    hasMap: function(){
      const x = document.location.href.split(/\//g).pop();
      return x.includes('map') || x=='' ;
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

#addside{
    position:absolute;
    left: 200px;
    top: 100px;
}
</style>