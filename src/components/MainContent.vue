<template>
  <!-- image section -->
  <div
    class="card-wrapper"
    :class="{
      card_appears: ind !== content.id || !showCard,
      card_disappears: content.id === deletedCard || showCard,
      card_float: isHoveringOnCard,
    }"
    @mouseover="isHoveringOnCard = true"
    @mouseleave="isHoveringOnCard = false"
  >
    <div class="posted_by">
      <span class="posted_avatar"
        ><img src="@/assets/SVG/face.svg" alt=""
      /></span>
      <span class="posted_name">Justice</span>
    </div>
    <div class="card-image">
      <div class="card-image-wrapper" v-if="content.images.length">
        <div v-for="image in content.images.slice(0, 3)" :key="image.id">
          <img class="card-image-inside" :src="getImageByType(image)" />
          <div
            v-show="
              contentType[image.catergory] == 'youtubevideo' ||
              contentType[image.catergory] == 'vimeovideo' ||
              contentType[image.catergory] == 'webvideo'
            "
            class="play_icon"
          >
            <img src="@/assets/SVG/camera1.svg" alt="" />
          </div>
        </div>
        <div v-if="content.content" class="blog_caption">
          <div class="blog_caption_bg"></div>
          <div class="blog_caption_text">
            {{ content.content }}
          </div>
        </div>

        <div v-show="content.images.length > 1" class="image_count">
          {{ content.images.length }} |
          <img src="@/assets/SVG/collection.svg" alt="" />
        </div>
        <div class="new_tag" v-show="timeDifference(content)">
          <img src="@/assets/SVG/new_color.svg" alt="" />
        </div>
        <div class="new_label" v-show="timeDifference(content)">NEW</div>
        <div class="expand_overlay_container">
          <div class="overlay_wrapper" @click="expandThisCard(ind)"></div>
        </div>
        <div class="overlay_expand_icon" @click="expandThisCard(ind)">
          <img src="@/assets/SVG/open.svg" alt="" />
          <p>Expand Post</p>
        </div>
      </div>
      <div v-else class="no_image">
        <img src="@/assets/no_image.png" alt="" />
        <h4>No images found</h4>
      </div>

      <!-- <div v-for="votes in content.upVotes" :key="votes">
        <div v-if="user !== null" class="vote_fot_id">
          <div class="doll" v-if="votes.voteById === user.id"></div>
        </div>
      </div> -->

      <div
        class="upvotes-circle"
        :class="{ voting: hasVoted(content) }"
        @click="addUpVode(content.id)"
      >
        <div class="vote_count">{{ content.upVotes.length }}</div>
        <div class="vote-text">Votes</div>
        <div class="upvote-arrow">
          <img class="upvote_icon" src="@/assets/SVG/arrowUp.svg" alt="" />
        </div>
      </div>
    </div>

    <!-- delete card ----------------------------->
    <div v-if="user">
      <div
        class="confirm_box"
        @mouseleave="confirmdelete = false"
        v-if="user.name === 'Justice'"
      >
        <span
          class="expander"
          :class="{ on_expand: confirmdelete, on_colapse: !confirmdelete }"
        ></span>
        <span
          :class="{ on_expand: confirmdelete, on_colapse: !confirmdelete }"
          class="confirm_tick"
          @click="deleteCard(content.id)"
        >
          <img class="check_box" src="@/assets/SVG/delete_bin.svg" alt="" />
        </span>
        <span
          class="confirm_edit"
          :class="{ on_expand: confirmdelete, on_colapse: !confirmdelete }"
          @click="editCard(ind)"
        >
          <img class="edit_box" src="@/assets/SVG/create.svg" alt=""
        /></span>
        <div class="delete_card" @click="confirmdelete = !confirmdelete">
          <img
            :class="{ on_expand: !confirmdelete, on_colapse: confirmdelete }"
            src="@/assets/SVG/more_vertical.svg"
            alt="#"
          />
          <img
            :class="{ on_expand: confirmdelete, on_colapse: !confirmdelete }"
            src="@/assets/SVG/close.svg"
            alt="#"
          />
        </div>
      </div>
    </div>
    <div
      class="post_type"
      :class="{
        post_blog: content.postType == 1,
        post_image: content.postType == 0,
      }"
    >
      <img v-show="content.postType == 0" src="@/assets/SVG/image.svg" alt="" />
      <img v-show="content.postType == 1" src="@/assets/SVG/file.svg" alt="" />
    </div>
    <!-- title section ----------------------------------------------------------------->
    <div class="card-title">
      {{ content.title }}
      <div class="divider"></div>
      <div class="posted-on">Posted: {{ content.createdOn | humanize }}</div>
    </div>
    <!-- tag and flag section ---------------------------------------------------------->
    <div class="tag-and-flag">
      <div class="tagflag-icon">
        <div class="tagging" @click="test(content, content.id)">
          <img class="tag_and_flag_icon" src="@/assets/SVG/tag.svg" alt="" />
          <div class="tag_count">{{ content.tags.length }}</div>
        </div>
      </div>
      <div class="tagflag-divider"></div>
      <div class="tagflag-icon">
        <div class="flagging">
          <div class="view_count">{{ content.views.length }}</div>
          <img class="view_icon" src="@/assets/SVG/eye.svg" alt="" />
        </div>
      </div>
    </div>
    <div
      v-show="content.tagIsActive"
      class="tags_box"
      @mouseleave="away(content)"
    >
      <div class="tag_options">
        <div v-for="tag in content.tags" :key="tag.id">
          <div @click="getCardsWithThisTag(tag.tagItem)" class="tag_items">
            {{ tag.tagItem }}
          </div>
        </div>
      </div>
    </div>

    <!-- comment section ---------------------------------------------------------------->
    <div class="comment-warpper">
      <div v-if="content.comments.length">
        <div v-for="(comment, index) in content.comments" :key="index">
          <div class="avatar_circle">
            <img
              :src="
                require('../assets/avatar/' +
                  allusers[comment.avatarId - 1].avatarImgUrl)
              "
              alt=""
            />
          </div>
          <div
            class="comment_block"
            :class="{ flagged_comment_back: comment.flags[0] }"
          >
            <div class="flag_icon" v-if="comment.flags[0]">
              <img src="@/assets/SVG/flag.svg" alt="" />
              <div @click="viewComment(index)" class="view_comment">
                <span>view</span>
              </div>
            </div>
            <div v-if="comment.flags.length">
              <div v-show="comment.flags[0]" class="flagged_comment">
                - FLAGGED -
              </div>
            </div>
            <floating-label
              label="flag comment"
              class="little_label"
              :class="{ show_label: hovering == index }"
            />
            <div v-if="user">
              <div
                v-if="comment.avatarId != user.id && !comment.flags[0]"
                class="comment_flag"
                @click="flagComment(content, comment)"
                @mouseover="hovering = index"
                @mouseleave="hovering = -1"
              >
                <img src="@/assets/SVG/flag.svg" alt="" />
              </div>
            </div>
            <!-- reply section --------------------------------------->
            <div v-if="comment.isReply" class="reply_indicator">
              <div class="text" v-if="!comment.isSuperUser">
                <!-- {{ allusers[comment.responseToAvatarId - 1].name }} - {{ comments[comment.replyToCommentId - 1].message }} -->

                <div v-if="comments.length">
                  <span class="reply_strip">
                    <span>{{
                      allusers[comment.responseToAvatarId - 1].name
                    }}</span>
                  </span>
                  -
                  <span v-if="content.id === 1">
                    {{ comments[comment.replyToCommentId - 1].message }} </span
                  ><span v-else>{{
                    comments[comment.replyToCommentId - 1].message
                  }}</span>
                </div>
              </div>
            </div>
            <!-- END reply section ----------------------------- v-show="user.comments[comment.id - 1]"  ---------->

            <div v-if="user">
              <div
                v-if="
                  comment.avatarId == user.id ||
                  (user.id == true && !comment.flags[0])
                "
                class="comment_option_area"
                @mouseleave="awayComment(comment)"
              >
                <div
                  class="comment_options"
                  @click="comment.isActive = !comment.isActive"
                >
                  <img
                    class="delete_icon"
                    src="@/assets/vertical_dots_white.png"
                    alt=""
                  />
                  <span v-show="comment.isActive" class="popuptext" id="myPopup"
                    ><span
                      class="edit_comment_icon"
                      @click="editComment(comment, content.id)"
                      ><img src="@/assets/SVG/create.svg" alt="" /></span
                    >|<span
                      class="close_comment_icon"
                      @click="deleteComment(content.id, comment.id)"
                      ><img src="@/assets/SVG/delete_bin.svg" alt=""
                    /></span>
                  </span>
                </div>
              </div>
            </div>

            <div v-if="!comment.flags[0]" class="text_area">
              <p
                :class="{ trim_top: comment.isReply }"
                @click="handleClick"
                v-html="linkHashInComment(comment)"
              ></p>
            </div>
            <div
              class="text_area"
              :class="{ text_area_flagged: comment.flags[0] }"
              v-else
            >
              <p :class="{ flagged_paragraph: comment.flags[0] }">
                Reported as {{ comment.flaggedCommentMessages }}
              </p>
              <div v-show="flagSelected == index" class="view_flagged_comment">
                {{ comment.message }}
              </div>
            </div>
            <div v-show="!comment.flags[0]" class="like_area">
              <div class="like_icon" @click="addLike(comment, content.id)">
                <img
                  class="like_area_icons"
                  src="@/assets/like_heart.png"
                  alt=""
                />
              </div>
              <div class="likes_count">{{ comment.likes.length }}</div>
              <div class="like_divider"></div>
              <div
                class="reply_icon"
                @click="focusInput(), toggleReplyBox(content, comment)"
              >
                <img
                  class="like_area_icons"
                  src="@/assets/SVG/reply.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="posted_on_comment">
              <p>Posted: {{ comment.postedOn | humanize }}</p>
            </div>
          </div>
          <!-- replies ------>
          <!-- <div v-if="comment.response.length">
            <div v-for="reply in comment.response" :key="reply.id">
              <div class="avatar_circle"></div>
              <div class="comment_block">
                <div class="reply_indicator">
                  <div class="text">Repy to: {{ reply.reply.avatarId }}</div>
                </div>
                <div class="text_area">
                  <p>{{ reply.reply.message }}</p>
                </div>
                <div class="like_area">
                  <div class="like_icon">
                    <img
                      class="like_area_icons"
                      src="@/assets/SVG/like_heart.svg"
                      alt=""
                    />
                  </div>
                  <div class="like_divider"></div>
                  <div class="reply_icon">
                    <img
                      class="like_area_icons"
                      src="@/assets/SVG/reply.svg"
                      alt=""
                    />
                  </div>
                </div>

                <div class="posted_on_comment">
                  <p>Posted: {{ reply.reply.postedOn | humanize }}</p>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="view_all" @click="expandThisCard(ind, true)">View all {{ commentCount}} comments</div>
      </div>
      <div v-else class="no_comment">
        <span>No Comments Found</span>
        <span> Be the first</span>
      </div>
    </div>
    <!--- comment assets ----->
    
    <div class="comment_count_box">
      <div class="comment_box">{{ getCount(0, content.id) }} {{ commentCount}}</div>
      <div class="comment_box">
        <img class="tag_and_flag_icon" src="@/assets/comment.png" alt="" />
      </div>
    </div>
    <div v-if="content.replyBoxIsActive" class="comment_response_message">
      <p>{{ replyMessageBox.message }}</p>
      <span class="close_box" @click="clearBox(content, comment)">X</span>
    </div>
    <div class="write_comment_area">
      <div class="reply_box" v-if="content.id === onEdit">
        <div>
          <span @click="cancelEdit">Cancel edit</span>
        </div>
      </div>
      <div v-if="inFocus" class="max_text_count">
        {{ textLengthLimit() }} / 250
      </div>
      <div class="comment_bar">
        <div class="avatar_circle_icon">
          <div v-if="user" class="avatar_profile">
            <img
              v-if="user.isCheckedIn"
              :src="require('../assets/avatar/' + user.avatarImgUrl)"
              alt=""
            /><img
              v-else
              style="backgroundcolor: white; borderradius: 50%"
              src="@/assets/SVG/face.svg"
              alt=""
            />
          </div>
          <div v-else class="no_user">
            <img
              style="filter: drop-shadow(0 0 0.15rem white)"
              src="@/assets/SVG/new_user.svg"
              alt=""
            />
          </div>
        </div>
        <input
          :disabled="!user"
          ref="write"
          type="text"
          :placeholder="notice()"
          v-model="text.message"
          v-on:keydown.enter="sendMessage(content)"
          maxlength="250"
          @blur="cancelEdit"
        />
        <button
          class="send_btn"
          :disabled="isBtnDisabled"
          @click="sendMessage(content)"
        >
          <img class="like_area_icons" src="@/assets/send.png" alt="" />
        </button>
      </div>
    </div>
    <!-- end -->
  </div>
