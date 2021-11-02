<template>
    <v-container fluid grey darken-3 class="d-flex flex-column pa-2">
        
        <NavButton 
                :onClick="homeItem.onClick"
                :caption="homeItem.caption"
                :icon="homeItem.icon">
        </NavButton>
        
        <NavButton 
                :onClick="objectItem.onClick"
                :caption="objectItem.caption"
                :icon="objectItem.icon">
        </NavButton>

        <v-spacer></v-spacer>


        <NavButton 
                v-if="is_login"
                :onClick="logoutItem.onClick"
                :caption="logoutItem.caption"
                :icon="logoutItem.icon">
        </NavButton>
        <NavButton 
                v-else
                :onClick="loginItem.onClick"
                :caption="loginItem.caption"
                :icon="loginItem.icon">
        </NavButton>
        <NavButton 
                v-if="is_login"
                :onClick="uploadItem.onClick"
                :caption="uploadItem.caption"
                :icon="uploadItem.icon">
        </NavButton>
        <NavButton 
                v-if="is_login"
                :onClick="profileItem.onClick"
                :caption="profileItem.caption"
                :icon="profileItem.icon">
        </NavButton>
        
        <NavButton 
                :onClick="aboutUsItem.onClick"
                :caption="aboutUsItem.caption"
                :icon="aboutUsItem.icon">
        </NavButton>

       
    </v-container>
</template>

<script>
import NavButton from "./NavButton.vue";

export default ({
    components:{
        NavButton,
    },
    props:{
        sidebarWidth: String
    },
    computed:{
        user_id(){
            return this.$store.state.user_id;
        },
      is_login(){
          return this.user_id != undefined;
      }
      
    },
    data(){
        return {
            homeItem : {icon: 'mdi-home', caption:'홈', onClick: ()=>this.clickToRoutePage('/') },
            aboutUsItem : {icon: 'mdi-help', caption:'개발자 정보', onClick: ()=>this.clickToRoutePage('/aboutus') },

            objectItem : {icon: 'mdi-feature-search-outline', caption:'객체 탐지', onClick: ()=>this.clickLayerGroup() },
            uploadItem: {icon: 'mdi-plus', caption:'업로드', onClick: ()=>this.clickToRoutePage('/add')},
            profileItem: {icon: 'mdi-account', caption:'회원 정보', onClick: ()=>this.clickProfile()},
            loginItem: {icon: 'mdi-login-variant', caption:'로그인', onClick: ()=>this.clickToRoutePage('/login')},
            logoutItem: {icon: 'mdi-logout-variant', caption:'로그아웃', onClick: this.logoutRequest}
        }
    },
    methods:{
        clickToRoutePage(route){
           if(route != null || route != undefined ){
                this.$router.push(route);
            }
        },
        clickLayerGroup(){
            if(this.is_login){
                this.$router.push(`/users/${this.user_id}/layergroups`);
            }
            else{
                this.$router.push('/users/public/layergroups');
            }
        },
        clickProfile(){
            if(this.is_login){
                this.$router.push(`/users/${this.user_id}/profile`);
            }
            else{
                this.$router.push('/');
            }
        },
        logoutRequest(){
            this.$store.dispatch('logout');
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