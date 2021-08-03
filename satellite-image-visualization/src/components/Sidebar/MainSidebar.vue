<template>
    <v-container fluid grey darken-3 class="d-flex flex-column pa-2">
        
        <NavButton 
                menu=home
                route="map"
                caption="홈"
                icon="mdi-home"
                @clickMenu="clickMenu">
        </NavButton>
        <PrototypeSidebar :sidebarWidth="sidebarWidth" :items="mainItems" @clickMenu="clickMenu" ></PrototypeSidebar>
        <v-spacer></v-spacer>
        <PrototypeSidebar :sidebarWidth="sidebarWidth" :items="bottomItems" @clickMenu="clickMenu"></PrototypeSidebar>
        
        <NavButton 
                menu=home
                route="aboutus"
                caption="개발자 정보"
                icon="mdi-help"
                @clickMenu="clickMenu">
        </NavButton>

       
    </v-container>
</template>

<script>
import NavButton from "./NavButton.vue";
import PrototypeSidebar from "./PrototypeSidebar.vue";

export default ({
    components:{
        PrototypeSidebar, NavButton,
    },
    props:{
        sidebarWidth: String
    },
    data(){
        return {
            mainItems:[
                {icon: 'mdi-feature-search-outline', caption:'객체 탐지', menu:'object' },
                {icon: 'mdi-compare', caption:'변화 탐지', menu:'compare'},
                {icon: 'mdi-file-chart', caption:'보고서', route:'stat'}
            ],
            bottomItems:[
                {icon: 'mdi-cloud-upload', caption:'업로드', route:'upload'},
                {icon: 'mdi-login-variant', caption:'로그인', route:'login'},
                {icon: 'mdi-account', caption:'회원 정보'}
            ]
        }
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