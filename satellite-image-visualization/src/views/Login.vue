<template>
    <div class="pa-3">
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
                    Join
                </v-btn>
            </router-link>
        </form>
    </div>
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
                url:'http://104.198.232.60:5000/login',
                data:{
                    id:this.uid,
                    password:this.password
                }
            })
            .then(()=>{

            });
            if(Math.random() > 0.5){
                this.$emit('raiseError','로그인 완료!');
            }
            else{
                this.$emit('raiseError','로그인 실패');
            }

        }
    }
}

</script>

<style scoped>
a{
    text-decoration: none;
}
</style>