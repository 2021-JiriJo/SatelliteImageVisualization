<template>
    <v-card>
    <v-card-text>
        <div class="text-h6 pa-12 text-center">{{ message }}</div>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'Alert',
    props:{
        message: String
    }
}
</script>