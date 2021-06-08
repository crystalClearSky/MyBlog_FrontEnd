<template>
  <div>
    <div :class="{show_bar: !options.isLiving}">
      <!-- <div v-if="unregGuest" class="welcome_unregisted">Welcome {{ unregGuest.region }} user!</div> -->
      <div v-if="!avatar">
        <join-box
          v-show="!showsignin"
          v-if="justIp || unregGuest || guest"
          :unregGuest="unregGuest"
          @enableVote="runGuest"
          @enableAvatar="runAvatar"
          :guest="guest"
          :justIp="justIp"
          :options="options"
        />
        <alert-box :showAlert="showAlertBox" />
      </div>
      <div v-if="options">
        <div v-if="options.isMember && !avatar">welcome back</div>
      </div>

      <div v-if="options">
        <div v-if="!avatar && !options.isMember" class="places_remaining">
          Only {{ remainingFruits() }}{{ fruitsCount }} Places Left
        </div>
      </div>
      <ul class="action_bar_container" :class="{ hide_action_bar: hideBars }">
        <li class="link_bubble" @click="showSignIn">
          <div v-if="avatar">
            <img
              v-if="avatar.isCheckedIn"
              class="fill_image"
              :src="require('../assets/avatar/' + avatar.avatarImgUrl)"
              alt=""
            />
            <img
              class="fill_image"
              v-else-if="avatar.id === true"
              src="@/assets/SVG/face.svg"
              alt=""
            />
          </div>
          <svg
            v-else
            class="fill_image"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <rect fill="none" height="24" width="24" />
            <path
              d="M18,9V7h-2V2.84C14.77,2.3,13.42,2,11.99,2C6.47,2,2,6.48,2,12s4.47,10,9.99,10C17.52,22,22,17.52,22,12 c0-1.05-0.17-2.05-0.47-3H18z M15.5,8C16.33,8,17,8.67,17,9.5S16.33,11,15.5,11S14,10.33,14,9.5S14.67,8,15.5,8z M8.5,8 C9.33,8,10,8.67,10,9.5S9.33,11,8.5,11S7,10.33,7,9.5S7.67,8,8.5,8z M12,17.5c-2.33,0-4.31-1.46-5.11-3.5h10.22 C16.31,16.04,14.33,17.5,12,17.5z M22,3h2v2h-2v2h-2V5h-2V3h2V1h2V3z"
            />
          </svg>
        </li>
        <ul v-for="(link, index) in links" :key="index">
          <li
            @click="selectLink(index, (clicked = true))"
            class="link_bubble_links"
            :class="{ link_selected: index == selectedtab }"
          >
            <span>{{ link }}</span>
          </li>
        </ul>
        <li class="slider" id="sliding"></li>
      </ul>
      <sign-in-box
        class="sign_in"
        @signedIn="SigningIn()"
        :signin="showsignin"
        :options="options"
        :login="logIn"
        @errorMessage="sendAlert"
        @enableAvatar="runAvatar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SignInBox from "@/components/SignInBox.vue";
import ContentService from "@/services/content-services";
import IAvatar from "@/types/Avatar";
import IUnregisteredGuest from "@/types/UnregisteredGuest";
import JoinBox from "@/components/JoinBox.vue";
import AlertBox from "@/components/AlertBox.vue";
import IGuest from "@/types/Guest";
import IOptions from "@/types/Options";
import ICurrentIP from "@/types/CurrentIP";
import ILogin from "@/types/Login";

const contentService = new ContentService();

@Component({
  name: "ActionBar",
  components: { SignInBox, JoinBox, AlertBox },
})
export default class ActionBar extends Vue {
  @Prop() unregGuest!: IUnregisteredGuest;
  @Prop() guest!: IGuest;
  @Prop() avatar!: IAvatar;
  @Prop() options!: IOptions;
  @Prop() justIp!: ICurrentIP;
  @Prop() hideBars!: boolean;
  @Prop() logIn!: ILogin;

  showActionBar = true;
  showsignin = false;
  isSignedIn = false;
  clicked = false;
  selectedtab = -1;
  messe = "normal";
  adblockmessagecounter = 0;

  showAlertBox = false;

  links = ["HOME", "GALLERY", "CONTACT", "ABOUT"];

  goTo(point: string) {
    this.$emit("goto", point);
  }

  fruitsCount = 0;
  remainingFruits() {
    setTimeout(async () => {
      await contentService.getRemainingFruits().then((res) => {
        console.log("Fruits - " + res);
        this.fruitsCount = res.length;
      });
    });
  }

  testLink(e) {
    console.log(e);
  }

  runGuest(e: boolean) {
    this.$emit("enableThisGuest", e);
  }

  runAvatar(e: boolean) {
    this.$emit("enableAvatar", e);
  }

  sendAlert(e) {
    this.$emit("sendAlert", e);
  }

  runLogin(e: ILogin) {
    console.log("Result - " + e.name + e.usertype)
    setTimeout(() => {
    this.$children[1].signIn(e);
    }, 200);
  }

