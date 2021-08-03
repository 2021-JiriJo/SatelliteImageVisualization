<template>
    <v-tooltip right>
        <template v-slot:activator="{on}">
                <v-btn icon v-on="on"
                        link
                        @click="clickMenu(menu, route)">
                    <v-icon >
                    {{icon}}
                    </v-icon>
                </v-btn>
        </template>
        <span>{{caption}}</span>
    </v-tooltip>
            

</template>

<script>

export default ({
    props:{
        menu: String, route: String, icon: String, caption: String
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