<template>
  <div class="mobile_navbar_container">
    <div class="mobile_navba_wrapper" :class="{hide_action_bar: hideBars}">
      <ul>
        <li @click="gotoLink('HOME')">
            <img class="nav_button" src="@/assets/SVG/home.svg" alt="" />
            </li>
        <li @click="gotoLink('GALLERY')">
          <img class="nav_button" src="@/assets/SVG/gallery.svg" alt="" />
        </li>
        <li @click="gotoLink('CONTACT')">
          <img class="nav_button" src="@/assets/SVG/contact.svg" alt="" />
        </li>
        <li @click="gotoLink('ABOUT')"><img class="nav_button" src="@/assets/SVG/about.svg" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class MobileActionBar extends Vue {
@Prop() hideBars!: boolean;
  gotoLink(link: string) {
      console.log('Lets go!!!');
    this.$emit("goto", "#" + link.toLowerCase());
  }
}
</script>

<style scoped lang="scss">
.mobile_navba_wrapper {
  position: fixed;
  background-color: rgb(235, 235, 235);
  width: 60%;
  height: 70px;
  z-index: 15;
  border-radius: 40px;
  bottom: 20px;
  left: 21%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);


  ul {
    padding: 0;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    gap: 1%;
    list-style: none;

    li {
      width: 20%;
      height: 20%;
      cursor: pointer;

      .nav_button {
        margin-top: 5px;
        width: 50%;
        height: 50px;
        transition: 0.2s ease-in-out;

        &:active {
            background-color: green;
        }
      }

      .nav_button:hover {
        width: 70%;
        height: 70%;
        border: 15px;

      }

      
    }
  }
}
.hide_action_bar {
  position: relative;
  margin-bottom: -200px;
  opacity: 0;
  transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
}
@media only screen and (min-width: 900px) {
  .mobile_navba_wrapper {
    visibility: hidden;
  }
}
// @media only screen and (max-width: 1120px) {
//   .mobile_navba_wrapper {
//       width: 75%;
//       left: 13%;
//   }
// }
@media only screen and (max-width: 750px) {
  .mobile_navba_wrapper {
    width: 85%;
    left: 8%;
  }
}
</style>