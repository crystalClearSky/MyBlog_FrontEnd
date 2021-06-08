<template>
  <div>
    <div v-if="justIp && !isShowing && !avatar && !checkOption()">
      {{ runThis() }}
      <div class="member_container" :class="{ showThisLogo: !justIp }">
        <div
          class="member_wrapper"
          :class="{ shadow: showLogo, login_section_wrapper: dimBack }"
        >
          <div class="recap_wrapper" v-if="options">
            <my-capts 
            v-show="showThisBox && !options.isLiving" 
            @isConfirmed="confirmed"
            :options="options"
            :justIp="justIp"
            class="re_cap"
             />
          </div>

          <div
            class="logo"
            :class="{ displayLogo: !showLogo, login_section_logo: showLogin }"
          >
            <img src="@/assets/logo.png" alt="" />
          </div>
          <div class="content_container">
            <div
              class="join_container"
              :class="{ hide_join: !showLogo, show_join: showLogo }"
            >
              <h2>{{ subtitle }}</h2>
              <div v-show="!isAlreadyAMember" class="count">
                Only {{ remainingFruits() }}{{ fruitsCount }} places left
              </div>
              <div class="join_box" >
                <div v-show="options" class="join_button" @click="enableNewAvatar()">
                  {{ check() }}
                </div>
                <div v-if="!isAlreadyAMember && options" class="cancel" @click="cancel">
                  Guest
                </div>
                <div v-show="!options" class="waiting">Waiting...</div>
              </div>
              <a v-show="options" class="alternative" @click="altArea()"
                >Alternative Authentication</a
              >
              <div class="notice">
                <span>{{ message }} </span>
              </div>
            </div>
            <div class="signin_container">
              <!-- <div class="back">Back to main</div> -->
              <div class="sigin_box">
                <div
                  @click="close"
                  class="close_btn"
                  :class="{ popin: dimBack, popout: !dimBack }"
                >
                  <img src="@/assets/SVG/close.svg" alt="" />
                </div>
                <div class="logo_img">
                  <img src="@/assets/logo.png" alt="" />
                </div>
                <div class="login_label">Hello again!</div>
                <!-- <div class="toggle_area">
                  <div class="toggle">
                    <div class="toggle_circle"></div>
                  </div>
                </div> -->
                <form action="" autocomplete="on">
                  <div class="signin_input">
                    <input
                      @focus="fPart = true"
                      :disabled="toggled"
                      ref="fpart"
                      type="text"
                      placeholder="User"
                      :class="{ focused: fPart }"
                      v-model="currentIP"
                      autocomplete="on"
                      @keydown.enter="logIn()"
                    />
                    <input
                      @focus="fPart = false"
                      :disabled="!toggled"
                      ref="lpart"
                      type="text"
                      placeholder="Admin"
                      :class="{ focused: !fPart }"
                      autocomplete="on"
                      v-model="name"
                      @keydown.enter="logIn()"
                    />
                    <div class="button_area">
                      <div class="login_button" @click="logIn()">Login</div>
                      <div class="toggle_area">
                        <div class="toggle" @click="toggleThis">
                          <img src="@/assets/SVG/options.svg" alt="" />
                          <div
                            class="toggle_circle"
                            :class="{ toggle_active: toggled }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="l_containter">
        <div class="login_container">
          <div class="login_box">
            <div class="input_area">
              <input type="text" placeholder="User"/>
              <input type="text" placeholder="Last Part" />
              <j-button />
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div v-else>{{ checkIfPresent() }}</div>
  </div>
</template>

<script lang="ts">
import IAvatar from "@/types/Avatar";
import IGuest from "@/types/Guest";
import INewIp from "@/types/NewIp";
import IOptions from "@/types/Options";
import JButton from "@/components/JButton.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import ILogin from "@/types/Login";
import ContentService from "@/services/content-services";
import MyCapts from "@/components/MyCapts.vue";
import { UserMutations } from "@/store/user/mutations";

const contentService = new ContentService();

@Component({
  components: { JButton, MyCapts },
  name: "MembershipBox",
})
export default class MembershipBox extends Vue {
  @Prop({ default: false }) isIntro!: boolean;
  @Prop() justIp!: INewIp;
  @Prop() avatar!: IAvatar;
  @Prop() guest!: IGuest;
  @Prop() options!: IOptions;
  @Prop() users: IAvatar[] = [];
  @Prop({ default: false }) noUser!: boolean;
  @Prop({ default: false}) showBox!: boolean; 
  
  test = false;

  login: ILogin = {
    usertype: false,
    currentIp: "",
    name: "",
    isLoggedIn: false,
  };

  darken = false;
  showLogo = false;
  isShowing = false;
  showLogin = false;
  fPart = true;
  message =
    "To ensure the best experience, this website uses cookies. By using this website, you agree to our use of cookies.";

