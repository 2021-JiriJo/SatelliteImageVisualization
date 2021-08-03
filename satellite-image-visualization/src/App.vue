<template>
  <v-app>
    <v-container fluid class="d-flex fill-height pa-0">
      <Sidebar class="ma-0 fill-height" :style="{width: sidebarWidth}"  />
        <router-view
            v-if="hasMap()"
            :position="position"
            :zoom="zoom"
            :key="$route.fullPath"
            @changePosition="changePosition"
            @raiseError="raiseError"
            class="fill-height"
            style="width: calc(100vw - 90px); padding: 0px"
        ></router-view>  
        <router-view 
          :key="$route.fullPath"
          @raiseError="raiseError"
           style="width: calc(100vw - 90px);"
           class="fill-height"
          v-else></router-view>
    </v-container>
    <Footer></Footer>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="300"
        v-model="error"
      >
        <Alert :message="message"></Alert>
    </v-dialog>
  </v-app>
  
</template>

<script>
import Sidebar from './components/Sidebar';
// import Header from './components/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';
import {fromLonLat, toLonLat} from 'ol/proj';

export default {
  name: 'App',

  components: {
    Sidebar,Footer,Alert
  },

  data: () => ({
    longitude: 127,
    latitude: 37,
    zoom: 5,
    sidebarWidth: '70px',
    error: false,
    message: ''
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
    raiseError(message){
        this.error=true;
        this.message=message;
        console.log('awefsd');
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
    font-family: 'notosans';
    src: url('./assets/NotoSans.otf') format('otf');
    font-weight: 500;
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