<template>
    <v-navigation-drawer
      v-model="inDrawer"
      absolute
      temporary> 
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        변화 탐지
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="text-center" @click="clickHome">
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
            <v-btn class="ma-1" @click="clickSelect()">선택</v-btn>
        </v-navigation-drawer>
</template>

<script>
import axios from 'axios';

export default ({
    created(){
        axios.get(`compare/date`)
            .then(res=>this.items=res.data);
    },
    props:{
        drawer: Boolean
    },
    data(){
        return {
            selected_from: null,
            selected_to: null,
            items:[],
            inDrawer: false
        };
    },
    watch:{
        drawer: function(){
            this.inDrawer = this.drawer;
        },
        inDrawer: function(){
            if(!this.inDrawer)
                this.$emit('clickMenu','home');
        }
    },
    methods:{
        clickHome(){
            this.inDrawer = false;
        },
        clickSelect(){
            if(this.selected_from == null || this.selected_to == null){
                alert('날짜를 모두 선택하세요');
                return;
            }
            else if(this.selected_from == this.selected_to){
                alert('다른 날짜를 선택하세요');
                return;
            }
            this.selected_from = this.selected_from.replaceAll('-','');
            this.selected_to = this.selected_to.replaceAll('-','');
            this.$emit('clickMenu', 'home', {path:'dualmap', query:{date_from: this.selected_from, date_to : this.selected_to }});
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