<template>
    <div>
    <p>Hello from LoginBox</p>
    <button @click="refresh" >Test</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {

        refresh() {
            console.log('Refreshing item!');
            this.$emit('loginBox');
        }
        
    }
</script>

<style scoped>

</style>