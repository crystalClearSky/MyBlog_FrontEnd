<template>
  <div>

    <div class="jbutton" :class="{ is_disabled: fade }" @click="test">
      <p>{{ label }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "JButton",
  components: {},
})
export default class JButton extends Vue {
  @Prop({ default: "Button" }) label!: string;
  @Prop({ default: false }) fade!: boolean;

  test() {
    this.$emit("pressed",'Done!!');
  }

  checking() {
    console.log('hi there!!');
  }
}
</script>

<style lang="scss" scoped>
.jbutton {
  position: relative;
  background-color: rgb(29, 116, 21);
  max-width: 170px;
  min-width: 30px;
  white-space: nowrap;
  display: Inline-block;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.1s;
  margin: 0 5px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.25);

  p {
    padding: 8px 15px;
    margin: 0 0;
    color: white;
  }
}

.jbutton:hover {
  background-color: rgb(49, 187, 37);
}

.jbutton:active {
  background-color: rgb(30, 107, 23);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

.is_disabled {
  background-color: rgb(77, 77, 77);
  cursor: auto;
}

.is_disabled:hover {
  background-color: rgb(77, 77, 77);
}

.is_disabled:active {
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.25);
}
</style>