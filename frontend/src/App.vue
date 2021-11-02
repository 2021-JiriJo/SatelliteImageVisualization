<template>
  <v-app>
    <v-container fluid class="d-flex fill-height pa-0">
      <Sidebar class="ma-0 fill-height" :style="{width: sidebarWidth}"/>
      
        <!-- <router-view
            v-if="hasMap()"
            :position="position"
            :zoom="zoom"
            :key="$route.fullPath"
            @changePosition="changePosition"
            @raiseError="raiseError"
            class="fill-height main-view pa-0"
            
        ></router-view>   -->
        <router-view 
          :key="$route.fullPath"
          @raiseError="raiseError"
           class="fill-height main-view pa-0"
          ></router-view>
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

export default {
  name: 'App',

  components: {
    Sidebar,Footer,Alert
  },

  data: () => ({
    longitude: 127,
    latitude: 37,
    zoom: 18,
    sidebarWidth: '70px',
    error: false,
    message: ''
  }),

  mounted(){
    /* restore session */
    this.$store.dispatch('check_session');

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

@media screen and (max-width:768px){
  .main-view {
    width: 100vw;
  }
}
@media screen and (min-width:769px){
  .main-view {
    width: calc(100vw - 90px);
  }
}


</style>