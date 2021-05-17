<template>
  <div>
    <div id="map"></div>
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
  name: 'Map',
  props:{
    map_key: { type:String, default: '8xehacjegYD1ARG8VucP'},
    position: {type:Array, default:null},
    zoom: {type:Number, default: 0},
    info: {
      type:Object,
      default:()=>{
        return {
          type:'plane',
          date:'20210121'
        }
      }
    }
  },
  watch:{
    info(){
      if(this.info != null){
        this.load_geo();
        this.load_img();
      }
    }
  },
  data(){
    return {
      view: null,
      map: null,
      imageOutlineLayer: null,
      imageLayer: null,
      objectInfoLayer: null,
      minZoomFeatureInfo: 10,

    };
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
      let tileLayer = new TileLayer({
        source: new XYZ({
          url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + this.map_key,
        }),
        visible: true
      });

      this.view= new View({
        center:this.position,
        zoom:this.zoom
      });

      this.map = new Map({
        layers: [tileLayer],
        view: this.view,
        target: 'map'
      });
      
      if(this.info != null){
        
        this.load_geo();
        this.load_img();
      }

      this.map.on('moveend', ()=>{
        this.$emit('changePosition',this.view.getCenter(), this.view.getZoom());
      });
    },

    load_img(){
      const TL = fromLonLat([126.42289638519286, 37.443824358499114]);
      const BR = fromLonLat([126.46053314208984, 37.47451749927094]);
      var extent = TL.concat(BR);

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
        this.map.removeLayer(this.imageOutlineLayer);

      this.imageOutlineLayer = new VectorLayer({
        source: new VectorSource({
          features: [new Feature(new Polygon(getBorder(TL,BR)))]
        }),
        style: blueBoldStyle,
        minZoom: this.minZoomFeatureInfo
      });
      this.map.addLayer(this.imageOutlineLayer);
      
      if(this.imageLayer != null)
        this.map.removeLayer(this.imageLayer);

      this.imageLayer = new ImageLayer({
        source: new Static({
          url: `http://localhost:3000/map/${this.info.date}/${this.info.type}`,
          imageExtent : extent
        }),
        minZoom: this.minZoomFeatureInfo
      });
      this.map.addLayer(this.imageLayer);

      this.view.setCenter(getCenter(extent));
      this.view.setZoom(this.minZoomFeatureInfo);
    },

    load_geo(){
      axios.get(`http://localhost:3000/info/${this.info.date}/${this.info.type}`).then(res=>{
        let source = new VectorSource({
          features: new GeoJSON({featureProjection:"EPSG:3857"}).readFeatures(res.data),
        });

        if(this.objectInfoLayer != null)
          this.map.removeLayer(this.objectInfoLayer);

        this.objectInfoLayer = new VectorLayer({
          source: source,
          visible: true
        });
        this.map.addLayer(this.objectInfoLayer);
      });
    }
  }
}


</script>

<style scoped>
#map{
  height:80vh
}
</style>