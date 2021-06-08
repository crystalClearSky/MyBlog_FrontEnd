<template>
  <div class="settings_wrapper">
    <div
      v-if="settingsAvatar"
      class="settings_container"
      :class="{ expand_settings: isOver }"
    >
      <div class="close_open" @click="expandSetting()">
        <div class="profile_container" :class="{ expand_profile: isVisiblle }">
          <img src="@/assets/SVG/face.svg" alt="" /><span
            v-if="settingsAvatar"
            >{{ settingsAvatar.name }}</span
          >
        </div>
        <img
          :class="{ open_menu: isOver, close_menu: !isOver }"
          :src="openClose()"
          alt=""
        />
      </div>
      <div
        class="settings_box"
        :class="{
          show_settings_box: isVisiblle,
          hide_settings_box: !isVisiblle,
        }"
        @click="checkArrow"
      >
        <h2 class="setting_title">Settings</h2>
        <ul class="settings_list">
          <li
            class="settings_list"
            v-for="(item, index) in menuList"
            :key="index"
            @click="getThisItem(index)"
          >
            <!-- <img
              class="expand_arrow"
              :class="{ rotate_arrow: currentArrow == index }"
              v-if="getItemCount(index) > 0"
              @click="expnadMenu(index)"
              src="@/assets/SVG/expand_more.svg"
              alt=""
            /> -->
            {{ item }}:
            {{ getItemCount(index) }}
            <!-- <div class="item_container" v-if="currentArrow == index">
              <div
                class="item_box"
                v-for="(item, ind) in getItem(index)"
                :key="ind"
                @click="getCardsWithThisTag(item)"
              >
                <span v-if="item.cardId"
                  ><img
                    :src="posts[item.cardId - 1].images[0].thumbnailUrl"
                    alt=""
                /></span>
                <span v-if="item.cardEntityId"
                  ><img
                    :src="posts[item.cardEntityId - 1].images[0].thumbnailUrl"
                    alt="" /></span
                >{{ getItemList(item, ind) }}
              </div>
            </div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IAvatar from "@/types/Avatar";
import { Component, Vue, Prop } from "vue-property-decorator";
import ISettings from "@/types/SettingsItems";
import { IContent } from "@/types/Content";

@Component
export default class SettingsBar extends Vue {
  isOver = false;
  isVisiblle = false;
  @Prop() settingsAvatar!: IAvatar;
  @Prop() comments!: Comment;
  @Prop() users!: IAvatar;
  @Prop() posts: IContent[] = [];
  menuList = ["UpVotes", "Liked Comments", "Viewed Posts", "Tags", "Comments"];

  settings!: ISettings;
  currentArrow = this.hideSettingsItems ? this.hideSettingsItems : -1;

  getItemCount(id: number): number {
    switch (id) {
      case 0:
        return this.settingsAvatar.upVotes
          ? this.settingsAvatar.upVotes.length
          : 0;
      case 1:
        return this.settingsAvatar.likes ? this.settingsAvatar.likes.length : 0;
      case 2:
        return this.settingsAvatar.viewedContent
          ? this.settingsAvatar.viewedContent.length
          : 0;
      case 3:
        return this.settingsAvatar.tagEntities
          ? this.settingsAvatar.tagEntities.length
          : 0;
      case 4:
        return this.settingsAvatar.comments
          ? this.settingsAvatar.comments.length
          : 0;

      default:
        return 0;
    }
  }
  getItem(id: number): any {
    switch (id) {
      case 0:
        return this.settingsAvatar.upVotes;
      case 1:
        return this.settingsAvatar.likes;
      case 2:
        return this.settingsAvatar.viewedContent;
      case 3:
        return this.settingsAvatar.tagEntities;
      case 4:
        return this.settingsAvatar.comments;

      default:
        return 0;
    }
  }
  newTag = "";
  getItemList(item: any, id: number): any {
    console.log(item.id + " " + id);
    if (item.commentId) return this.comments[item.commentId - 1].message;

    if (item.tagItem) {
      // if (this.newTag != item.tagItem) {
      //   this.newTag = item.tagItem;
      //   this.tagsCount = 0;
      return " #" + item.tagItem;
      // }
    }

    if (item.numberOfTimesSeen) return this.posts[item.cardEntityId - 1].title;

    if (item.message) return item.message;

    if (item.voteById) return this.posts[item.cardId - 1].title;
  }

