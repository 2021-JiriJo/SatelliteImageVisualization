<template>
    <div class="pa-3">
        <h2>Add New Layer</h2>
        <form @submit.prevent="onSubmit">
            <v-select
                :items="layergroupItems"
                v-model="layergroupName"
                label="Select Layer Group"
            ></v-select>
            <v-text-field
                v-model="layerName"
                label="Layer Name"
                hide-details="auto"
            ></v-text-field>
            <v-textarea
                v-model="layerDescription"
                label="Layer Description"
            ></v-textarea>
            <v-text-field
                v-model="featureType"
                label="Feature Type"
                hide-details="auto"
            ></v-text-field>
            <div class="white--text mt-5">
                <p>Layer Date</p>
                <input class="white--text" id="datepicker" type="date" v-model="date"/>
            </div>
            
            
            <v-file-input 
                truncate-length="15" 
                prepend-icon="mdi-camera" 
                placeholder="Upload Image File"
                required
                v-model="pngFile"
                @change="previewFile">
            </v-file-input>
            <v-file-input 
                truncate-length="15" 
                placeholder="Upload Image Extent"
                accept="application/json"
                required
                v-model="extent">
            </v-file-input>
            <v-file-input 
                truncate-length="15" 
                placeholder="Upload GeoJSON Data"
                accept="geojson"
                required
                v-model="jsonFile">
            </v-file-input>
            
            
            <div class="text-right">
                <v-btn type="submit">Upload</v-btn>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AddLayer',
    data(){
        return {
            layergroupItems: [],
            layergroupName: null,
            layerName: null,
            layerDescription: null,
            jsonFile: null,
            pngFile: null,
            extent: null,
            featureType: null,
            date:null,
        }
    },
    mounted(){
        axios({
            url:`/users/${this.$store.getters.user_id}/layergroups`,
            headers:{withCredentials:true},
            method: 'get'
        })
        .then(res=>{
            if(res.status == 204){
                this.$emit('raiseError','No Data');
                this.$router.push('/addlayergroup');
            }
            else if(res.status == 200){
                this.layergroupItems = res.data;
            }
            else{
                this.$emit('raiseError',res.data);
            }
        })
        .catch(e=>console.log(e));
    },
    methods:{
        onSubmit(){      
            const formData = new FormData();
            formData.append('layerName',this.layerName);
            formData.append('layergroupName',this.layergroupName);
            formData.append('featureType',this.featureType);
            formData.append('layerDescription',this.layerDescription);
            
            formData.append('date',this.date);

            formData.append('extent',this.extent);
            formData.append('jsonFile',this.jsonFile);
            formData.append('pngFile',this.pngFile);
            console.log('req');
            axios.post(`/users/${this.$store.getters.user_id}/layers/${this.layerName}`, formData, {
                headers:{'Content-Type': 'multipart/form-data'}
            })
            .then((response)=>{
                this.$emit('raiseError',response.data);
            })
            .catch((error)=>{
                if (error.response) {
                this.$emit('raiseError',error.response.data);
                }
            });
        },
        previewFile(){
            console.log(this.pngFile);
            console.log(this.jsonFile);
        }
    }
}
</script>