  fruitsCount = 0;
  remainingFruits() {
    setTimeout(async () => {
      await contentService.getRemainingFruits().then((res) => {
        console.log("Fruits - " + res);
        this.fruitsCount = res.length;
      });
    });
  }
  runThis() {
    setTimeout(() => {
      if (
        this.justIp &&
        !this.isCancelled &&
        !this.guest &&
        !this.options?.enableGuest &&
        !this.avatar
      ) {
        setTimeout(() => {
          this.darken = true;
          this.$emit("darkenThis", this.darken);
          this.showLogo = true;
          this.isPresent = true;
        });
      }
    });

    

    // if(!this.guest) {
    // setTimeout(() => {
    //   this.$emit("enableThisGuest", true);
    // }, 2000);
    // }
  }

  // async checkLiving(): Promise<boolean> {
  //     //return  (this.options?.isLiving == false);
  //     const prom = new Promise<boolean>((res) => {
  //       setTimeout(() => {
  //         res(this.options?.isLiving == false);
  //       }, 1);
  //     });

  //    return prom.then(v => {  return v; })
  //   }
  
  confirmedLiving = true;
  checkLiving(): boolean {
     return (this.options?.isLiving == false)
      
      
  }

  userInfo(value: boolean) {
    console.log(value);
    this.$store.commit(UserMutations.SET_LIVING, value);
  }

  showThisBox = true;
  finalOption!: IOptions;
  confirmed(e: boolean) {
    console.log("In Confirmed!");
    setTimeout(() => {
    this.showThisBox = false
    }, 500);
    this.options.isLiving = true;
    setTimeout(async() => {
      this.finalOption = await contentService.editOption(this.options);
    },400);
  }

  dimBack = false;
  altArea() {
    this.showLogin = true;
    setTimeout(() => {
      this.dimBack = true;
      this.$refs.fpart.focus();
    }, 300);
  }

  close() {
    this.showLogin = false;
    this.dimBack = false;
  }

  toggled = false;
  toggleThis() {
    this.toggled = !this.toggled;
    if (this.toggled) {
      this.fPart = false;
      this.$nextTick().then(() => {
        this.$refs.fpart.focus();
      });
    } else {
      this.fPart = true;
      this.$nextTick().then(() => {
        this.$refs.lpart.focus();
      });
    }
  }

  subtitle = "";
  isAlreadyAMember = false;
  isGuestPresnt!: IGuest;
  check(): string {
    const result = this.users
      ? this.users.find((x) => x.currentIP == this.justIp.query)
      : null;
    if (result) {
      this.isAlreadyAMember = true;
      this.subtitle = "Welcome Back!";
      return "Log-in";
    }
    setTimeout(async () => {
      this.isGuestPresnt = await contentService.getGuestById(
        -1,
        this.justIp.query
      );
    }, 10);

    if (this.isGuestPresnt) {
      this.subtitle = "Hello Again!";
      return "Log-in";
    } else {
      this.subtitle = "Join the Conversation";
      return "Join";
    }
  }

  name = "";
  currentIP = "";
  logIn() {
    console.log("logging in");
    this.login = {
      usertype: this.toggled,
      name: this.name,
      currentIp: this.currentIP,
      isLoggedIn: true,
    };
    console.log("Deails - " + this.login.usertype);
    this.$emit("logInIt", this.login);
  }

  checkOption(): boolean {
    // if (this.options && this.options.isMember ? this.options.isMember : false)
    //   return true;

    if (this.guest) return true;

    return false;
  }

  enableNewAvatar() {
    console.log("In enable new Avatar");
    if (!this.guest) {
      setTimeout(() => {
        //this.$parent.getGuest(this.justIp);
        this.$emit("checkForGuest", this.justIp.query);
      }, 290);

      if (!this.guest) {
        this.$emit("enableThisGuest", true);
      }
    }

    this.$emit("enableAvatar", true);
    setTimeout(() => {
      this.cancel();
    }, 1000);
  }

  isPresent = false;
  NoUser = false;
  checkIfPresent() {
    if (!this.justIp && !this.avatar) {
      setTimeout(() => {
        this.NoUser = true;
      }, 800);
    }
    if (this.avatar) {
      setTimeout(() => {
        this.cancel();
      }, 800);
    }
  }

  isCancelled = false;
  cancel() {
    console.log("In Cancel");
    this.isCancelled = true;
    if (this.darken) this.$emit("enableThisGuest", true);

    this.darken = false;
    this.$emit("darkenThis", false);
    this.showLogo = false;
    if (!this.options)
      setTimeout(() => {
        this.isShowing = true;
      });
  }
}
</script>

