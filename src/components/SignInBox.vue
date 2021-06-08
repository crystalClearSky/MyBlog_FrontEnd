<template>
  <div class="signin_box">
    <div class="login" :class="{ on_enter: signin, on_leave: !signin }">
      
      <div class="radio_btn">
        <span class="radion_label" :class="{ move_label: isAdmin }">admin </span
        ><span
          class="radio"
          @click="isAdmin = !isAdmin"
          :class="{ switch_on: isAdmin }"
        ></span>
      </div>
      <div class="radio_btn">
        <span class="radion_label" :class="{ move_label: !isAdmin }">user </span
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
          v-on:keydown.enter="logIn"
        />
      </div>
      <div class="input_area">
        <input
          type="text"
          :disabled="!isAdmin"
          :class="{ is_disabled: !isAdmin }"
          placeholder="Admin"
          v-model="login.name"
          v-on:keydown.enter="logIn"
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
        <div v-if="!avatar">
          <j-button
          :label="'Become a Member'"
          @click.native="addNewAvatar"
           />
        </div>
      </div>
      <label class="user_status" v-if="avatar" for="#"
        >Logged in as: {{ avatar.name }}</label
      >
      <label v-else for="#">Not logged in.</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ContentService from "@/services/content-services";
import IAvatar from "@/types/Avatar";
//import LogIn from "@/views/LogIn.vue";
import JButton from "@/components/JButton.vue";

import ILogin from "@/types/Login";
import IAdmin from "@/types/Admin";
import IOptions from "@/types/Options";
import IAlertBox from "@/types/AlertBox";

const contentService = new ContentService();

@Component({
  name: "SignInBox",
  components: { JButton },
})
export default class extends Vue {
  @Prop({ default: false }) signin!: boolean;
  @Prop() options!: IOptions;

  avatar!: IAvatar;
  admin!: IAdmin;
  msg = false;
  timer = "";
  label = "";
  isAdmin = false;

  constructor() {
    super();
    Vue.prototype.$play = "This is just a test!";
    Vue.prototype.$isLoggedin = false;
  }
  private counter = 1;

  private childCommand = false;

  private refreshThisChild() {
    console.log("inside!!!");
    this.counter++;
  
    // for (const key of this.$children) {
    //   key.$forceUpdate();
    // }
    //     this.$nextTick(() => {
    //   // Okay, now that everything is destroyed, lets build it up again
    //   this.counter += 1
    // });
    console.log("out frame" + this.counter);
  }

  showsignin = false;

  signedIn = false;

  isDisabled = false;

  login: ILogin = {
    usertype: false,
    currentIp: "",
    name: "",
    isLoggedIn: false,
  };

  alert: IAlertBox = {
    title: "",
    message: "",
    isActive: false
  }

  get isButtonDisabled() {
    return this.login.name === "" && this.login.currentIp === "";
  }

  addNewAvatar() {
    console.log("This works");
    this.$emit("enableAvatar", true);
  }

  check(): string {
    if (this.avatar !== undefined) {
      return "logged in as: " + this.avatar.name;
    }
    return "No user is looged in!";
  }

  checked() {
    console.log(this.avatar);
  }
  timing: any;
  checkUser() {
      console.log('CHECKINGGGGGGGG!!' + this.signedIn)

    if(this.options.isMember && this.counter > 0 && !this.avatar) {
      this.counter++;
      this.login.currentIp = this.options.ipAddress;
    }
    if(!this.showsignin) {
      this.counter = 0;
    }
    if(this.signedIn){
      console.log('SECTION!!')
      if(!this.avatar){
        this.showsignin = false;
        document.location.reload(true);
      }
    }
    this.count();
  }
  count() {
  this.timing = setTimeout(() => {
      this.checkUser();
      
    }, 5000);
  }

  beforeUpdate() {
    this.checkUser();
    console.log('in counter')

  }


  logIn() {
    this.signIn();
  }

  async signIn(e: ILogin) {
    console.log("in signin");
    
    console.log(this.login);
    if(e) {
      if(e.isLoggedIn)
      this.login = e;
    } else {
    this.login.usertype = this.isAdmin;
    }
    let result;
    if (!this.login.usertype) {
      console.log(this.login);
      result = await contentService
        .loginIn(this.login)
        .then((res) => (this.avatar = res))
        .catch((err) => {this.$emit("errorMessage",this.alert = {
          title: "Log-in Error",
          message: "Invalid log in credetionals.\nPlease try again",
          isActive: true
        });  console.log(err)});
      if (result.length) {
        console.log(this.avatar.name);
        this.signedIn = true;
        
        console.log("DONE");
        this.showsignin = false;
        //this.$isLoggedin = true;
        
        document.location.reload(true);
        

        //console.log(this.$isLoggedin);
      }

      //   setTimeout(async () => {
      //   this.$parent.$forceUpdate();
      // }, 100);

      //this.$emit('thisavatar');
    } else {
      console.log(this.login.name);
      const r = await contentService.loginIn(this.login);
      console.log(r);
      if (r.length) {
        this.$parent.$forceUpdate();
        this.showsignin = false;
        //this.$isLoggedin = true;
        this.getAvatar();
        //console.log(this.$isLoggedin);
        
        document.location.reload(true);

        

        console.log("LOGGED OUT ADMIN");
      }
    }
  }

  logOut() {
    this.signOut();
  }

  async signOut() {
    if (this.avatar) {
      await contentService.signUserOut();
      this.isDisabled = false;
      this.login.currentIp = "";
      console.log("This user has been Logged out.");
      this.signedIn = false;
      this.showsignin = false;
      setTimeout(() => {
      contentService.logOutGuest();
    }, 30);
      this.$parent.$forceUpdate();
      //this.$isLoggedin = false;
      document.location.reload(true);
    } else {
      console.log("No user is loggged in!");
      console.log(this.login.currentIp);
    }
  }



  created() {
    this.getAvatar();
  }

  async getAvatar() {
    this.avatar = await contentService.getThisAvatar();
  }
}
</script>

<style scoped lang="scss">
.on_enter {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.on_leave {
  transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.display_login {
  opacity: 0;
  visibility: hidden;
}

.signin {
  cursor: pointer;
}

.login::before {
  content: " ";
  background-color: rgb(199, 199, 199);
  width: 10px;
  height: 10px;
  margin: 0 0px;
  position: absolute;
  transform: rotate(45deg);
  top: -5px;
}

.login {
  background-color: rgb(199, 199, 199);
  position: absolute;
  width: 300px;
  height: 210px;
  right: 140px;
  top: 90px;
  border-radius: 30px;
  display: block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

  .close_box {
    position: absolute;
    background-color: #fff;
    left: 15px;
    top: 15px;
    padding: 6px 9px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    cursor: pointer;

    img {
      margin-top: 2px;
    }
  }

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
</style>