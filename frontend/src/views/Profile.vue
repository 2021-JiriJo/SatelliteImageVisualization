<template>
  <div class="home">
    

    <div
        v-if="is_login"
    >
        <div>
            Hello {{ this.user_id }}
        </div>
        
        <v-btn
        @click="logout">
            logout
        </v-btn>
    </div>
    <div v-else>
        <span>로그인 해주세요</span>
    </div>
  </div>
</template>


<script>

export default {
    computed:{
        user_id(){
            return this.$store.getters.get_user_id;
        },
        is_login(){
            return this.user_id != '';
        },

    },
    methods:{
        logout(){
            this.$store.dispatch('logout');
        }
    }
}

</script>
