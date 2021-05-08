<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col sm="12 pa-0"><Header></Header></v-col>
        <v-col sm="1 pa-0"><Sidebar @changeType="val=>this.type=val"></Sidebar></v-col>
        
        <v-col sm="11 pa-0">
          <Map v-if="type === 'object'"></Map>
          <DualMap v-else></DualMap>
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

export default {
  name: 'App',

  components: {
    DualMap,Map,Sidebar,Header,Footer
  },

  data: () => ({
    type: 'object'
  }),

  methods:{

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