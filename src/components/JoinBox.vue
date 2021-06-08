<template>
  <div class="join_box_wrapper">
    <div
      class="join_box_container"
      :class="{ fade_in: isPresent, fade_out: !isPresent }"
    >
      <div class="join_box">
        Welcome user!
        <j-button
          v-show="!guest"
          label="Enable Voting"
          @click.native="enableGuestVoting"
        />
        <j-button
          v-show="guest"
          label="Become an Avatar"
          @click.native="enableNewAvatar"
        />
        <j-button label="Cancel" @click.native="cancelBox" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IUnregisteredGuest from "@/types/UnregisteredGuest";
import { Component, Vue, Prop } from "vue-property-decorator";
import JButton from "@/components/JButton.vue";
import IGuest from "@/types/Guest";
import ICurrentIP from "@/types/CurrentIP";
import IOptions from "@/types/Options";
import IAnon from "@/types/Anon";

@Component({
  name: "JoinBox",
  components: { JButton },
})
export default class JoinBox extends Vue {
  @Prop() unregGuest!: IUnregisteredGuest;
  @Prop() guest!: IGuest;
  @Prop() justIp!: ICurrentIP;
  @Prop() options!: IOptions;
  @Prop() anon!: IAnon;

  isPresent = false;
  isMember = false;
  isOverSeen = false;

  runtThis() {
    if (this.unregGuest || this.guest || this.justIp || this.anon) {
      if (this.options) {
        if (this.options.isMember) {
          this.isMember = true;
        }
        if(this.options.visitCount > 4){
          this.isOverSeen = true;
        }
      }
      if (!this.isMember && !this.isOverSeen && !this.options.isAnonymous && !this.options.isUnregistered) {
        setTimeout(() => {
          this.isPresent = true;
        }, 300);
      }
    }
  }

  cancelBox() {
    console.log("In cancel box.");
    this.isPresent = false;
  }

  enableGuestVoting() {
    console.log("In enable guest voting");
    console.log(this.guest);
    this.$emit("enableVote", true);
  }

  enableNewAvatar() {
    console.log("In enable new Avatar");
    this.$emit("enableAvatar", true);
  }

  mounted() {
    this.runtThis();
  }
}
</script>

<style scoped lang="scss">
.join_box_container {
  position: absolute;
  background-color: brown;
  height: 100px;
  bottom: -110px;
  border-radius: 10px;
  display: block;
  justify-content: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
  padding: 10px;
  z-index: 1;
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

@media only screen and (max-width: 900px) {
  .join_box_container {
    right: 20px;
  }
}
</style>