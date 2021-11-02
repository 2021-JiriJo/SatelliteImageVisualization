<template>
    <v-tooltip right>
        <template v-slot:activator="{on}">
                <v-btn icon v-on="on"
                        link
                        @click="onClick()">
                    <v-icon >
                    {{icon}}
                    </v-icon>
                </v-btn>
        </template>
        <span>{{caption}}</span>
    </v-tooltip>
            

</template>

<script>

export default ({
    props:{
        icon: String, 
        caption: String, 
        onClick: Function
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