<template>
  <div>
      <v-container fluid>
        <v-row>
          <v-col sm="6" class="pa-0"><div class="map" id="map1"></div></v-col>
          <v-col sm="6" class="pa-0"><div class="map" id="map2"></div></v-col>
        </v-row>
      </v-container>
  </div>

</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map' ;
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
// import OSM from 'ol/source/OSM';
import axios from 'axios';

export default {
  name: 'DualMap',
  props:{
    map_key: { type:String, default: '8xehacjegYD1ARG8VucP'},
    position: { type: Array, default: null },
    zoom: {type:Number, default: 0}
  },
  data(){
    return {
      view: null,
      map1: null,
      map2: null,

      date_from: null,
      date_to: null,
      from_png: null,
      to_png: null,
      json: null
    };
  },
  mounted() {
    this.init();
  },
  watch:{
    '$route'(from){
      if(from.path == '/dualmap'){
        this.date_from = this.$route.query.date_from;
        this.date_to = this.$route.query.date_to;

        axios.get(`http://localhost:3000/compare/map/${this.date_from}/${this.date_to}/from`)
        .then(res=>{
          this.from_png = res.data;
          //TileLayer 생성, map에 addlayer로 오버레이
        });

        axios.get(`http://localhost:3000/compare/map/${this.date_from}/${this.date_to}/to`)
        .then(res=>{
          this.to_png = res.data;
          //TileLayer 생성, map에 addlayer로 오버레이

        });

        axios.get(`http://localhost:3000/compare/info/${this.date_from}/${this.date_to}`)
        .then(res=>{
          this.json = res.data;
          //json 데이터 TileLayer 생성, map에 오버레이
          //extent1, extent2, geojson
        });
        
      }
    }
  },
  methods:{
    init(){
      let tileLayer1 = new TileLayer({
        source: new XYZ({
          url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + this.map_key,
        }),
        visible: true
      });

      let tileLayer2 = new TileLayer({
        source: new XYZ({
          url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + this.map_key,
        }),
        visible: true
      });

      this.view = new View({
        center: this.position,
        zoom: this.zoom
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


      this.map1.on('moveend', ()=>{
        this.$emit('changePosition',this.view.getCenter(), this.view.getZoom());
      });

      this.map2.on('moveend', ()=>{
        this.$emit('changePosition',this.view.getCenter(), this.view.getZoom());
      });
    },


  }
}
</script>

<style scoped>
.map{
  height:80vh;
}
</style>