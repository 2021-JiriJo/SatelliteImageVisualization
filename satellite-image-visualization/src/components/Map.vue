<template>
  <div>
    <div id="map"></div>
  </div>
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
      map: null
    };
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
      let tileLayer = new TileLayer({
        source: new OSM(),
        visible: true
      });

      this.view = new View({
        center: [0,0],
        zoom: 5
      });

      this.map = new Map({
        layers: [tileLayer],
        view: this.view,
        target: 'map'
      });
    }
  }
}
</script>

<style scoped>
#map{
  height:500px
}
</style>