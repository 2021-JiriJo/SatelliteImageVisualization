<template>
    <v-container 
        class="blue-grey lighten-5" 
        fill-height
        @mouseover="enableText"
        @mouseleave="disableText"
    > 
        <v-row class="fill-height" align="start" >
            <v-col sm="12">
                <v-row>
                    <v-col sm="12" align="center">
                        <v-btn icon @click="changeType('object')" >
                            <v-icon>mdi-feature-search-outline</v-icon>
                            <p v-if="visibility" class="ma-0">객체 탐지</p>
                        </v-btn>
                    </v-col>
                    <v-col sm="12" align="center">
                        <v-btn icon @click="changeType('diff')">
                            <v-icon>mdi-compare</v-icon>
                            <p v-if="visibility" class="ma-0">변화 탐지</p>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            
            <v-col sm="12">
                <v-row class="fill-height d-flex align-end">
                    <v-col sm="12" align="center" class="mt-auto">
                        <v-btn icon>
                            <v-icon>mdi-file-chart</v-icon>
                            <p v-if="visibility" class="ma-0">보고서 작성</p>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>        
    </v-container>
</template>

<script>

export default ({
    data(){
        return {
            displayText: false,
            WINDOW_WIDTH: window.innerWidth
        };
    },
    computed:{
        visibility(){
            return this.displayText && (1200 <= window.innerWidth);
        }
    },
    methods:{
        changeType(param){
            this.$emit('changeType',param);
        },
        enableText(){
            this.displayText = true;
        },
        disableText(){
            this.displayText = false;
        }
    }
})
</script>


<style scoped>


.container{
    background-color: lightgray;
}
</style>