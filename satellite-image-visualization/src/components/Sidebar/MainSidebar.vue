<template>
    <v-container fluid fill-height grey darken-3 v-bind:style="{width: sidebarWidth}" class="d-inline pa-2 align-center">
        <v-row v-for="(item) in items" :key="item.title" class="d-flex ma-1 justify-center">
            <v-tooltip right>
                <template v-slot:activator="{on}">
                    <v-btn icon v-on="on"
                            link
                            @click="clickMenu(item.menu,item.route)">
                        <v-icon >
                        {{item.icon}}
                        </v-icon>
                    </v-btn>
                        
            </template>
            <span>{{item.menu}}</span>
            </v-tooltip>
        </v-row>
    </v-container>
</template>

<script>

export default ({
    props:{
        sidebarWidth: String
    },
    data(){
        return {
            items:[
                {icon: 'mdi-feature-search-outline', menu:'object' },
                {icon: 'mdi-compare', menu:'compare'},
                {icon: 'mdi-file-chart', menu:'home', route:{path:'stat'}}
            ]
        };
    },
    methods:{
        clickMenu(menu, route){
            this.$emit('clickMenu', menu, route);
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
*{
    padding:0;
    margin:0;
}
</style>