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
  props:{
    position: {type:Array, default:null},
    zoom: {type:Number, default: 0}
  },
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
        center: this.position,
        zoom: this.zoom
      });

      this.map = new Map({
        layers: [tileLayer],
        view: this.view,
        target: 'map'
      });

      this.map.on('moveend', ()=>{
        this.$emit('changePosition',this.view.getCenter(), this.view.getZoom());
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