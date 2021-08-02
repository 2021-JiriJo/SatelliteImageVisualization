<template>
    <ObjectDetectionSidebar v-if="menu=='object'" @clickMenu="clickMenu" fill-height/>
    <CompareSidebar v-else-if="menu=='compare'" @clickMenu="clickMenu"/>
    <MainSidebar v-else @clickMenu="clickMenu" :sidebarWidth="sidebarWidth" grey darken-3/>
</template>

<script>
import MainSidebar from '../components/Sidebar/MainSidebar';
import ObjectDetectionSidebar from '../components/Sidebar/ObjectDetectionSidebar';
import CompareSidebar from '../components/Sidebar/CompareSidebar';

export default ({
    components:{
        MainSidebar,ObjectDetectionSidebar,CompareSidebar
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