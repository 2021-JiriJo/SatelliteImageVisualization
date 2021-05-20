<template>
    <v-navigation-drawer fill-height> 
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    객체 탐지
                </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="text-center" @click="clickMenu('home')">
                <v-btn icon class="text-center" >
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
            </v-list-item-icon>
                
            
            
        </v-list-item>
        <v-divider></v-divider>
        <v-list flat dense>
            <v-list-item-group 
                v-model="selected_item"
                color="blue"
            >
                <v-list-item 
                    v-for="item in items"
                    :key="item"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                        
                </v-list-item>
            </v-list-item-group>
            
        </v-list>
        <v-btn class="ma-1" @click="clickMenu('home')" to="/map">선택</v-btn>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios';

export default ({
    created(){
        axios.get('http://192.168.0.2:3000/objects')
            .then(res=>this.items=res.data);
    },
    data(){
        return {
            selected_item: null,
            items: null
        };
    },
    methods:{
        clickMenu(to){
            console.log(to);
            this.$emit('clickMenu', to);
        }
    }
})
</script>


<style scoped>


.container{
    background-color: lightgray;
}
a, router-link{
    text-decoration: none;
    color: black;
}

.ma-auto{
    justify-self: flex-end;
}
</style>