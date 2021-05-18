<template fill-height transition="fade-transition">
    <MainSidebar v-if="menu=='home'" @clickMenu="clickMenu"/>
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
    data(){
        return {
            menu:'home'
        };
    },
    methods:{
        clickMenu(menu){
            console.log(menu);
            this.menu=menu;
        }
    }
})
</script>
