<template>
  <div class="app_back" id="app">
    <!-- <div class="cover"></div> -->
    <div class="bg" v-show="showsignin"></div>

    <!-- <div class="squiggle_bg">
      <div class="squiggle">
        <img src="@/assets/SVG/squiggle_background.svg" alt="" />
      </div>
    </div> -->

    <div class="navbar" id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <router-link to="/content">Content</router-link> |
      <!-- <router-link to="/addcard">Add Card</router-link> |
      <router-link to="/login">Log In</router-link> |
      <a class="signin" @click="showsignin = !showsignin">Sign In </a> |
      <label v-if="avatar" for="#">Logged in as: {{ this.avatar.name }}</label>
      <label v-else for="#">Not logged in.</label> -->

      <!-- <div class="login" v-show="showsignin">
        <div class="radio_btn">
          <span class="radion_label" :class="{ move_label: isAdmin }"
            >admin </span
          ><span
            class="radio"
            @click="isAdmin = !isAdmin"
            :class="{ switch_on: isAdmin }"
          ></span>
        </div>
        <div class="radio_btn">
          <span class="radion_label" :class="{ move_label: !isAdmin }"
            >user </span
          ><span
            class="radio"
            @click="isAdmin = !isAdmin"
            :class="{ switch_on: !isAdmin }"
          ></span>
        </div>
        <div class="input_area">
          <input
            type="text"
            :disabled="isAdmin"
            :class="{ is_disabled: isAdmin }"
            placeholder="User"
            v-model="login.currentIp"
          />
        </div>
        <div class="input_area">
          <input
            type="text"
            :disabled="!isAdmin"
            :class="{ is_disabled: !isAdmin }"
            placeholder="Admin"
            v-model="login.name"
          />
        </div>
        <div class="buttons">
          <j-button
            :disabled="isButtonDisabled"
            :label="'Login'"
            :fade="isButtonDisabled"
            @click.native="logIn"
          />
          <div v-if="avatar">
            <j-button
              :disabled="!isButtonDisabled && !avatar.isCheckedIn"
              :label="'Log Out'"
              :fade="!avatar.isCheckedIn || avatar.name === 'Justice'"
              @click.native="logOut"
            />
          </div>
        </div>
        <label class="user_status" v-if="avatar" for="#"
          >Logged in as: {{ avatar.name }}</label
        >
        <label v-else for="#">Not logged in.</label>
      </div> -->
    </div>
    <router-view />
    <div>
      <login-box />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ContentService from "@/services/content-services";
import IAvatar from "@/types/Avatar";
import LogIn from "@/views/LogIn.vue";
import JButton from "@/components/JButton.vue";

import ILogin from "@/types/Login";
import IAdmin from "@/types/Admin";

const contentService = new ContentService();

@Component({
  name: "App",
  components: { LogIn, JButton },
})
export default class App extends Vue {
  
  // @Prop() avatar!: IAvatar;
  // admin!: IAdmin;
  // msg = false;
  // timer = "";
  // label = "";
  // isAdmin = false;

  // constructor() {
  //   super();
  //   Vue.prototype.$play = "This is just a test!";
  //   Vue.prototype.$isLoggedin = false;
  // }
  // private counter = 1;

  // private childCommand = false;

  // private refreshThisChild() {
  //   console.log("inside!!!");
  //   this.counter++;

  //   // for (const key of this.$children) {
  //   //   key.$forceUpdate();
  //   // }
  //   //     this.$nextTick(() => {
  //   //   // Okay, now that everything is destroyed, lets build it up again
  //   //   this.counter += 1
  //   // });
  //   console.log("out frame" + this.counter);
  // }

  // renderComponent = true;

  showsignin = false;

  // isDisabled = false;

  // login: ILogin = {
  //   usertype: false,
  //   currentIp: "",
  //   name: "",
  //   isLoggedIn: false,
  // };

  // get isButtonDisabled() {
  //   return this.login.name === "" && this.login.currentIp === "";
  // }

  // blockBGScroll(e: boolean) {
  //   if(e){
  //   document.body.style.position = 'fixed';
  //   }
  // }

  // check(): string {
  //   if (this.avatar !== undefined) {
  //     return "logged in as: " + this.avatar.name;
  //   }
  //   return "No user is looged in!";
  // }

  // forceRerender() {
  //   // Remove my-component from the DOM
  //   this.renderComponent = false;

  //   this.$nextTick(() => {
  //     // Add the component back in
  //     this.renderComponent = true;
  //   });
  // }

  // logIn() {
  //   this.signIn();
  // }

  // async signIn() {
  //   console.log("in signin");
  //   console.log(this.login);
  //   this.login.usertype = this.isAdmin;
  //   let result;
  //   if (!this.login.usertype) {
  //     console.log(this.login);
  //     result = await contentService
  //       .loginIn(this.login)
  //       .then((res) => (this.avatar = res))
  //       .catch((err) => console.error(err));
  //     if (result.length) {
  //       console.log(this.avatar.name);
  //       console.log("DONE");
  //       this.showsignin = false;
  //       //this.$isLoggedin = true;
  //       this.getAvatar();
  //       document.location.reload(true);
  //       //console.log(this.$isLoggedin);
  //     }

  //     //   setTimeout(async () => {
  //     //   this.$parent.$forceUpdate();
  //     // }, 100);

