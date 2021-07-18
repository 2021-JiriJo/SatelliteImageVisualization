<template>
    <div class="pa-3">
        <h2>Register</h2>
        <form @submit.prevent="onSubmit">
            <v-text-field placeholder="Enter your ID" v-model="uid"/>
            <v-text-field 
                placeholder="Enter your password" 
                :type="showpw ? 'text' : 'password'"
                v-model="password" 
                :append-icon="showpw ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showpw = !showpw"/>
            <v-btn type="submit">Register</v-btn>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Register',
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
                url:'http://104.198.232.60:3000/register',
                data:{
                    id:this.uid,
                    password:this.password
                }
            })
            .then(()=>{

            });
            if(Math.random() > 0.5){
                this.$emit('raiseError','가입 완료!');
            }
            else{
                this.$emit('raiseError','가입 실패');
            }
        }
    }
}

</script>