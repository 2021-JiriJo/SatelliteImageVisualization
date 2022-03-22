<template>
    <div>
        <v-container>
        <v-row>
            <v-col><h1>Layer List</h1></v-col>
        </v-row>
        
        <v-row>
            <v-col>
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
        <div class="text-center">
            <v-btn class="ma-1 px-10" @click="clickSelect">선택</v-btn>
        </div>
        
            </v-col>
        </v-row>

        
    </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default ({
    mounted(){
        axios({
            url:`/users/${this.$route.params.user_id}/layergroups/${this.$route.params.layergroup}/layers`,
            headers:{withCredentials:true},
            method: 'get'
        }).then(res=>this.items=res.data);
    },
    data(){
        return {
            selected_item: null,
            selected_object: null,
            items: null
        };
    },
    methods:{
        clickSelect(){
            this.$router.push({
                name:'layer', 
                params:{
                    layer:this.selected_item
                }
            });
        }
    }
})
</script>


<style scoped>
a, router-link{
    text-decoration: none;
    color: black;
}

.ma-auto{
    justify-self: flex-end;
}
</style>