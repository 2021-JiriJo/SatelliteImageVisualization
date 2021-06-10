<template>
    <MainSidebar v-if="menu=='home'" @clickMenu="clickMenu" :sidebarWidth="sidebarWidth"/>
    <ObjectDetectionSidebar v-else-if="menu=='object'" @clickMenu="clickMenu"/>
    <CompareSidebar v-else-if="menu=='compare'" @clickMenu="clickMenu"/>
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
            this.menu=menu;
            if(route != null || route != undefined ){
                this.$router.push(route);
            }
        }
    }
})
</script>