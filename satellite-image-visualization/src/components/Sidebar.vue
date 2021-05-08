<template>
    <v-container class="blue-grey lighten-5" fill-height> 
        <v-row class="fill-height" align="start" >
            <v-col sm="12">
                <v-row>
                    <v-col sm="12" align="center">
                        <v-btn icon @click="changeType('object')">
                            <v-icon>mdi-feature-search-outline</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col sm="12" align="center">
                        <v-btn icon @click="changeType('diff')">
                            <v-icon>mdi-compare</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            
            <v-col sm="12">
                <v-row class="fill-height d-flex align-end">
                    <v-col sm="12" align="center" class="mt-auto">
                        <v-btn icon>
                            <v-icon>mdi-file-chart</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>        
    </v-container>
</template>

<script>

export default ({
    methods:{
        changeType(param){
            this.$emit('changeType',param);
        }
    }
})
</script>


<style scoped>


.container{
    background-color: lightgray;
}
</style>