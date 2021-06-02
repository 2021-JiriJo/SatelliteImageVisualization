<template>
  <v-app>
    <Header></Header>
    <div class="d-flex justify-start ">
      <Sidebar style="height:95vh;" class="ma-0" :sidebarWidth="sidebarWidth" />
        <router-view
            v-if="hasMap()"
            :position="position"
            :zoom="zoom"
            :key="$route.fullPath"
            @changePosition="changePosition"
            @raiseError="raiseError"
            class="d-sm-inline"
            style="height:95vh; width: calc(100vw - 70px);"
            
            
        ></router-view>  
        <router-view :key="$route.fullPath" v-else></router-view>
    </div>
    <Footer></Footer>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="300"
        v-model="error"
      >
        <Alert></Alert>
    </v-dialog>
  </v-app>
  
</template>

<script>
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';

import {fromLonLat, toLonLat} from 'ol/proj';

export default {
  name: 'App',

  components: {
    Sidebar, Header,Footer,Alert
  },

  data: () => ({
    longitude: 127,
    latitude: 37,
    zoom: 5,
    sidebarWidth: '70px',
    error: false
  }),
  computed:{
    position: function(){
      return fromLonLat([this.longitude,this.latitude]);
    }
  },
  mounted(){
    // setInterval(()=>{this.notexist = !this.notexist; console.log(this.notexist)},1000);
  },
  methods:{
    toggle(){

    },
    changeType(val){
      this.type=val;
    },
    raiseError(){
      this.error=true;
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

#sidebar{
  width:auto;
}
</style>

<style scoped>
h1{
  text-align: center;
}

</style>