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

import {Image as ImageLayer, Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';

import {XYZ, ImageStatic as Static} from 'ol/source';
import VectorSource from 'ol/source/Vector';

import {fromLonLat} from 'ol/proj';
import {getCenter} from 'ol/extent';

import {Fill, Stroke, Style} from 'ol/style';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';

import GeoJSON from 'ol/format/GeoJSON';

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
      imageOutlineLayer: null,
      objectInfoLayer: null,
      imageLayer: null,
      minZoomFeatureInfo:6,

      date_from: null,
      date_to: null,
    };
  },
  mounted() {
    setTimeout(()=>{this.init();},100);
  },
  watch:{
    '$route'(){
      this.date_from = this.$route.query.date_from;
      this.date_to = this.$route.query.date_to;
      this.load_data();
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

            this.date_from = this.$route.query.date_from;
      this.date_to = this.$route.query.date_to;
      this.load_data();
    },
    load_data(){
      axios.get(`http://localhost:3000/compare/info/${this.date_from}/${this.date_to}`)
      .then(res=>{
        let extent1 = res.data.extent1;
        const TL1 = fromLonLat([extent1[0],extent1[1]]);
        const BR1 = fromLonLat([extent1[2],extent1[3]]);
        extent1 = TL1.concat(BR1);

        let extent2 = res.data.extent2;
        const TL2 = fromLonLat([extent2[0],extent2[1]]);
        const BR2 = fromLonLat([extent2[2],extent2[3]]);
        extent2 = TL2.concat(BR2);

        this.render_outline(TL1,BR1,TL2,BR2);
        
        this.render_img(extent1, extent2);
        this.render_info(res.data.geojson);
      })
      .catch(()=>{
        if(Object.keys(this.$route.query).length > 0)
          this.$emit('raiseError', 'No Data Exists!');
      });
    },

    render_info(geojson){
        let source = new VectorSource({
          features: new GeoJSON({featureProjection:"EPSG:3857"}).readFeatures(geojson),
        });
        if(this.objectInfoLayer != null)
          this.map2.removeLayer(this.objectInfoLayer);
        this.objectInfoLayer = new VectorLayer({
          source: source,
          visible: true
        });
        this.map1.addLayer(this.objectInfoLayer);
        this.map2.addLayer(this.objectInfoLayer);
    },

    render_img(extent1, extent2){
      // from_img
      console.log(extent1);
      if(this.imageLayer != null)
        this.map1.removeLayer(this.imageLayer);
      this.imageLayer = new ImageLayer({
        source: new Static({
          url: `http://localhost:3000/compare/map/${this.date_from}/${this.date_to}/from`,
          imageExtent : extent1
        }),
        minZoom: this.minZoomFeatureInfo
      });
      this.map1.addLayer(this.imageLayer);
      this.view.setCenter(getCenter(extent1));
      this.view.setZoom(this.minZoomFeatureInfo);

      // to_img
      console.log(extent2);
      if(this.imageLayer != null)
        this.map2.removeLayer(this.imageLayer);
      this.imageLayer = new ImageLayer({
        source: new Static({
          url: `http://localhost:3000/compare/map/${this.date_from}/${this.date_to}/to`,
          imageExtent : extent2
        }),
        minZoom: this.minZoomFeatureInfo
      });
      this.map2.addLayer(this.imageLayer);
      this.view.setCenter(getCenter(extent2));
      this.view.setZoom(this.minZoomFeatureInfo);
    },

    render_outline(TL1,BR1,TL2,BR2){
      function getBorder(TL,BR){
        return [[
          TL,
          [BR[0],TL[1]],
          BR,
          [TL[0],BR[1]],
          TL
        ]];
      }
      
      function blueBoldStyle(){
        return new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 5,
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
          }),
        })
      }
      if(this.imageOutlineLayer != null)
        this.map1.removeLayer(this.imageOutlineLayer);
      this.imageOutlineLayer = new VectorLayer({
        source: new VectorSource({
          features: [new Feature(new Polygon(getBorder(TL1, BR1)))]
        }),
        style: blueBoldStyle,
        minZoom: this.minZoomFeatureInfo
      });
      this.map1.addLayer(this.imageOutlineLayer);

      if(this.imageOutlineLayer != null)
        this.map2.removeLayer(this.imageOutlineLayer);
      this.imageOutlineLayer = new VectorLayer({
        source: new VectorSource({
          features: [new Feature(new Polygon(getBorder(TL2, BR2)))]
        }),
        style: blueBoldStyle,
        minZoom: this.minZoomFeatureInfo
      });
      this.map2.addLayer(this.imageOutlineLayer);
    }
  }
}
</script>

<style scoped>
.map{
  height:95vh;
}
</style>