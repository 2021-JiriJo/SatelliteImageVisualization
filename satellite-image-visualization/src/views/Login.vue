<template>
    <v-container class="pa-3">
        <h2>Log In</h2>
        <form @submit.prevent="onSubmit">
            <v-text-field placeholder="Enter your ID" v-model="uid"/>
            <v-text-field 
                placeholder="Enter your password" 
                :type="showpw ? 'text' : 'password'"
                v-model="password" 
                :append-icon="showpw ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showpw = !showpw"/>
            <v-btn type="submit" class="mr-3">Login</v-btn>
            <router-link to="register">
                <v-btn>
                    Register
                </v-btn>
            </router-link>
        </form>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data(){
        return {
            uid:'',
            password:'',
            showpw: false
        }
    },
    methods:{
        onSubmit(){
            axios({
                method: 'post',
                url:'login',
                data:{
                    id:this.uid,
                    password:this.password
                }
            })
            .then((response)=>{
                this.$emit('raiseError',response.data);
            })
            .catch((error)=>{
                if (error.response) {
                this.$emit('raiseError',error.response.data);
                }
            });
            
        }
    }
}

</script>

<style scoped>
a{
    text-decoration: none;
}
</style>