</template>



<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IContent, Comment, Image } from "@/types/Content";
import IWriteComment from "@/types/WriteComment";
import ContentService from "@/services/content-services";
import IAvatar from "@/types/Avatar";
import ICommentToDelete from "@/types/CommentToDelete";
import moment from "moment";
import IForFlagging from "@/types/ForFlagging";
import FloatingLabel from "@/components/FloatingLabel.vue";
import Axios from "axios";
import FilterService from "@/services/filter-service";

const contentService = new ContentService();
const filterService = new FilterService();

@Component({
  name: "MainContent",
  components: { FloatingLabel },
})
export default class MainContent extends Vue {
  @Prop({ default: null })
  content!: IContent;
  @Prop({ default: null, required: false })
  user!: IAvatar;
  @Prop()
  allusers: IAvatar[] = [];
  @Prop()
  comments: Comment[] = [];
  @Prop({ default: 0 }) option!: number;

  @Prop() comment2Delete: ICommentToDelete = {
    id: 0,
    contentId: 0,
  };
  @Prop({ default: -1 }) ind!: number;

  @Prop() bus!: any;

  @Prop() toSend!: IWriteComment;

  @Prop({ default: -1 }) cardToSend!: number;

  flagSelected = -1;

  @Prop({ default: 0 }) onEdit!: number;

