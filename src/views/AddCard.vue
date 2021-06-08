<template>
  <div class="add-card-wrapper">
 <h1>Add Card</h1>
 <div class="add_card_form">
   <ul class="new_card">
     <li>
       <label for="title">Card title </label>
       <input type="text" id="title" v-model="card.title">
     </li>
     <li>
       <label for="title">Image Url </label>
       <input type="text" id="imageurl" v-model="card.imageUrl">
     </li>
     <li>
       <label for="title">Description </label>
       <input type="text" id="description" v-model="card.description">
     </li>
   </ul>
   <button :disabled="isButtonDisabled" @click="addCard">Add Card</button>
 </div>
  </div>
</template>

<script lang="ts">
import ContentService from '@/services/content-services';
import ICreateContent from '@/types/CreateContent';
import { Component, Vue } from "vue-property-decorator";

const contentService = new ContentService();

@Component({
  name: "AddCard",
  components: {},
})
export default class AddCard extends Vue {
  card: ICreateContent = {
    title: "",
    imageUrl: "",
    description: ""
  };

  get isButtonDisabled() {
    return this.card.title === "" || this.card.imageUrl === "";
  }

  addCard() {
    
    contentService.addNewCard(this.card);
    console.log('Success!!');
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script&family=Montserrat:wght@300&display=swap");

.new_card {
  list-style: none;
  padding: 0;
  margin: 0;
}

input {
  height: 1.8rem;
  margin-bottom: 1.2rem;
  font-style: 1.1rem;
  line-height: 1.3rem;
  padding: 0.2rem;
  color: #555;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.3rem;
}

</style>
