<template>
    <v-container>
<h2>Add New Layer</h2>
        <form @submit.prevent="onSubmit">
            <v-file-input 
                truncate-length="15" 
                prepend-icon="mdi-camera" 
                placeholder="Upload Image File *required"
                required
                v-model="pngFile">
            </v-file-input>
            <v-file-input 
                truncate-length="15" 
                placeholder="Upload JSON Data *required"
                accept="application/json"
                required
                v-model="jsonFile">
            </v-file-input>
            <v-container class="text-right">
                <v-btn type="submit">Upload</v-btn>
            </v-container>
        </form>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LayerAdd',
    data(){
        return {
            jsonFile: null,
            pngFile: null
        }
    },
    methods:{
        onSubmit(){      
            axios({
                method: 'post',
                url:'layer',
                'Content-Type': 'multipart/form-data',
                data:{
                    jsonFile:this.jsonFile,
                    pngFile:this.pngFile
                }
            })
            .then((response)=>{
                this.$emit('raiseError',response.data);
            })
            .catch((error)=>{
                if (error.response) {
                this.$emit('raiseError',error.response.data);
                }
            });
        }
    }
}
</script>