  //     //this.$emit('thisavatar');
  //   } else {
  //     console.log(this.login.name);
  //     const r = await contentService.loginIn(this.login);
  //     console.log(r);
  //     if (r.length) {
  //       this.$parent.$forceUpdate();
  //       this.showsignin = false;
  //       //this.$isLoggedin = true;
  //       this.getAvatar();
  //       //console.log(this.$isLoggedin);

  //       document.location.reload(true);
  //       console.log("LOGGED OUT ADMIN");
  //     }
  //   }
  // }

  // logOut() {
  //   this.signOut();
  // }

  // async signOut() {
  //   if (this.avatar) {
  //     await contentService.signUserOut();
  //     this.isDisabled = false;
  //     this.login.currentIp = "";
  //     console.log("This user has been Logged out.");
  //     this.showsignin = false;
  //     this.$parent.$forceUpdate();
  //     //this.$isLoggedin = false;
  //     document.location.reload(true);
  //   } else {
  //     console.log("No user is loggged in!");
  //     console.log(this.login.currentIp);
  //   }
  // }

  // created() {
  //   this.getAvatar();
  // }

  // async getAvatar() {
  //   this.avatar = await contentService.getThisAvatar();
  // }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script&family=Montserrat:wght@300&display=swap");

body {
  font-family: "Montserrat", sans-serif;
  background-color: rgb(34, 34, 34);
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;

}

.app_back {
background: rgb(255,255,255);
background: linear-gradient(212deg, rgba(255,255,255,1) 0%, rgba(216,216,216,1) 34%, rgba(0,0,0,1) 81%);
  width: 1300px;
  overflow: hidden;
}

.squiggle_bg {
  display: flex;
  justify-content: center;

  .squiggle {
    position: absolute;
    margin: 0 auto;
    z-index: 1;
    left: 20%;
  transition: 0.2s ease-in-out;


    img {
      bottom: 0;
      object-fit: cover;
      
    }
  }
}

.bg {
 background: black;
  position: absolute;
  opacity: 0.8;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 7;
  transition: 0.2s ease-in-out;
}

.bgMain {
  background: linear-gradient(0deg, rgba(0,0,0,1) 67%, rgba(0,0,0,0.7133228291316527) 82%, rgba(0,0,0,0.34077380952380953) 100%);
  position: absolute;
  opacity: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 7;
  transition: 0.5s ease-in-out;
}

.bgE {
  opacity: 1;
  visibility: visible;
  transition: 0.5s ease-in-out;
}

.bgL {
  opacity: 0;
  visibility: hidden;
  transition: 0.2s ease-in-out;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.signin {
  cursor: pointer;
}

.login::before {
  content: " ";
  background-color: rgb(199, 199, 199);
  width: 10px;
  height: 10px;
  margin: 0 130px;
  position: absolute;
  transform: rotate(45deg);
  top: -5px;
}

.login {
  background-color: rgb(199, 199, 199);
  position: absolute;
  width: 300px;
  height: 210px;
  right: 130px;
  top: 70px;
  border-radius: 30px;
  display: block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  transition: ease-in 0.2s;

  .input_area {
    margin: 10px 2px;
    height: 40px;
    right: 10px;

    p {
      position: absolute;
      left: 40px;
      padding: -5px;
      margin: 10px 0;
      font: 300;
      color: rgb(26, 26, 26);
    }

    input[type="text"] {
      position: absolute;
      left: 55px;
      width: 160px;
      height: 30px;
      border: none;
      border-radius: 20px;
      padding: 4px 15px;
      transition: 0.3s;
    }

    .is_disabled {
      background-color: rgb(56, 56, 56);
    }

    input {
      outline: none;
    }
    input:focus {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    }
  }
  .radio_btn {
    position: relative;
    width: 70px;
    height: 25px;
    background-color: #fff;
    display: inline-block;
    margin: 10px 10px 0;
    border-radius: 15px;
    padding: 0;
    font-size: 0.9em;
    text-align: left;
    padding: 2px 5px;

    .radio {
      position: absolute;
      background-color: rgb(102, 102, 102);
      width: 25px;
      height: 25px;
      top: -3px;
      margin: 0 47px;
      border-radius: 25px;
      border: 5px solid white;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
      transition: ease-in 0.1s;
      cursor: pointer;
    }

    .radio:hover {
      background-color: rgb(143, 143, 143);
    }

    .switch_on {
      background-color: green;
      margin: 0 -10px;
    }
    .switch_on:hover {
      background-color: rgb(1, 163, 1);
    }

    .radion_label {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 5px;
      margin: 0 5px;
      transition: ease-in 0.3s;
    }

    .move_label {
      color: green;
      margin: 0 30px;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
  }
  .user_status {
    position: relative;
    margin: 5px 0;
    font-weight: 500;
  }
}

.display_login {
  opacity: 0;
  visibility: hidden;
}

.navbar {
  position: fixed;
  float: right;
  right: 60px;
  top: 10px;
  background-color: #fff;
  border-radius: 40px;
  width: 40%;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
  visibility: hidden;
  display: none;
  z-index: 10;
}

// .cover {
//   background-color: blue;
//   opacity: .5;
//   position: sticky;
//   width: 100%;
//   height: 800px;
//   top: 0px;
//   z-index: 10;
// }

#nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  
}
@media only screen and (max-width: 1100px) {
  .squiggle_bg {
    .squiggle {
      left: -15%;
    }
  }
  }
  @media only screen and (max-width: 800px) {
.squiggle_bg {
    .squiggle {
      left: -35%;
    }
  }
  }
   @media only screen and (max-width: 560px) {
.squiggle_bg {
    .squiggle {
      left: -85%;
    }
  }
   }
 
</style>
