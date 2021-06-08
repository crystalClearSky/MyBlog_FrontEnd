<template>
  <div class="alert_box_wrapper">
    <div class="alert_box_container">
      <div class="alert_box" :class="{fade_in: runEvent(), fade_out: !runEvent()}">Please remove AdBlocker</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AlertBox extends Vue {
    @Prop({default: false}) showAlert!: boolean;
    showResult = false;

    runEvent(): boolean {
    setTimeout(() => {

        this.$nextTick().then(() => { this.showAlert ? this.showResult = true : this.showResult = false });
    }, 1080);
        return this.showResult;
    }
}
</script>

<style scoped lang="scss">
.alert_box_container {
  position: absolute;
}
.fade_in {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.fade_out {
  transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

</style>