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
  },
  watch: {
    '$route' (from) {
      this.info.type = from.query.type;
      this.info.date = from.query.date;
      this.load_data();
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
      info: {
          type:null,
          date:null
      }
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
      
      if(this.$route.query != null){
        
        this.info.type = this.$route.query.type;
        this.info.date = this.$route.query.date;
        this.load_data();
      }
      this.map.on('moveend', ()=>{
        this.$emit('changePosition',this.view.getCenter(), this.view.getZoom());
      });
    },
    load_data(){
      axios.get(`http://localhost:3000/object/info/${this.info.date}/${this.info.type}`).then(res=>{
        let extent = res.data.extent;
        const TL = fromLonLat([extent[0],extent[1]]);
        const BR = fromLonLat([extent[2],extent[3]]);
        extent = TL.concat(BR);
        this.render_outline(TL,BR);
        this.render_img(extent);
        this.render_info(res.data.geojson);
      });
    },
    render_info(geojson){
        let source = new VectorSource({
          features: new GeoJSON({featureProjection:"EPSG:3857"}).readFeatures(geojson),
        });
        if(this.objectInfoLayer != null)
          this.map.removeLayer(this.objectInfoLayer);
        this.objectInfoLayer = new VectorLayer({
          source: source,
          visible: true
        });
        this.map.addLayer(this.objectInfoLayer);
    },
    render_img(extent){
      console.log(extent);
      if(this.imageLayer != null)
        this.map.removeLayer(this.imageLayer);
      this.imageLayer = new ImageLayer({
        source: new Static({
          url: `http://localhost:3000/object/map/${this.info.date}/${this.info.type}`,
          imageExtent : extent
        }),
        minZoom: this.minZoomFeatureInfo
      });
      this.map.addLayer(this.imageLayer);
      this.view.setCenter(getCenter(extent));
      this.view.setZoom(this.minZoomFeatureInfo);
    },
    render_outline(TL,BR){
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
          features: [new Feature(new Polygon(getBorder(TL, BR)))]
        }),
        style: blueBoldStyle,
        minZoom: this.minZoomFeatureInfo
      });
      this.map.addLayer(this.imageOutlineLayer);
    }
  }
}
</script>

<style scoped>
#map{
  height:80vh
}
</style>