  isHoveringOnCard = false;

  hovering = -1;

  showCard = false;

  selectedContent!: IForFlagging;

  deletedCard = -1;

  inputMessage = "Join to write a comment";

  text: IWriteComment = {
    id: -1,
    message: "",
  };
  isReplyComment = false;
  replyMessageBox!: Comment;
  @Prop() repMessageBox!: Comment;

  gallery: IContent[] = [];

  //toggle = false;
  colour = "color:red";
  styleObject = {
    color: "red",
    fontSize: "13px",
  };

  count = 0;
  textMaxLength = 250;

  confirmdelete = false;

  constructor() {
    super();
    //this.content.comments.filter((x) => (x.showItem = this.toggle));
    Vue.prototype.y = false;
    console.log(this.comment2Delete);
    //Vue.prototype.user =  this.getCurrentUser();
    //this.avatar = this.getCurrentUser();
  }

  // MainContent() {
  //   this.content.comments.showItem = false;
  // }

  // get getColor(){
  //   return this.sing.length === 2 ? "background-color:green; color:white" : "background-color:white; color:black"
  // <div
  //       class="upvotes-circle" :style="getColor"
  //       @click="addUpVode(content.id), hasVoted()"
  //     >

  // }

  // coloring(id: number): string {
  //   const num = id - 1
  //   if (this.gallery[num].upVotes.filter(x =>x.voteById === this.avatar[0].id).length > 0){
  //     this.colour = 'red';
  //     return 'color:' + this.colour
  //   }
  //   return 'color:' + this.colour;
  // }

  // maxy() {
  //   console.log('in here....' + this.content)
  //   this.coloring(this.content);
  // }
  flagComment(content: IContent, comment: Comment) {
    this.selectedContent = {
      commentId: comment.id,
      contentId: content.id,
      message: comment.message,
    };
    this.$emit("flagged", this.selectedContent);
  }

  linkHashInComment(comment: Comment): string {
    const result = filterService.FilterComment(comment.message);
    return result;
  }

