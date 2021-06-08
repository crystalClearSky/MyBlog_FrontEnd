<template>
  <transition name="fade">
    <div class="message">
      {{ label }}
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ErrorMessage extends Vue {
  @Prop({ default: "Enter a message" }) label!: string;
}
</script>

<style scoped lang="scss">
.message {
  background-color: rgb(182, 48, 48);
  min-width: 30px;
  height: 25px;
  border: 2px solid rgb(255, 84, 84);
  border-radius: 4px;
  color: white;
  padding: 5px 15px 0px 15px;
  display: inline-block;
  margin: 0 auto 3px;
}

.fade-enter-active {
  transition: opacity 0.4s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
</style>