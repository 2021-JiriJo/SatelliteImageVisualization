<template>
    <div id="map"></div>
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

// import ImageLayer from 'ol/layer/Image';
import TileWMS from 'ol/source/TileWMS';
// import { transform } from 'ol/proj';



export default {
  name: 'Map',
  watch: {
    '$route' (to) {
      this.info.type = to.query.type;
      this.info.date = to.query.date;
      this.load_data();
    }
  },
  data(){
    return {
      map_key : '8xehacjegYD1ARG8VucP',
      view: null,
      map: null,
      imageOutlineLayer: null,
      imageLayer: null,
      objectInfoLayer: null,
      minZoomFeatureInfo: 10,
      info: {
          type:null,
          date:null
      },
      position: fromLonLat([127,37]),
      zoom: 5
    };
  },
  mounted() {
    setTimeout(()=>{this.init();},100);
    
  },
  methods:{
    resetLayer(){
      if(this.objectInfoLayer != null){
          this.map.removeLayer(this.objectInfoLayer);
          this.objectInfoLayer = null;
      }
      if(this.imageOutlineLayer != null){
          this.map.removeLayer(this.imageOutlineLayer);
          this.imageOutlineLayer = null;
      }
      if(this.imageLayer != null){
          this.map.removeLayer(this.imageLayer);
          this.imageLayer = null;
      }
    },
    async init(){
      // fromLonLat([127,37])
      // let jiri = new TileWMS({
      //   url: 'http://localhost:8080/geoserver/test/wms',
      //   params: {
      //     'format':'image/png',
      //     'LAYERS':'test:seoul',
      //     'TRANSPARENT':'true'
      //   },
      //   serverType: 'geoserver',
      //   crossOrigin:'anonymous'
      // });

      // let wmsLayer = new TileLayer({
      //   source: jiri,
      //   opacity: 0.5,
      //   visible: true
      // });

      let tileLayer = new TileLayer({
        source: new XYZ({
          url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + this.map_key,
        }),
        visible: true
      });
      TileWMS;
      this.view= new View({
        // projection: 'EPSG:4326',
        center: this.position,//fromLonLat([31.41485,30.02349]),
        zoom:this.zoom
      });
      this.map = new Map({
        layers: [tileLayer],
        view: this.view,
        target: 'map'
      });

      if(this.$route.params.layer != undefined){
        try{
          const layer_name = this.$route.params.layer;
          const layergroup_name = this.$route.params.layergroup;
          const res = await axios.get(`http://localhost:3000/layergroups/${layergroup_name}/layers/${layer_name}`);
          const geojson = await axios.get(res.data);
          this.render_info(geojson.data);
        }
        catch(err){
          console.log(err.stack);
          this.resetLayer();
          this.$emit('raiseError', 'No Data Exists!');
        }
      }
      
      

      // .then(res=>{
      //   this.render_info(res.data);
      //   // let source = new VectorSource({
      //   //   features: new GeoJSON().readFeatures(res.data),
      //   // });

      //   // let infoLayer = new VectorLayer({
      //   //   source: source,
      //   //   visible: true
      //   // });
      //   // this.map.addLayer(infoLayer);
      //   // this.map.getLayers();
      // })
      // .catch(err=>{
      //   console.log(err);
      //   this.resetLayer();
      //   this.$emit('raiseError', 'No Data Exists!');
      // });
      
      console.log(this.$route.query);
      if(Object.keys(this.$route.query).length > 0){
        
        this.info.type = this.$route.query.type;
        this.info.date = this.$route.query.date;
        this.load_data();
      }
      this.map.on('moveend', ()=>{
        this.$emit('changePosition',this.view.getCenter(), this.view.getZoom());
      });
    },
    load_data(){
      axios.get(`object/info/${this.info.date}/${this.info.type}`)
      .then(res=>{
        let extent = res.data.extent;
        const TL = fromLonLat([extent[0],extent[1]]);
        const BR = fromLonLat([extent[2],extent[3]]);
        extent = TL.concat(BR);
        this.render_outline(TL,BR);
        this.render_img(extent);
        this.render_info(res.data.geojson);
      })
      .catch(err=>{
        console.log(err);
        this.resetLayer();
        this.$emit('raiseError', 'No Data Exists!');
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
      try{
        console.log('ee')
        const imageStatic = new Static({
            url: axios.defaults.baseURL+`object/map/${this.info.date}/${this.info.type}`,
            imageExtent : extent
          });

        this.imageLayer = new ImageLayer({
          source: imageStatic,
          minZoom: this.minZoomFeatureInfo
        });
        this.map.addLayer(this.imageLayer);
        this.view.setCenter(getCenter(extent));
        console.log(getCenter(extent));
        this.view.setZoom(this.minZoomFeatureInfo);
      }
      catch(err){
        console.log(err);
        if(Object.keys(this.$route.query).length > 0)
          this.$emit('raiseError', 'No Data Exists!');
      }
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
  height:100vh
}
</style>