  viewComment(id: number) {
    console.log(id);
    if (this.flagSelected == id) {
      this.flagSelected = -1;
    } else {
      this.flagSelected = id;
    }
  }
  imageResult!: string;
  contentType = ["image", "youtubevideo", "vimeovideo", "webvideo", "weblink"];
  getImageByType(image: Image) {
    if (this.contentType[image.catergory] == "image") {
      return image.thumbnailUrl;
    }
    if (this.contentType[image.catergory] == "youtubevideo") {
      const final = image.thumbnailUrl;
      return final;
    }

    if (this.contentType[image.catergory] == "vimeovideo") {
      // const vimcode = image.imageUrl.replace("https://vimeo.com/", "");
      // console.log(vimcode);
      // setTimeout(async () => {
      //   await Axios.get(`http://vimeo.com/api/v2/video/${vimcode}.json`)
      //     .then((res) => {
      //       this.imageResult = res.data[0].thumbnail_large;
      //       console.log(this.imageResult);
      //     })
      //     .catch((err) => console.log(err));
      // }, 80);
      return image.thumbnailUrl;
    }
  }

  timeDifference(content: IContent): boolean {
    //console.log(content.createdOn);
    let isSame = false;
    const timeNow = moment(Date.now()).format("YYYY-MM-DD");
    const created = moment(content.createdOn).format("YYYY-MM-DD");
    //console.log(created + " " + timeNow);
    if (timeNow == created) {
      isSame = true;
    }
    // else {
    //   console.log("These are different");
    // }
    return isSame;
  }

  hasVoted(item: IContent): boolean {
    if (this.user) {
      if (item.upVotes.filter((v) => v.voteById == this.user.id).length) {
        return true;
      }
    }
    return false;
  }

  editCard(contentId: number) {
    console.log("in edit card");
    this.$emit("editThisCard", contentId);
  }

  expandThisCard(contentid: number, expand = false) {
    this.$emit("expandBox", contentid, expand);
    this.$emit("dark", true);
  }

  notice(): string {
    if (this.user) {
      return "Write a comment.";
    } else {
      return "Please join to comment.";
    }
  }

  get inFocus() {
    return this.text.message.length > 0;
  }

  textLengthLimit(): number {
    // const final = this.textMaxLength - this.text.message.length;
    const final = this.text.message.length;
    return final;
  }

  focusInput() {
    this.$refs.write.focus();
  }

  /// WIP ///
  editComment(comment: Comment, id: number) {
    this.onEdit = id;
    this.text.message = comment.message;
    this.text.id = comment.id;
    this.$refs.write.focus();
  }

  getCardsWithThisTag(tag: string) {
    this.$emit("getThisByTag", tag);
  }
  co = 0;
  submit(e: boolean) {
    this.co--;
    if (this.co == -1) {
      console.log("In submit!!!!" + this.co);
    }
  }

  updated() {
    console.log("updated!!!!");
  }

  handleClick(e) {
    if (e.target.matches(".play, .play *")) {
      console.log(
        "Got a click on .play-video or a child element " + e.target.text
      );
      const tagResult = e.target.text;
      const final = tagResult.replace("#", "");
      this.$emit("getThisByTag", final);
    }
  }
  mounted() {
    this.bus.$on("submit", this.submit);
    this.bus.$on("send", this.sendMessage);

    this.showCard = true;
    setTimeout(async () => {
      this.showCard = false;
    }, 100);
  }

  clearBox(item: IContent, comment: Comment) {
    item.replyBoxIsActive = false;
    console.log(comment.isReply);
  }
  awayComment(message: Comment) {
    message.isActive = false;
  }

  away(item: IContent) {
    Vue.prototype.y = false;
    item.tagIsActive = false;
    console.log("AWAY AWAY!!!!!");
    //console.log(Vue.prototype.tee);
  }

  toggleReplyBox(item: IContent, comment: Comment) {
    item.replyBoxIsActive = true;
    this.replyMessageBox = comment;
    this.$emit("replying", true);
    console.log(comment.isReply);
  }

  cancelEdit(text: IWriteComment) {
    this.text.message = "";
    this.text.id = -1;
    this.onEdit = 0;
  }

  test(item: IContent) {
    console.log("TAGGER!!!" + Vue.prototype.y);
    if (this.comments[0].flaggedCommentMessages) {
      console.log("HI!!");
    } else {
      console.log("BYE!!");
    }

    Vue.prototype.y = !Vue.prototype.y;
    item.tagIsActive = Vue.prototype.y;
    console.log(item.tagIsActive);
    //this.$emit("changeTitle", "hi hi hi");
    console.log(this.$refs);
  }

  get isBtnDisabled() {
    return this.text.message === "" || this.text.message.length < 6;
  }

  commentCount = 0;
  getCount(avatarId = 0, contentId = 0) {
    setTimeout(async() => {
      this.commentCount = await contentService.GetCount(avatarId, contentId);
    },);
   
  }

  testtt() {
    const l = this.getCount(1);
    console.log("from lll - " + l.then(r => r))
  }

  // mounted() {
  //   this.content.comments.filter(x =>x.showItem = true)
  // }