  runThis() {
    setTimeout(() => {
      if (
        !(this.adblockmessagecounter > 0) &&
        !this.unregGuest &&
        !this.guest &&
        !this.justIp
      ) {
        this.showAlertBox = true;
        this.adblockmessagecounter++;
      }
    }, 1070);
  }

  slide: any;
  selectLink(id: number) {
    this.selectedtab = id;
    this.$nextTick().then(() => {
      console.log("is clicked");
      const linkWord = this.links[id].toLowerCase();
      const link = document.querySelector("li.link_bubble_links.link_selected");
      this.slide = document.getElementById("sliding");
      //slide.style.left = "200px";
      this.slide.style.width = `${link?.scrollWidth}px`;

      switch (linkWord) {
        case "home":
          this.slide.style.left = "65px";
          break;
        case "gallery":
          this.slide.style.left = "140px";
          break;
        case "contact":
          this.slide.style.left = "238px";
          break;
        case "about":
          this.slide.style.left = "341px";
          break;
        default:
          break;
      }
      if (this.clicked) {
        this.$emit("goto", "#" + this.links[id].toLowerCase());
        this.clicked = false;
      }
    });

    //this.$emit("goto", "#" + this.links[id].toLowerCase());
  }

  gotoThis() {
    this.$emit("goto", "#about");
  }

  showSignIn() {
    this.showsignin = !this.showsignin;
    this.$emit("darken");
    console.log(this.avatar);
    console.log(this.showsignin);
  }

  SigningIn() {
    console.log("IN SIGN IN AREA!!");
    this.isSignedIn = !this.isSignedIn;
  }

  created() {
    this.checkWindowScroll();
  }

  mounted() {
    window.onscroll = () => {
      this.checkWindowScroll();
    };
    setTimeout(() => {
    this.selectLink(0)
    }, 300);
  }

  checkWindowScroll() {
    console.log(window.scrollY);
    if (window.scrollY >= 0) {
      this.selectedtab = 0;
      this.selectLink(0);
    }
    if (window.scrollY >= 640) {
      this.selectedtab = 1;
      this.selectLink(1);
    }
    if (window.scrollY >= 1370) {
      this.selectedtab = 2;
      this.selectLink(2);
    }
    if (window.scrollY >= 2040) {
      this.selectedtab = 3;
      this.selectLink(3);
    }
  }
}
</script>

<style lang="scss" scoped>
.show_bar {
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s ease-in;
}

.welcome_unregisted {
  position: absolute;
  background-color: green;
  width: 200px;
  height: 25px;
  bottom: -15px;
}

.places_remaining {
  position: absolute;
  background-color: rgb(240, 240, 240);
  height: 18px;
  min-width: 110px;
  display: inline-block;
  padding: 4px 10px 0 10px;
  border-radius: 10px;
  border: 2px solid rgb(29, 29, 29);
  font-size: 0.75em;
  z-index: 1;
  margin: 0px 0px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.action_bar_container {
  background-color: #fff;
  height: 61px;
  min-width: 30px;
  border-radius: 30px;
  display: inline-block;
  padding: 0;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 400ms cubic-bezier(0.68, -0.6, 0.32, 1);

  .link_bubble {
    height: 50px;
    min-width: 50px;
    margin: 5px 5px;
    border-radius: 25px;
    transition: 0.2s ease-in-out;
    list-style: none;
    display: inline-block;

    cursor: pointer;
    position: relative;
    background-color: rgb(226, 226, 226);
    border-radius: 50%;
    display: inline-block;
    justify-content: center;
    float: left;

    .fill_image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
      justify-content: center;

      //filter: invert(0.5) sepia(1);
    }
  }

  .link_bubble:hover {
    background-color: green;
    color: white;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.25);

    span {
      font-weight: 500;
    }
  }
  ul {
    border-radius: 30px;
    display: inline-block;
    padding: 0;

    .link_bubble_links {
      height: 50px;
      min-width: 50px;
      margin: 5px 5px;
      border-radius: 25px;
      transition: 0.2s ease-in-out;
      list-style: none;
      display: inline-block;

      cursor: pointer;

      span {
        position: relative;
        top: 15px;
        padding: 0 10px;
        z-index: 2;
      }
    }

    .link_bubble_links:hover {
      span {
        font-weight: 700;
      }
    }
    .link_selected {
      color: white;
    }
  }
  .slider {
    position: relative;
    top: -55px;
    left: 70px;
    width: 0px;
    height: 50px;
    border-radius: 25px;
    background-color: green;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.25);

    list-style: none;
    transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
  }
}

.hide_action_bar {
  position: relative;
  margin-right: -500px;
  opacity: 0;
  transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
}
@media only screen and (max-width: 900px) {
  .places_remaining {
    right: 20px;
  }
  .action_bar_container {
    ul {
      display: none;
    }
  }
  .slider {
    display: none;
  }
  .sign_in {
    position: absolute;
    top: 0;
    left: 165px;
  }
}
</style>