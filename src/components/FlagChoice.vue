<template>
  <div
    class="flag_warpper"
    :class="{ show_box: showflagBox, hide_box: !showflagBox }"
  >
    <div class="flag_container">
      <img src="@/assets/SVG/white_flag.svg" alt="" />
      <h2>Report Comment</h2>
      <div class="disputed_comment">
        {{ selectedContent.message }}
      </div>
      <ul v-for="(reason, index) in reasons" :key="index">
        <li @click="chooseOption(index)">
          <span
            class="toggle"
            :class="{ selected_togggle: index == selectedOption }"
          ></span
          ><label for="">{{ reason }}</label>
        </li>
        <li v-if="index == selectedOption && reason == 'Other reason'">
          <input type="text" v-model="reason.reason" />
        </li>
      </ul>
      <div class="buttons">
        <j-button label="Report" class="button" @click.native="report" />
        <j-button label="Cancel" class="button" @click.native="cancelBox" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import JButton from "@/components/JButton.vue";
import ContentService from "@/services/content-services";
import { Flag, IContent } from "@/types/Content";
import IForFlagging from "@/types/ForFlagging";
import { error } from "jquery";
import IWriteComment from "@/types/WriteComment";

export enum Reason {
  Abusive,
  Offensive,
  Illegal,
  Concering,
  Threatening,
  Spam,
  Other,
}
const contentService = new ContentService();

@Component({
  name: "FlagChoice",
  components: { JButton },
})
export default class FlagChoice extends Vue {
  @Prop() selectedContent!: IForFlagging;
  @Prop() showflagBox!: boolean;
  reason!: IForFlagging;
  selectedOption = -1;
  flag!: Flag;
  choosenOption = -1;
  hasPassed!: boolean;
  reasons = [
    "Nudity or Extremely Offensive",
    "Volent or Dangerous",
    "Off-topic",
    "Spam",
    "Other reason",
  ];
  flagMessage!: IWriteComment;

  chooseOption(id: number) {
    this.selectedOption = id;
    this.choosenOption = id;
  }

  report() {
    console.log(this.choosenOption);
    this.selectedContent.reason = this.reasons[this.choosenOption];
    console.log(this.selectedContent);
    setTimeout(async () => {
      await contentService
        .flagComment(this.selectedContent)
        .then((res) => {
          if (res.status == 200) {
            this.flagMessage = {
              message: this.selectedContent.message,
              flaggedCommentMessages: this.selectedContent.reason,
            };
            this.addFlagMessageToComment(this.selectedContent);
            setTimeout(() => {
              console.log("Comment has been flagged!!");
              this.cancelBox();
            }, 105);
          }
        })
        .catch((err) => {
          console.log("Unable to flag this post");
          console.log(err);
        });
    }, 100);
  }

  cancelBox() {
    this.showflagBox = false;
    this.$emit("cancelFlag");
  }

  addFlagMessageToComment(flagged: IForFlagging) {
    setTimeout(async () => {
      await contentService
        .updateMessage(this.flagMessage, flagged.contentId, flagged.commentId)
        .then((res) => {
          if (res == 200) {
            console.log("Comment flag has been added!!");
            this.hasPassed = true;
          } else {
            console.log("No Flag has been maked for comment");
          }
        })
        .catch((err) => console.log(err));
    }, 100);
  }
}
</script>

<style scoped lang="scss">
.flag_container {
  background-color: rgb(153, 1, 1);
  min-height: 200px;
  min-width: 200px;
  border-radius: 15px;
  display: inline-block;
  justify-content: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  .disputed_comment {
    width: 250px;
    min-height: 20px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 10px;
    padding: 8px;
    display: inline-block;
    word-wrap: break-word;
  }

  img {
    width: 70px;
  }

  h2 {
    padding: 0 20px;
    margin: 5px 0;
    color: white;
  }

  ul {
    list-style-type: none;

    li {
      padding: 5px 15px;

      label {
        color: white;
        float: left;
      }

      input[type="text"] {
        margin-right: 10%;
        border: none;
        width: 80%;
        height: 25px;
        border-radius: 10px;
        padding: 0 9px;
        background-color: rgb(209, 209, 209);
        transition: 0.2s all ease-out;
      }
      input:focus {
        outline: none;
        background-color: rgb(238, 238, 238);
      }
    }
  }

  .toggle {
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 15px;
    height: 15px;
    left: 5%;
    border-radius: 50%;
    cursor: pointer;
  }
  .selected_togggle {
    background-color: green;
    width: 10px;
    height: 10px;
    border: 3px solid white;
  }

  .buttons {
    display: flex;
    justify-content: center;
    .button {
      padding: 10px 0;
    }
  }
}
.show_box {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
.hide_box {
  transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
</style>