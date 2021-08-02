<template>
    <v-nav-bar class="d-flex align-end flex-column ma-1">
        <router-link 
            class="pa-2"
            to="newlayer"
        >
            <v-btn class="white--text">Upload</v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link 
            class="pa-2"
            to="login"
        >
            <v-btn class="white--text">Login</v-btn>
        </router-link>  
    </v-nav-bar>
</template>

<script>
</script>

<style scoped>
a{
    text-decoration: none;
}
</style>