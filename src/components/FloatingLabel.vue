<template>
    <div class="label_wrapper">
        <div class="label_container">{{ label }}</div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class FloatingLabel extends Vue {
        @Prop({default: "Label"}) label!: string;
       
    }
</script>

<style scoped>
.label_container {
    position: absolute;
    background-color: rgb(255, 255, 255);
    padding: 3px 8px;
    font-size: .8em;
    border-radius: 8px 8px 0px 8px;
    border: 1px solid gray;
    z-index: 5;
}

</style>