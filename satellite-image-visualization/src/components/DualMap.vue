<template>
  <v-container>
    <v-row>
      <v-col sm="6"><div class="map" id="map1"></div></v-col>
      <v-col sm="6"><div class="map" id="map2"></div></v-col>
    </v-row>
  </v-container>

</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map' ;
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


export default {
  name: 'Main',
  data(){
    return {
      view: null,
      map1: null,
      map2: null
    };
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
      let tileLayer1 = new TileLayer({
        source: new OSM(),
        visible: true
      });

      let tileLayer2 = new TileLayer({
        source: new OSM(),
        visible: true
      });

      this.view = new View({
        center: [0,0],
        zoom: 5
      });

      this.map1 = new Map({
        layers: [tileLayer1],
        view: this.view,
        target: 'map1'
      });

      this.map2 = new Map({
        layers: [tileLayer2],
        view: this.view,
        target: 'map2'
      });
    }
  }
}
</script>

<style scoped>
.map{
  height:500px
}
</style>