<style scoped lang="scss">
.signin_container {
  //background-color: red;
  padding: 10px;
  margin-top: 95px;

  .close_btn {
    background-color: #fff;
    padding: 10px;
    position: absolute;
    right: 5%;
    top: 8%;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 6px 40px rgba(43, 43, 43, 0.33), 0 6px 6px rgba(4, 4, 4, 0.37);
    cursor: pointer;
  }

  .popin {
    transform: scale(1);
    visibility: visible;
    opacity: 1;
    transition: 0.3s;
    transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }

  .popout {
    transform: scale(0.4);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }

  .back {
    font-size: 0.8em;
    background-color: #fff;
    display: inline-block;
    padding: 3px;
  }

  .sigin_box {
    background-color: rgb(255, 255, 255);
    padding: 10px;
    width: 80%;
    border-radius: 10px;
    margin: 0 auto;
    box-shadow: 0 6px 40px rgba(43, 43, 43, 0.33), 0 6px 6px rgba(4, 4, 4, 0.37);

    .logo_img {
      img {
        width: 60px;
      }
    }

    .login_label {
      font-size: 1.3em;
      font-weight: 600;
    }

    .toggle_area {
      //background-color: red;
      padding: 2px;
      display: inline-block;
      justify-content: center;

      img {
        position: absolute;
        width: 43px;
        margin-left: -22px;
        margin-top: 3px;
      }

      .toggle {
        background-color: #fff;
        width: 50px;
        height: 28px;
        border-radius: 20px;

        .toggle_circle {
          position: relative;
          background-color: green;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          margin: 5px;
          top: 4px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.85);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: rgb(0, 99, 0);
          }
        }
        .toggle_active {
          margin-left: 26px;
        }
      }
    }

    .signin_input {
      input {
        background-color: rgb(232, 232, 232);
        margin: 5px 0;
        border: none;
        outline: none;
        padding: 8px 10px;
        border-radius: 8px;
        width: 90%;
      }

      .focused {
        background-color: rgb(252, 252, 252);
        border: 1px solid green;
        padding: 7px 9px;
      }

      .button_area {
        padding: 5px;
        background-color: rgb(177, 177, 177);
        display: flex;
        border-radius: 8px;

        .login_button {
          background-color: green;
          margin: 5px 5px;
          padding: 5px 10px;
          width: 100%;
          border-radius: 5px;
          color: white;
          cursor: pointer;

          &:hover {
            background-color: rgb(0, 99, 0);
          }
        }
      }
    }
  }
}
.member_container {
  display: flex;
  justify-content: center;

  .member_wrapper {
    background-color: #ffffff;
    max-width: 350px;
    max-height: 320px;
    border-radius: 5px;
    transition: all 0.5s;
    transform: scale(1.25);
    display: inline-block;
    overflow: hidden;

    .recap_wrapper {
      display: flex;
      justify-content: center;
      .re_cap {
        position: absolute;
        z-index: 4;
        bottom: 30px;
      }
    }

    .logo {
      position: relative;
      background-color: rgb(255, 255, 255);
      height: 40%;
      width: 100%;
      border-radius: 10px 10px 0px 0px;
      transition: 0.3s;
      transition-timing-function: cubic-bezier(0, 0.52, 0.47, 0.99);
      z-index: 2;
      display: flex;
      justify-content: center;

      img {
        margin-top: 15px;
        width: 100%;
        object-fit: contain;
      }
    }

    .login_section_logo {
      margin-top: -320px;
    }

    .displayLogo {
      height: 100%;
      border-radius: 10px;
    }

    .join_container {
      padding: 10px;
      height: 100px;
      margin: 10px 10px;

      h2 {
        margin: 0;
      }

      .alternative {
        font-size: 0.7em;
        color: rgb(0, 85, 0);
        cursor: pointer;
      }

      .count {
        color: green;
      }

      .join_box {
        background-color: rgb(177, 177, 177);
        padding: 10px;
        display: flex;
        justify-content: center;
        gap: 5px;
        width: 90%;
        margin: 5px auto;
        border-radius: 10px;

        .join_button {
          background-color: green;
          padding: 10px 20px;
          width: 40%;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background-color: rgb(1, 85, 1);
          }
        }

        .cancel {
          width: 40%;
          padding: 10px 20px;
          border-radius: 5px;
          transition: all 0.3s;

          &:hover {
            background-color: rgb(87, 87, 87);
            color: white;
          }
        }
        .waiting {
          padding: 10px 20px;
          background-color: #fff;
          color: black;
          width: 90%;
          border-radius: 5px;
        }
      }
    }

    .hide_join {
      opacity: 0;
      margin-top: -40px;
      visibility: hidden;
      transition: all 0.2s;
    }

    .show_join {
      transition: all 0.8s;
    }

    .notice {
      font-size: 0.7em;
      color: grey;
    }
  }

  .login_section_wrapper {
    background-color: rgb(72, 72, 72);
  }

  .showThisLogo {
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
  }

  .shadow {
    box-shadow: 0 6px 40px rgba(255, 255, 255, 0.33),
      0 6px 6px rgba(162, 162, 162, 0.37);
  }

  .l_containter {
    display: flex;
    justify-content: center;
    .login_container {
      position: absolute;
      display: flex;
      justify-content: center;
      background-color: red;
      padding: 10px;
      margin-top: -30%;
      border-radius: 10px;

      .login_box {
        input {
          padding: 4px 10px;
          border: none;
          outline: none;
          margin: 5px 0;
        }
      }
    }
  }

  @media only screen and (max-width: 420px) {
    .signin_container {
      margin-top: 115px;
    }
    .member_container {
      margin-top: -80px;
      .member_wrapper {
        width: 70%;
        max-height: 390px;
      }
    }
  }
}
</style>