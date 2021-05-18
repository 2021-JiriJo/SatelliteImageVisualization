<template>
    <v-navigation-drawer fill-height> 
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        변화 탐지
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="text-center" @click="clickMenu('home')">
                    <v-btn icon class="text-center" >
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-list-item-icon>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item>
                    <v-list-item-content>
                        <v-select :items="items" label='from' v-model="selected_from"></v-select>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-select :items="items" label='to' v-model="selected_to"></v-select>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-btn class="ma-1" @click="clickMenu('home')" to="/dualmap">선택</v-btn>
        </v-navigation-drawer>
</template>

<script>
import axios from 'axios';

export default ({
    created(){
        axios.get('http://192.168.0.2:3000/compare/date')
            .then(res=>this.items=res.data);
    },
    data(){
        return {
            selected_from: null,
            selected_to: null,
            items:[]
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
a{
    text-decoration: none;
    color: black;
}

.ma-auto{
    justify-self: flex-end;
}
</style>