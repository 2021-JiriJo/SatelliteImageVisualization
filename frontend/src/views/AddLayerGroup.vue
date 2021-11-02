<template>
    <div class="pa-3">
        <h2>Add New Layer Group</h2>
        <form @submit.prevent="onSubmit">
            <v-text-field
                v-model="layerGroupName"
                label="Layer Group Name"
                hide-details="auto"
            ></v-text-field>
            <v-textarea
                v-model="layerGroupDescription"
                label="Layer Group Description"
            ></v-textarea>
            
            <div>
                <p>Visibility</p>
                <v-chip-group 
                    v-model="visibility" 
                    column 
                    active-class="white black--text font-weight-bold"
                    >
                <v-chip
                    v-for="item in visibilities"
                    :key="item"
                    :value="item"
                    >{{ item }}</v-chip>
                </v-chip-group>
            </div>
            
            <div class="text-right">
                <v-btn type="submit">Upload</v-btn>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AddNewLayerGroup',
    data(){
        return {
            layerGroupName: null,
            layerGroupDescription: null,
            visibility: null,
            visibilities:['Private','Public']
        }
    },
    methods:{
        onSubmit(){      
            axios.post(`layergroups/${this.layerGroupName}`, 
            {
                layerGroupName: this.layerGroupName,
                layerGroupDescription: this.layerGroupDescription,
                visibility: this.visibility
            })
            .then((response)=>{
                if(response.status != 200)
                    this.$emit('raiseError',response.data);
                else{
                    this.$router.push('/addlayer');
                }
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