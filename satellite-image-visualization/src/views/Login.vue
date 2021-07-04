<template>
    <div class="pa-3">
        <h2>Log In</h2>
        <form @submit="onSubmit">
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
export default {
    name: 'Login',
    data(){
        return {
            uid:null,
            password:null,
            showpw: false
        }
    }
}

</script>

<style scoped>
a{
    text-decoration: none;
}
</style>