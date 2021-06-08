<template>
  <div class="contact_container">
    <div class="contact_wrapper">
      <div class="contact_form">
        <form class="form" method="post">
          <ul>
            <li>
              <input
                type="text"
                placeholder="First Name"
                v-model="contact.firstName"
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Last Name"
                v-model="contact.lastName"
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Subject"
                v-model="contact.subject"
              />
            </li>
            <li>
              <textarea
                v-model="contact.message"
                cols="10"
                rows="3"
                placeholder="Message"
              />
            </li>
          </ul>
          <div class="btn_group">
            <j-button label="Submit" @click.native="sendEmail" />
          </div>
        </form>
      </div>
      <div class="contact_content">
        <img
          src="https://cdnb.artstation.com/p/assets/images/images/000/445/633/large/justice-headbush-9d9f84a6298e17bf294bd02dc901dd95.jpg?1422789508"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import JButton from "@/components/JButton.vue";
import IContact from "@/types/Contact";
import ContentService from "@/services/content-services";

const contentService = new ContentService();
@Component({
  name: "Contact",
  components: { JButton },
})
export default class Contact extends Vue {
  contact: IContact = {
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
  };

  sendEmail() {
    if (this.contact) {
      console.log("In sendEmail");
      setTimeout(async () => {
        const result = await contentService.sendEmail(this.contact);
        if (result.status == 200) {
          alert("Message sent!");
        } else {
          alert("Unable to send message!");
        }
      }, 300);
    } else {
      console.log("Invalid input.");
    }
  }
}
</script>

<style scoped lang="scss">
.contact_wrapper {
  margin-top: 0px;
  display: flex;
  justify-content: center;
  gap: 1px;

  .contact_form {
    margin-top: 30px;
    width: 55%;
    height: 460px;

    form {
      ul {
        list-style: none;
        li {
          position: relative;
          margin-top: 30px;
          list-style: none;
          display: flex;

          &:nth-child(4) {
            margin-top: 40px;
          }

          input[type="text"] {
            position: relative;
            width: 65%;
            height: 25px;
            margin: 10px 0px;
            border: none;
            background-color: none;
            border-bottom: 2px solid rgb(46, 46, 46);
            background: transparent;
            padding: 5px;
            color: rgb(28, 28, 28);
            transition: width 0.2s ease-in-out;
            font-size: 0.7em;
          }

          input:focus {
            outline: none;
            width: 90%;
            font-size: 1em;
          }

          input::placeholder {
            color: rgb(41, 41, 41);
          }

          input:focus::placeholder {
            color: rgb(41, 41, 41);
          }

          input li:nth-child(2) {
            height: 100px;
          }

          textarea {
            position: relative;
            width: 70%;
            height: 80px;
            padding: 10px;
            margin: 0 auto;
            border: 3px solid black;
            border-radius: 3px;
            left: -13%;
          }
        }
      }
    }
  }
  .contact_content {
    background-color: #fff;
    width: 45%;
    height: 525px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
@media only screen and (max-width: 790px) {
  .contact_wrapper {
    .contact_form {
      width: 80%;
    }
    .contact_content {
      width: 20%;
    }
  }
}
@media only screen and (max-width: 550px) {
  .contact_wrapper {
    .contact_form {
      width: 100%;
    }
    .contact_content {
      width: 0%;
    }
  }
}
</style>