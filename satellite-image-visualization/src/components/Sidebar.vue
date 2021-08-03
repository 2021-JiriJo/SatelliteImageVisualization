<template>
    <div class="pa-0 fill-height">
        <MainSidebar @clickMenu="clickMenu" :sidebarWidth="sidebarWidth" class="sidebar grey darken-3 fill-height" />
        <CompareSidebar :drawer="menu=='compare'" @clickMenu="clickMenu"/>
        <ObjectDetectionSidebar :drawer="menu=='object'" @clickMenu="clickMenu"/>
    </div>    
</template>

<script>
import MainSidebar from '../components/Sidebar/MainSidebar';
import CompareSidebar from '../components/Sidebar/CompareSidebar.vue'
import ObjectDetectionSidebar from '../components/Sidebar/ObjectDetectionSidebar.vue'

export default ({
    components:{
        MainSidebar,CompareSidebar,ObjectDetectionSidebar
    },
    props:{
        sidebarWidth:String
    },
    data(){
        return {
            menu:'home'
        };
    },
    methods:{
        clickMenu(menu,route){
            console.log(menu);
            this.menu=menu;
            if(route != null || route != undefined ){
                this.$router.push(route);
            }
        }
    }
})
</script>

<style scoped>

</style>