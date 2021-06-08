<template>
  <div class="add-card-wrapper">
    <h1>Log In</h1>
    <div class="login_in_form">
      <ul class="new_login">
        <div class="select_option">
          <input
            type="radio"
            id="usertype"
            name="admin"
            value="true"
            v-model="login.usertype"
          />
          <label for="admin"> Admin </label>
          <input
            type="radio"
            id="usertype"
            name="admin"
            value="false"
            v-model="login.usertype"
          />
          <label for="user"> User </label>
        </div>
        <div class="text_area">
          <li>
            <label for="title">User IP Address </label>
            <input
              type="text"
              id="imageurl"
              placeholder="IP Address..."
              v-model="login.currentIp"
            />
          </li>
          <li>
            <label for="title">Admin Name </label>
            <input
              type="text"
              id="description"
              placeholder="IP Address..."
              v-model="login.name"
            />
          </li>
        </div>
      </ul>
      <button :disabled="isButtonDisabled" @click="signIn">Log In
      </button>
      <button :disabled="!isButtonDisabled" @click="signOut">Log Out</button>
    </div>
    <div class="message">You're signed in as {{ avatar.name }}</div>
  </div>
</template>

<script lang="ts">
//import ContentService from "@/services/content-services";
import ContentService from "@/services/content-services";
import { Component, Vue, Emit } from "vue-property-decorator";
import ILogin from "@/types/Login";
import IAvatar from "@/types/Avatar";
import IAdmin from "@/types/Admin";
//const contentService = new ContentService();

const contentService = new ContentService();

@Component({
  name: "Login",
  components: { },
})
export default class Login extends Vue {
  private isDisabled = false;

  avatar: IAvatar[] = [];
  admin: IAdmin[] = [];
  login: ILogin = {
    usertype: false,
    currentIp: "",
    name: "",
    isLoggedIn: false
  };

  message = "I look like this works!";

  @Emit("close-dailog")
  close() {
    console.log("this works");
  }
  get isButtonDisabled() {
    return this.login.name === "" && this.login.currentIp === "";
  }

  async signOut() {
    if(this.login.currentIp === ""){
    await contentService.signUserOut();
    this.isDisabled = false;
    this.login.currentIp = "";
    console.log('This user has been Logged out.');
    } else {
      console.log('No user is loggged in!');
      console.log(this.login.currentIp)
    }
  }

  updated() {
    console.log('test')
    this.$parent.$emit("test", this.message)

  }

  logIn() {
    this.signIn();
  }

  async signIn() {
    let result;
  
    if (!this.login.usertype) {
       
      result = await contentService
        .loginIn(this.login)
        .then((res) => (this.avatar = res))
        .catch((err) => console.error(err));
        // is logged in? boolean
      console.log(result);
      this.$emit('thisavatar');
    } else {
      result = await contentService
        .loginIn(this.login)
      console.log(result);
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script&family=Montserrat:wght@300&display=swap");

.select_option {
  position: relative;
  display: block;
  font-weight: bold;
}

.new_login {
  list-style: none;
  padding: 0;
  margin: 0;
}

.text_area label {
  font-weight: bold;
  position: relative;
  display: block;
  margin-bottom: 0.3rem;
}

input {
  margin-bottom: 1.2rem;
  font-style: 1.1rem;
  line-height: 1.3rem;
  padding: 0.2rem;
  color: #555;
}
</style>
