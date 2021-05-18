<template>
    <v-navigation-drawer fill-height>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    Satellite Information
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
            <v-list-item
                v-for="item in nav_items"
                :key="item.title"
                link
                @click="clickMenu(item.menu)"
                >
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

export default ({
    data(){
        return {
            nav_items:[
                {title: '객체 탐지', icon: 'mdi-feature-search-outline', menu:'object' },
                {title: '변화 탐지', icon: 'mdi-compare', menu:'compare'},
                {title: '보고서 작성', icon: 'mdi-file-chart', menu:'home'}
            ]
        };
    },
    methods:{
        clickMenu(menu){
            this.$emit('clickMenu', menu);
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
</style>