  async sendMessage(content: IContent) {
    if (this.onEdit > 0) {
      console.log("in edit comment");
      let finalResult!: IWriteComment;
      if (this.text && this.text.message != "") {
        finalResult = this.text;
      }
      if (this.toSend && this.toSend.message != "") {
        finalResult = this.toSend;
      }
      const result = await contentService.updateMessage(
        finalResult,
        content.id,
        finalResult.id
      );
      if (result === 200) {
        console.log("Comment has been edited!");
        this.$emit("replying", false);
        this.$emit("commented", content.id);
      } else {
        console.log("Nothing has been done!!");
      }
    }

    if (this.onEdit === 0) {
      if (content.replyBoxIsActive) {
        console.log("DOES THIS WORK?");
        console.log("HA - " + this.repMessageBox + " and " + this.user);
        console.log("sending REPLY message!!");
        let finalMessage: IWriteComment = {
          message: "",
        };
        let finalReplyBox!: Comment;
        if (this.text && this.text.message != "") {
          this.text.isReply = true;
          this.text.avatarId = this.user.id;
          finalMessage = this.text;
          finalReplyBox = this.replyMessageBox;
        }
        if (this.toSend && this.toSend.message != "") {
          this.toSend.isReply = true;
          this.toSend.avatarId = this.user.id;
          finalMessage = this.toSend;
          finalReplyBox = this.repMessageBox;
        }

        console.log(
          "result for reply send: " +
            finalMessage.message +
            " content id: " +
            content.id +
            " " +
            finalReplyBox.id
        );

        await contentService
          .sendReplyMessage(finalMessage, content.id, finalReplyBox.id)
          .then((res) => {
            console.log(res);

            if (res.length > 0) {
              content.replyBoxIsActive = false;
              console.log("in there ya!!");
              this.$emit("replies", content.id);
            }
          });
      } else {
        if (
          (this.text && this.text.message !== "") ||
          (this.toSend && this.toSend.message !== "")
        ) {
          this.text.isReply = false;
          this.toSend.isReply = false;
          console.log("seding message!!!");
          this.text.avatarId = this.user.id;
          this.text.message !== ""
            ? await contentService.sendNewMessage(this.text, content.id)
            : this.toSend.message !== ""
            ? await contentService.sendNewMessage(this.toSend, content.id)
            : (content.replyBoxIsActive = false);
          this.$emit("commented", content.id);
          this.$emit("tagged");
        }
      }
    }
    this.text.message = "";
    this.text.id = -1;
    this.text.avatarId = 0;
    this.onEdit = 0;
    console.log(content.id);
  }

  deleteComment(contentId: number, id: number) {
    this.comment2Delete = {
      id: id,
      contentId: contentId,
    };
    this.$emit("changeTitle", this.comment2Delete);
    this.$emit("commented");
    this.$emit("tagged");
  }

  async addUpVode(id: number) {
    await contentService.addNewUpVote(id).catch((err) => {
      if (err.response) {
        console.log(err.response.status);
        if (err.response.status > 200) {
          console.log("Restarting..");
          this.$emit("restartApp");
        }
      }
    });
    // console.log(id);
    // console.log(
    //   this.content.upVotes?.filter((v) => v.voteById == this.user.id).length
    // );
    this.$emit("commented", id);
    this.$emit("tagged");

    // Add method changing css
  }

  async addLike(comment: Comment, contentId: number) {
    console.log("content id: " + contentId);
    await contentService.addLiketoComment(comment.id, contentId);
    console.log(`Comment ${comment.id} has been liked`);
    this.$emit("commented", contentId);
  }

  deleteCard(contentId: number) {
    console.log("before deleted cards " + this.deletedCard);
    this.$nextTick().then(() => {
      this.deletedCard = contentId;
    });

    console.log("after deleted cards " + this.deletedCard);

    setTimeout(async () => {
      this.$emit("deletecard", contentId);
    }, 500);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  font-family: "Roboto", sans-serif;
}

.card-wrapper {
  margin: 25px 10px auto;
  padding: 0px;
  width: 300px;
  height: 460px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 20px;
  background-color: rgb(231, 231, 231);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: inline-block;
  position: relative;
  z-index: 1;
  transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
}

.posted_by {
  position: absolute;
  background-color: #fff;
  height: 20px;
  margin: 5px 2%;
  padding: 3px;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.22);

  .posted_avatar {
    position: relative;
    width: 20px;
    height: 20px;
    padding: 0 2px;
    display: inline-block;
    justify-content: center;
    margin-right: 3px;
    border-radius: 3px;
  }

  .posted_name {
    position: relative;
    top: -5px;
    padding-right: 5px;
    color: rgb(51, 51, 51);
    font-weight: bold;
  }
}

