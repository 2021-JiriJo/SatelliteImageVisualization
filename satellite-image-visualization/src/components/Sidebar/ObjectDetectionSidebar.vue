<template>
    <v-navigation-drawer 
     v-model="inDrawer"
      absolute
      temporary
    > 
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    객체 탐지
                </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="text-center" @click="clickHome">
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
                    :value="item"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                        
                </v-list-item>
            </v-list-item-group>
            
        </v-list>
        <v-btn class="ma-1" @click="clickSelect">선택</v-btn>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios';

export default ({
    created(){
        axios.get('object/objects')
            .then(res=>this.items=res.data);
    },
    props:{
        drawer: Boolean
    },
    data(){
        return {
            selected_item: null,
            selected_object: null,
            items: null,
            datatype: 'object',
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
            if(this.selected_item == null){
                alert("select item");
                return;
            }
            else if(this.datatype == 'object'){
                axios.get(`object/${this.selected_item}/date`)
                    .then(res=>{
                        console.log('res');
                        this.datatype = 'date';
                        this.items=res.data;
                        this.selected_object = this.selected_item;
                        this.selected_item = null;
                    });
            }
            else{
                this.selected_item = this.selected_item.replaceAll('-','');
                this.$emit('clickMenu', 'home',{path:'map', query:{type: this.selected_object, date : this.selected_item }});

            }
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