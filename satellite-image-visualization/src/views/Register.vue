<template>
    <div class="pa-3">
        <h2>Register</h2>
        <form @submit="onSubmit">
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
export default {
    name: 'Register',
    data(){
        return {
            uid:null,
            password:null,
            showpw: false
        }
    }
}