.card_appears {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.card_disappears {
  transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.card_float {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.confirm_box {
  background-color: green;
  min-width: 40px;
  max-width: 180px;
  height: 40px;
  border-radius: 30px;
  position: absolute;
  top: 10px;
  left: 60px;
  display: flex;
  justify-content: center;
  z-index: 2;

  .expander {
    color: #fff;
    bottom: 5px;
    width: 100px;
    position: relative;
    padding: 0 10px;
  }

  .delete_card {
    background-color: rgb(237, 237, 237);
    width: 30px;
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    display: flex;
    justify-content: center;
    z-index: 3;
    cursor: pointer;
    transition: 0.3s;
  }
  .on_exapnd {
    width: 100px;
    opacity: 1;
    transition: 0.3s;
    transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }

  .on_colapse {
    width: 0px;
    opacity: 0;
    transition: 0.3s;
    transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
    padding: 0;
  }

  .confirm_tick {
    background-color: rgb(237, 237, 237);
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: 5px;
    right: 5px;
    display: flex;
    justify-content: center;
    transition: 0.3s;
    cursor: pointer;
  }

  .confirm_tick:hover {
    background-color: rgb(181, 181, 181);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .confirm_edit {
    background-color: #fff;
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }
  .confirm_edit:hover {
    background-color: rgb(181, 181, 181);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  img {
    margin-top: 5px;
    height: 20px;
  }
}

.delete_card:hover {
  background-color: rgb(181, 181, 181);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.doll {
  background-color: rgb(16, 184, 50);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  animation: pop 0.3s;
}
@keyframes pop {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.post_type {
  position: absolute;
  margin: -55px 84%;
  background-color: rgb(255, 255, 255);
  padding: 5px 20px 5px 10px;
  border-radius: 15px 0 0 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.55);
  display: flex;
  z-index: 2;

  img {
    width: 22px;
  }

  span {
    padding-left: 3px;
    font-weight: bold;
  }
}

.post_blog {
  background-color: rgb(86, 211, 86);
}

.post_image {
  background-color: rgb(226, 112, 112);
}

.card-title {
  font-size: 1em;
  background-color: rgb(238, 238, 238);
  padding: 10px;
  margin: 0px 10px;
  max-width: 155px;
  min-height: 40px;
  position: absolute;
  border-radius: 15px;
  bottom: 130px;
  left: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  z-index: 3;
  display: inline-block;
  white-space: normal;

  .posted-on {
    padding: 5px 0px;
    font-size: 0.8em;
  }
}
// tag-and-flag section --------------------------------->
.tag-and-flag {
  position: absolute;
  background-color: rgb(252, 252, 252);
  right: 15px;
  width: 80px;
  height: 35px;
  bottom: 140px;
  display: flex;
  border-radius: 50px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  z-index: 1;

  .tagging {
    width: 20px;
    cursor: pointer;

    img {
      width: 25px;
    }
  }

  .flagging {
    display: flex;
    margin-top: 8px;

    .view_icon {
      width: 30px;
      padding-left: 3px;
    }

    .view_count {
      position: absolute;
      background-color: #fff;
      border-radius: 9px;
      border: 2px solid black;
      font-size: 0.8em;
      font-weight: bold;
      margin: -7px 8px;
      padding: 0 3px 0 3px;
    }
  }
  .tagflag-icon {
    width: 50px;
    height: 50px;
  }

  .tagflag-divider {
    margin: 5px auto;
    background-color: rgb(66, 66, 66);
    height: 25px;
    width: 2px;
    border-radius: 2px;
  }

  .tag_count {
    position: absolute;
    background: rgb(226, 226, 226);
    min-width: 15px;
    height: 15px;
    top: 1px;
    left: 1px;
    border-radius: 10px;
    border: 2px solid black;
    font-size: 0.8em;
    font-weight: bold;
    display: inline-block;
    padding: 0 2px 0 2px;
  }
}
.tag_and_flag_icon {
  position: relative;
  padding: 9px;
  width: 50%;
}
// tag mouse area
.tags_box {
  position: absolute;
  min-width: 100px;
  min-height: 80px;
  z-index: 3;
  right: 20px;
  margin-top: -60px;
}
.tags_options::after {
  content: " ";
  background-color: rgb(187, 255, 0);
  width: 10px;
  height: 10px;
  position: absolute;
  transform: rotate(45deg);
  bottom: -55px;
  right: 35px;
}

.tag_options {
  position: absolute;
  background-color: rgb(223, 223, 223);
  min-width: 50px;
  min-height: 40px;
  max-height: 140px;
  right: 25px;
  border-radius: 8px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  overflow: auto;
}

.tag_items {
  font-size: 0.8em;
  min-width: 40px;
  height: 25px;
  background-color: rgb(0, 106, 0);
  color: white;
  margin: 8px 5px;
  padding: 6px 6px 0px;
  border-radius: 3px;
  transition: 0.5;
}
.tag_items:hover {
  background-color: rgb(0, 175, 0);
  transform: scale(1.2);
  cursor: pointer;
}

// end of section ---------------------------------------->
.card-image {
  background-color: rgb(255, 255, 255);
  margin: 0 auto;
  border-radius: 20px;
  width: 300px;
  height: 300px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  display: flex;
  overflow: hidden;

  .card-image-wrapper {
    display: flex;
    overflow: hidden;

    .blog_caption {
      position: absolute;
      width: 100%;
      height: 150px;
      bottom: 160px;
      border-radius: 0 0 20px 20px;
      overflow: hidden;
    }

    .blog_caption_bg {
      background: linear-gradient(
        0deg,
        rgb(0, 0, 0) 47%,
        rgba(0, 0, 0, 0.8) 72%,
        rgba(255, 255, 255, 0) 100%
      );
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }

    .blog_caption_text {
      position: absolute;
      color: rgb(255, 255, 255);
      top: 15px;
      left: 8px;
      width: 95%;
      height: 60px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .image_count {
      position: absolute;
      margin: 30px 42%;
      background-color: rgb(41, 41, 41);
      color: white;
      padding: 3px 10px;
      border-radius: 16px;
      opacity: 0.65;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
      display: flex;

      img {
        width: 20px;
      }
    }

    .new_tag {
      position: absolute;
      top: -9px;
      left: -13px;
      width: 65px;
      height: 65px;
      display: flex;
      justify-content: center;
      z-index: 3;
      animation: rotateit 3s linear 2;

      img {
        filter: drop-shadow(0px 0px 10px #f86f6f);
      }

      @keyframes rotateit {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }

    .card-image-inside {
      width: 100%;
      height: 100%;
      //border-radius: 20px;
      object-fit: cover;
      object-position: 50% 0;
      z-index: 1;
    }
    .play_icon {
      position: absolute;
      background-color: rgb(39, 39, 39);
      margin: -50% 10%;
      z-index: 1;
      padding: 5px;
      border-radius: 5px;
      opacity: 0.7;
    }

    .new_label {
      position: absolute;
      margin-top: 13px;
      margin-left: 1px;
      color: white;
      transform: rotate(-35deg);
      font-size: 1em;
      font-weight: bold;
      filter: drop-shadow(0px 1px 3px #181818);
      z-index: 3;
    }
  }

  .no_image {
    background-color: #fff;
    margin: auto auto;
  }

  .expand_overlay_container {
    position: absolute;
    z-index: 1;
    top: 0;
    display: block;
    justify-content: center;

    .overlay_wrapper {
      background-color: #fff;
      width: 300px;
      height: 300px;
      border-radius: 20px;
      opacity: 0;
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }
  }
  .overlay_expand_icon {
    position: absolute;
    top: 20%;
    right: 32%;
    opacity: 0;
    z-index: 2;
    transition: 0.2s ease-in-out;
    cursor: pointer;

    img {
      width: 80px;
    }

    p {
      padding: 0;
      font-weight: bold;
      font-size: 1.2em;
      color: black;
    }
  }

  .upvotes-circle {
    background-color: rgb(218, 218, 218);
    height: 50px;
    width: 50px;
    position: absolute;
    right: 0px;
    top: 0px;
    margin: 10px;
    border-radius: 50px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    z-index: 1;
    transition-duration: 0.3s;
    cursor: pointer;

    .vote-text {
      position: relative;
      font-size: 0.8em;
      top: 2px;
    }

    .voted_on {
      background-color: red;
    }

    .upvote_icon {
      width: 35%;
      position: relative;
      bottom: 2px;
    }
    .vote_count {
      position: relative;
      font-weight: bold;
      top: 5px;
    }
  }
  .upvotes-circle:hover {
    background-color: #3f3f3f;
    color: white;
  }

  .upvotes-circle:active {
    transform: scale(0.9);
  }
  #circle {
    background-color: red;
  }

  .voting {
    background-color: rgb(53, 168, 42);
    color: white;

    &:hover {
      background-color: rgb(36, 112, 29);
    }
  }
}

.little_label {
  float: right;
  visibility: hidden;
  opacity: 0;
  margin-right: 120px;
  margin-top: 5px;
}

.show_label {
  visibility: visible;
  opacity: 1;
}

.card-image:hover .overlay_wrapper {
  opacity: 0.5;
}
.card-image:hover .overlay_expand_icon {
  opacity: 1;
}

.divider {
  border-top: 2px solid rgb(90, 90, 90);
  border-radius: 2px;
}

// comment section --------------------------->
.comment-warpper {
  position: relative;
  border: none;
  overflow: scroll;
  margin: 20px auto;
  width: 255px;
  height: 130px;
  bottom: 20px;
  right: 10px;
  scroll-behavior: smooth;

  .comment_flag {
    position: absolute;
    width: 15px;
    height: 15px;
    right: 3px;
    bottom: 3px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    cursor: pointer;

    img {
      opacity: 0.6;
      width: 85%;
    }
  }

  .comment_block {
    background-color: rgb(46, 46, 46);
    position: relative;
    margin: 45px auto;
    margin-bottom: 15px;
    width: 225px;
    height: auto;
    left: 10px;
    //bottom: 130px;
    border-radius: 8px;

    .flagged_comment {
      padding: 1px;
      color: white;
    }

    .flag_icon {
      float: right;
      img {
        margin-top: 5px;
        margin-right: 3px;

        width: 25px;
      }
      .view_comment {
        background-color: rgb(255, 35, 35);
        color: rgb(255, 255, 255);
        font-size: 0.8em;
        margin-right: 2px;
        padding: 0 5px;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    // comment mouse area
    .comment_option_area {
      position: absolute;
      width: 45px;
      height: 50px;
      right: 5px;
      bottom: 10px;
    }
    .comment_options img {
      position: absolute;
      height: 12px;
      right: 5px;
      bottom: 15px;
      cursor: pointer;
      display: inline-block;
      justify-content: center;
    }

    .close_comment_icon {
      cursor: pointer;
      img {
        position: relative;
        width: 20px;
        right: 0;
        bottom: 0;
        padding: 0;
      }
    }

    .edit_comment_icon {
      cursor: pointer;
      img {
        position: relative;
        width: 20px;
        left: 0;
        bottom: 0;
        padding: 0;
      }
    }

    .popuptext {
      position: absolute;
      background-color: rgb(243, 243, 243);
      bottom: 30px;
      height: 20px;
      width: 50px;
      border-radius: 3px;
      right: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      z-index: 3;
    }
    .popuptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 90%;
      margin-left: -5px;
      border-style: solid;
      border-color: rgb(243, 243, 243) transparent transparent transparent;
    }

    // ---> comment text
    .text_area {
      color: rgb(233, 233, 233);
      font-size: 0.75em;
      width: 80%;
      min-height: 20px;
      height: auto;
      position: relative;
      left: 15px;
      text-align: left;
      white-space: pre-wrap;

      p {
        margin: 0;
        padding: 15px 0;
      }

      .trim_top {
        margin: 0;
        padding: 2px 0 8px 0;
      }

      .flagged_paragraph {
        padding: 2px 0;
      }
    }
    .text_area_flagged {
      text-align: center;
      overflow: hidden;
      bottom: 5px;
      left: 5px;
    }

    .view_flagged_comment {
      background-color: #fff;
      color: black;
      padding: 0 5px;
      border-radius: 8px;
    }
    // ---> reply
    .reply_indicator {
      background-color: rgb(15, 102, 15);
      border-radius: 5px;
      position: relative;
      min-height: 12px;
      min-width: 105px;
      max-width: 182px;
      top: 3px;
      left: 20px;
      display: inline-block;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .text {
        padding: 0px 5px;
        //font-weight: bold;
        color: rgb(230, 230, 230);
        font-size: 0.6em;
      }
    }

    .reply_strip {
      background-color: rgb(26, 26, 26);
      border-radius: 4px;
      height: auto;
      padding: 0 5px;
    }

    // posted on date for comment
    .posted_on_comment p {
      position: absolute;
      color: rgb(8, 8, 8);
      font-size: 0.7em;
      bottom: -23px;
    }
  }

  .flagged_comment_back {
    background-color: rgb(201, 0, 0);
    padding: 5px 0;
  }
  // ---> avatar icon for comment block
  .avatar_circle {
    position: absolute;
    background-color: rgb(136, 136, 136);
    width: 30px;
    height: 30px;
    border-radius: 10px;
    margin-top: 0px;
    left: 0px;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.25);
    z-index: 1;
    img {
      width: 30px;
      margin-top: -10px;
      filter: drop-shadow(0 0 0.2rem rgb(38, 38, 38));
    }
  }
}

.view_all {
  position: relative;
  font-size: 0.7em;
  right: 30px;
  color: green;
  cursor: pointer;
}

.no_comment {
  background-color: rgb(240, 240, 240);
  width: 170px;
  height: 40px;
  margin: 35px auto;
  display: inline-block;
  justify-content: center;
  white-space: normal;
  padding: 7px 5px 3px 5px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);

  span:nth-child(1) {
    font-weight: bold;
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  transition: 0.2s;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(82, 82, 82);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(138, 51, 51);
}

::-webkit-scrollbar-track:hover {
  background-color: #fff;
}

.like_area {
  position: absolute;
  background-color: rgb(252, 252, 252);
  width: 60px;
  height: 20px;
  border-radius: 50px;
  right: 5px;
  bottom: -22px;
  display: flex;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
}

.likes_count {
  background-color: rgb(247, 247, 247);
  position: absolute;
  min-width: 20px;
  height: 15px;
  border-radius: 10px;
  top: 10px;
  left: -10px;
  border: 2px solid rgb(48, 48, 48);
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  padding: 1px;
}

.like_area :hover {
  animation: 0.5s pop_out;
  transform: scale(1.2);
  transition-duration: 0.3s;
  cursor: pointer;
}

.like_area :active {
  transform: scale(0.9);
}

@keyframes pop_out {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1.2);
  }
}

.like_area_icons {
  position: relative;
  padding: 7px;
  width: 50%;
  left: 2px;
}

.like_divider {
  position: relative;
  background-color: black;
  width: 1px;
  height: 20px;
  left: 2px;
}

.like_area img {
  position: relative;
  width: 14px;
  height: 14px;
  bottom: 7px;
  right: 1px;
  bottom: 5px;
}

.comment_response_message {
  background-color: gray;
  position: absolute;
  height: 40px;
  width: 100%;
  bottom: 35px;
}

.comment_response_message p {
  background-color: red;
  height: 30px;
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  position: absolute;
  bottom: -10px;
  left: 5px;
}

// comment count box ------->

.close_box {
  background-color: red;
  position: absolute;
  top: 5px;
  right: 5px;
}

.comment_count_box {
  position: absolute;
  background-color: rgb(228, 228, 228);
  width: 25px;
  height: 60px;
  right: 2px;
  bottom: 55px;
  border-radius: 20px;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.25);
  .comment_box {
    font-weight: bold;
    width: 33px;
    height: 15px;
    position: relative;
    top: 8px;
    right: 5px;
  }
}

.write_comment_area {
  position: absolute;
  margin: 0 auto 0 20px;
  bottom: 5px;
  width: 87%;
  height: 40px;
  padding: 2px;
  z-index: 1;

  .avatar_circle_icon {
    position: absolute;
    background-color: rgb(70, 70, 70);
    width: 25px;
    height: 25px;
    border-radius: 8px;
    top: 15px;

    .avatar_profile {
      img {
        width: 30px;
        margin-top: -10px;
        filter: drop-shadow(0 0 0.2rem rgb(38, 38, 38));
      }
    }
  }

  input[type="text"] {
    position: absolute;
    border: none;
    width: 75%;
    height: 30px;
    box-sizing: border-box;
    padding: 15px;
    border-bottom: 2px solid red;
    background: none;
    left: 30px;
    bottom: 0px;
  }

  input:focus {
    outline: none;
    border-bottom: 2px solid green;
  }

  .send_btn {
    position: absolute;
    width: 40px;
    height: 30px;
    right: 0px;
    bottom: 0px;
    opacity: 0.6;
    cursor: pointer;
  }

  .reply_box {
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 110px;
    height: 30px;
    left: 70px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.25);
    bottom: 30px;
    border: 3px solid rgb(184, 0, 0);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    font-size: 1.4em;
    color: black;
    padding: 0 4px;
    cursor: pointer;
    transition: 0.2s;

    span {
      margin: 5px 0;
      font-size: 0.7em;
      padding: 0 2px;
    }
  }

  .max_text_count {
    background-color: rgb(242, 242, 242);
    width: 40px;
    height: 20px;
    border-radius: 15px;
    border: 2px solid rgb(58, 58, 58);
    padding: 5px 20px 0 10px;
    margin: -20px -10px;
    font-size: 0.8em;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25);
  }

  .reply_box:hover {
    background-color: rgb(228, 0, 0);
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.25);
    color: white;
  }

  .reply_box:active {
    background-color: rgb(124, 0, 0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  }
}

// ------------------------------>
</style>
