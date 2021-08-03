<template>
    <v-container fluid grey darken-3 class="d-flex flex-column pa-0">
        <PrototypeSidebar :sidebarWidth="sidebarWidth" :items="mainItems"  @clickMenu="clickMenu" ></PrototypeSidebar>
        <v-spacer></v-spacer>
        <PrototypeSidebar :sidebarWidth="sidebarWidth" :items="bottomItems" @clickMenu="clickMenu"></PrototypeSidebar>
    </v-container>
</template>

<script>
import PrototypeSidebar from "./PrototypeSidebar.vue";

export default ({
    components:{
        PrototypeSidebar
    },
    props:{
        sidebarWidth: String
    },
    data(){
        return {
            mainItems:[
                {icon: 'mdi-home', caption:'홈', route:{path:'map'} },
                {icon: 'mdi-feature-search-outline', caption:'객체 탐지', menu:'object' },
                {icon: 'mdi-compare', caption:'변화 탐지', menu:'compare'},
                {icon: 'mdi-file-chart', caption:'보고서', route:{path:'stat'}}
            ],
            bottomItems:[
                {icon: 'mdi-cloud-upload', caption:'업로드' },
                {icon: 'mdi-login-variant', caption:'로그인', route:{path:'login'}},
                {icon: 'mdi-account', caption:'회원 정보'}
            ],
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