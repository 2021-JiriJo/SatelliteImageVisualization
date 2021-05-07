<template>
  <v-container>
    <v-row>
      <v-col sm="12"><Header></Header></v-col>
      <v-col sm="2"><Sidebar></Sidebar></v-col>
      <v-col sm="10"><Map></Map></v-col>
      <v-col sm="12"><Footer></Footer></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Map,Sidebar,Header,Footer
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@font-face {
    font-family: 'twayair';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

body{
  font-family: 'twayair', Arial, Helvetica, sans-serif;
}
</style>

<style scoped>
h1{
  text-align: center;
}


</style>