  getThisItem(index: number) {
    let result;
    switch (index) {
      case 0:
        result = "upVotes";
        break;
      case 1:
        result = "likes";
        break;
      case 2:
        result = "views";
        break;
      case 3:
        result = "tags";
        break;
      case 4:
        result = "comments";
        break;
      default:
        break;
    }
    console.log("Get typeSearch - " + result);
    this.$emit("typeSearch", result);
  }

  // getCardsWithThisTag(tag: any) {
  //   this.$emit("getThisByTag", tag.tagItem);
  //   this.isVisiblle = false;
  //   this.isOver = false;
  // }

  checkArrow() {
    if (this.currentArrow > 0) {
      console.log("in in");
      //this.currentArrow = -1;
    }
  }

  expnadMenu(id: number) {
    console.log(id);
    if (this.currentArrow == id) {
      this.currentArrow = -1;
    } else {
      this.currentArrow = id;
    }
  }

  expandSetting() {
    console.log(this.settingsAvatar);
    this.isOver = !this.isOver;
    if (this.isOver) {
      setTimeout(async () => {
        this.isVisiblle = true;
      }, 50);
    } else {
      this.isVisiblle = false;
      this.currentArrow = -1;
    }
    console.log(this.isVisiblle);
  }

  openClose(): string {
    let result = "menu.svg";
    if (this.isOver) {
      result = "close.svg";
    }
    return require("../assets/SVG/" + result);
  }
  methody() {
    this.$nextTick().then(() => {
      console.log("This is next");
      this.currentArrow = -1;
    });
  }
  mounted() {
    window.addEventListener("click", (e) => {
      //if(!e.target.className.includes("expand") && !e.target.className.includes("expand"))
      if (!e.target.className.includes("expand")) {
        this.methody();
      }
    });
  }
}
</script>

<style scoped lang="scss">
.profile_container {
  position: relative;
  margin: 3px;
  background-color: green;
  padding: 4px;
  border-radius: 25px;
  visibility: hidden;
  opacity: 0;
  display: none;
  transition: all 0.3s ease-in;
  top: 2px;
  left: -10px;
  z-index: 2;

  img {
    background-color: #fff;
    padding: 2px;
    border-radius: 50%;
  }
  span {
    padding: 2px 7px;
    color: white;
  }
}

.expand_profile {
  position: absolute;
  opacity: 1;
  visibility: visible;
  display: flex;
}

.settings_container {
  position: absolute;
  background-color: rgb(230, 230, 230);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
  transition: width 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8),
    height 800ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-block;
  justify-content: center;
  overflow: hidden;
}

.close_open {
  position: relative;
  padding: 10px;
  cursor: pointer;
}

.expand_arrow {
  cursor: pointer;
  transition: all 0.1s ease-in;
}

.rotate_arrow {
  transform: rotate(180deg);
}

.expand_settings {
  padding: 2px 20px;
  width: 180px;
  height: 240px;
  border-radius: 15px;
}

.settings_box {
  position: relative;
  opacity: 0;
  transition: all 0.25s ease-in;
  margin-top: -20px;

  .setting_title {
    padding: 0;
    margin: 0;
    text-align: left;
  }

  ul {
    li {
      text-align: left;
      list-style: none;
      margin-left: -30px;
      padding-bottom: 5px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        color: green;
      }

      .item_container {
        position: fixed;
        background-color: #fff;
        padding: 10px;
        max-height: 220px;
        border-radius: 10px;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
        display: block;
        overflow: auto;

        .item_box {
          background-color: green;
          margin: 10px 0;
          padding: 5px 15px;
          width: 190px;
          border-radius: 10px;
          color: white;
          font-weight: normal;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.45);

          img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
          }
        }
      }
    }
  }
}

.show_settings_box {
  margin-top: 0px;
  opacity: 1;
  font-size: 1em;
}
.hide_settings_box {
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
}

.open_menu {
  background-color: #fff;
  padding: 7px;
  border-radius: 50%;
  margin-top: -3px;
  transform: rotate(180deg);
  transition: all 0.3s ease-in-out;
  margin-right: -160px;
  z-index: 3;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.25);
}

.close_menu {
  transition: all 0.04s ease-in-out;
  margin-right: 0px;

  img {
    padding: 5px;
  }
}

@keyframes fading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>