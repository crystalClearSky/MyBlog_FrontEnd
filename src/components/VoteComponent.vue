<template>
  <div v-if="cards.length">
    <div v-for="card in cards" :key="card.id">
      <div class="voting" v-if="card.upVotes.length">
          <main-content
          :votings="votes"
            v-for="votes in card.upVotes"
            :key="votes.id"
          ></main-content>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ContentService from "@/services/content-services";

const contentService = new ContentService();
import {IContent} from "@/types/Content";
import MainContent from "@/components/MainContent.vue";

@Component({
  name: "VoteComponent",
  components: { MainContent },
})
export default class VoteComponent extends Vue {
  @Prop({ required: true })
  cards: IContent[] = [];

  created() {
    contentService
      .getAllCards()
      .then((res) => this.cards)
      .catch((err) => console.log(err));
  }
  updated() {
      console.log('tetetete');
  }
}
</script>

<style scoped>
</style>