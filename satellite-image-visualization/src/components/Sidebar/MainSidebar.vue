<template>
    <v-navigation-drawer fill-height>
        <v-divider></v-divider>
        <v-list dense nav>
            <v-tooltip right>
                <template v-slot:activator="{on, attrs}">
                    <v-list-item
                        v-for="item in nav_items"
                        :key="item.title"
                        link
                        @click="clickMenu(item.menu)"
                        v-bind="attrs"
                        v-on="on"
                        >
                        <v-list-item-icon>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <span>tooltip</span>
            </v-tooltip>
        </v-list>
    <!--
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
        -->
    </v-navigation-drawer>
</template>

<script>

export default ({
    data(){
        return {
            nav_items:[
                {icon: 'mdi-feature-search-outline', menu:'object' },
                {icon: 'mdi-compare', menu:'compare'},
                {icon: 'mdi-file-chart', menu:'home'}
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