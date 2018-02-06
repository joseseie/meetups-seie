<template>
    <v-alert error dismissible @input="onClose" :value="true">
        {{ text }}
    </v-alert>
</template>

<script>
    export default {
        props: ['text'],
        methods: {
            onClose () {
                this.$emit('dismissed')
            }
        }
    }
</script>
<style scoped>
    .error {
        background-color: #B22222 !important;
    }
</style>