<template>
    <v-container fluid grey darken-3 v-bind:style="{width: sidebarWidth}" class="d-inline pa-2 align-center">
        <v-row v-for="(item) in items" :key="item.title" class="d-flex ma-1 justify-center">
            <NavButton 
                :menu="item.menu"
                :route="item.route"
                :caption="item.caption"
                :icon="item.icon"
                @clickMenu="clickMenu">
            </NavButton>
        </v-row>
    </v-container>
</template>

<script>
import NavButton from "./NavButton.vue";

export default ({
    components:{
        NavButton
    },
    props:{
        sidebarWidth: String,
        items: Array
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