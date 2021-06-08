<template>
  <div class="alert_wrapper">
      <div v-if="alert.isActive">{{ runThis()}}</div>
    <div :class="{enter: display, leave: !display}" class="alert_container">
      <div class="title">{{ alert.title }}</div>
      <div class="message">{{ alert.message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IAlertBox from "@/types/AlertBox";

@Component
export default class Alert extends Vue {
  @Prop() alert!: IAlertBox;
  display = false;
  runThis() {
      console.log("In Mouted!")

      this.$nextTick().then(() => { 
      if(this.alert.isActive) {
          this.display = true;
          setTimeout(() => {
          this.display = false;
          this.alert.isActive = false;
          this.$emit("closeAlert")
          }, 5000);
      } else {
          this.display = false;
      }})
  }
}
</script>

<style scoped lang="scss">
.alert_container {
  background-color: rgb(28, 28, 28);
  min-width: 100px;
  max-width: 200px;
  padding: 10px 15px;
  display: inline-block;
  border-radius: 10px;
  color: white;

  .title {
    font-weight: 600;
  }
}

.enter {
    transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
.leave {
    transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
</style>