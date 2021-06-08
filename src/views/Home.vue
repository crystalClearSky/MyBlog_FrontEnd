<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <avatar-component/>
    <div>{{redirectTo()}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AvatarComponent from '@/components/AvatarComponent.vue';

@Component
export default class Home extends Vue {
  @Prop() private msg!: string;

  created() {
    console.log(this.msg);
  }
  redirectTo() {
    this.$router.push('content');
  }
}
</script>

<style lang="scss" scoped>

</style>
