<template>
  <div class="content-container">
    <action-bar
      :key="actionOn"
      class="action_bar"
      @goto="goTo"
      @darken="dark"
      :avatar="avatar"
      :unregGuest="unregGuest"
      :guest="guest"
      :anon="anon"
      @enableThisGuest="enableThisGuest"
      @enableAvatar="runAvatar"
      :options="options"
      :justIp="justIp"
      :hideBars="hideBars"
      @sendAlert="alertFromActionBar"
      :logIn="logIn"
    ></action-bar>
    <div class="bgMain" :class="{ bgE: showBg, bgL: !showBg }"></div>
    <div v-show="isDarkend" class="bg"></div>
    <div v-if="showCardBox || isBlogActive" class="bg"></div>
    <settings-bar
      class="settings_bar"
      :settingsAvatar="avatar"
      :comments="comments"
      :posts="gallery"
      @typeSearch="addTypeSearch"
    />

    <div class="member_container">
      <membership-box
        class="member_box"
        :key="member"
        :isIntro="isIntro"
        :justIp="justIp"
        @darkenThis="introIsActive"
        @enableAvatar="runAvatar"
        :avatar="avatar"
        :noUser="noUser"
        :guest="guest"
        :options="options"
        @enableThisGuest="enableThisGuestf"
        :users="users"
        @logInIt="logInHere"
        @checkForGuest="getGuest"
      />
    </div>

    <div
      class="message_box"
      :class="{
        on_appear: messageBox.isActive,
        on_disappear: !messageBox.isActive,
      }"
    >
      <div class="close">
        <img @click="closeBox" src="@/assets/SVG/close.svg" alt="#" />
      </div>

      <!-- <div class="close_box" ><img @click="closeBox" src="@/assets/SVG/close.svg" alt="" /></div> -->
      <div class="message_container">
        <p class="message_title">{{ messageBox.title }}</p>
        <p class="message_text">{{ messageBox.message }}</p>
        <div class="message_buttons">
          <j-button label="Yes" @pressed="confirm" />
          <j-button label="No" @click.native="decline" />
        </div>
      </div>
    </div>
    <div v-show="messageBox.isActive || !showBox" class="bg"></div>

    <!-- v-if="wording.length" -->

    <div
      class="gallery-box"
      @mouseenter="shiftUp(true)"
      @mouseleave="shiftUp(false)"
      :class="{ shrink_box: galleryShrunk }"
    >
      <div class="anchor" id="home"></div>
      <div class="first-box" :class="{ shrink_first: galleryShrunk }">
        <div class="logo_content_wrapper">
          <div class="invisible_bar"></div>
          <div
            class="logo_container"
            :class="{ shrink_logo: galleryShrunk, on_hover: shiftItems }"
          >
            <img class="logo" src="@/assets/SVG/logo.svg" alt="" />
          </div>
          <div
            class="links_to_profiles"
            :class="{ shift_profile: galleryShrunk, on_enter: shiftItems }"
          >
            <ul class="links">
              <li>
                <a href="https://www.linkedin.com/in/headbush/" target="_blank">
                  <img
                    class="little_icon"
                    src="@/assets/social/linkedin.png"
                    alt=""
                  />
                  <div>LinkedIn</div>
                </a>
              </li>
              <li>
                <a href="https://github.com/crystalClearSky" target="_blank">
                  <img
                    class="little_icon"
                    src="@/assets/social/github.png"
                    alt=""
                  />
                  <div>GitHub</div>
                </a>
              </li>
              <li>
                <a href="https://motionact.artstation.com/" target="_blank">
                  <img
                    class="little_icon"
                    src="@/assets/social/artstation.png"
                    alt=""
                  />
                  <div>{{ userInfo }}</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="anchor" id="gallery"></div>
    <div class="gallery-box">
      <div v-if="query.length" class="tag_title">
        <p>{{ query }}</p>
      </div>
      <div class="search_section">
        <div class="search_bar_section">
          <input
            type="text"
            placeholder="Search..."
            v-model="query"
            v-on:keydown.enter="getResult"
          />
          <div class="search_button" @click="getResult"><p>Search</p></div>
          <div class="reset_search" @click="getByTag('', -1)">
            <img src="@/assets/SVG/refresh.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="search_type">
        <div class="type_select" @click="isTypeSearch = !isTypeSearch">
          <img
            :src="
              require('../assets/SVG/' +
                searchType[contentSelectionHover] +
                '.svg')
            "
            alt=""
          />
        </div>
        <div v-if="isTypeSearch" @mouseleave="typeSearchLeave()">
          <div
            class="type"
            v-for="(type, index) in searchType"
            :key="index"
            :class="{ type_hover: index == contentSelectionHover }"
            @mouseover="contentSelectionHover = index"
            @click="typeChoice(index)"
          >
            <img :src="require('../assets/SVG/' + type + '.svg')" alt="" />
          </div>
        </div>
      </div>
      <!-- v-if="showCardBox && post" -->
      <!--- card box start ------->
      <div
        v-if="post.id"
        ref="cardTop"
        id="cardFocus"
        class="card_focus"
        :class="{
          card_focused: showCardBox,
          card_leave: !showCardBox,
          card_blog: post.postType == 1,
        }"
      >
        <div class="close_box">
          <span @click="closeCard" class="close_span"
            ><label
              >Close<svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 14 14"
              >
                <path
                  id="ic_close_24px"
                  d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
                  transform="translate(-5 -5)"
                  fill="white"
                /></svg></label
          ></span>
          <span @click="upVote(post)" class="vote_span" :class="{ voted: vote }"
            ><label
              >Vote<svg
                xmlns="http://www.w3.org/2000/svg"
                width="25.103"
                height="15.48"
                viewBox="0 0 25.103 15.48"
              >
                <path
                  id="arrowUp"
                  d="M0,22.175l9.623-9.623L0,2.929,2.929,0,15.48,12.552,2.929,25.1Z"
                  transform="translate(0 15.48) rotate(-90)"
                  fill="white"
                /></svg
              >{{ post.upVotes.length }}</label
            ><img src="" alt=""
          /></span>
        </div>
        <div class="blog_outer_container">
          <div v-show="post.postType == 1" class="blog_wrapper">
            <div
              class="blog_wrapper_box"
              @click="(commentBox = !commentBox), extendTimeLoggedIn()"
            >
              <div class="title">
                <h1>{{ post.title }}</h1>
              </div>
              <div class="blog_banner_spacing"></div>
              <div class="blog_banner">
                <img :src="post.images[0].thumbnailUrl" alt="" />
              </div>
              <h3>{{ post.description }}</h3>
              <div class="blog_avatar_area">
                <span class="blog_avatar_icon"
                  ><img src="@/assets/SVG/face.svg" alt="" /></span
                ><span class="blog_avatar_name">Justice</span>
              </div>
              <div class="blog_published">
                Published: {{ post.createdOn | byDate }}
              </div>
              <div v-show="compareTime(post)" class="blog_updated">
                Updated: {{ post.updatedOn | byDate }}
              </div>
              <div
                v-if="post.postType == 1"
                class="blog_post_content"
                style="white-space: pre-line"
                v-html="postContentFilter(post.content)"
              ></div>
            </div>
          </div>
        </div>
        <div v-show="post.postType == 0" class="post_gallery">
          <div v-for="image in post.images" :key="image.id">
            <div
              v-show="contentType[image.catergory] == 'image'"
              @click="goToLink(image)"
              class="expand_image"
            >
              <img src="@/assets/SVG/expand.svg" alt="" />
            </div>
            <div
              @click="(commentBox = !commentBox), extendTimeLoggedIn()"
              class="fill"
              v-html="getImageByType(image)"
              alt=""
            ></div>
            <div class="image_message">{{ image.quickDescription }}</div>
          </div>
        </div>
        <!-- <div v-show="!commentBox" class="bottom"></div> -->
        <br />

        <div @click="commentBox = !commentBox" class="comment_visibility">
          <img
            class="opened_eye"
            v-show="commentBox"
            src="@/assets/SVG/eye_view.svg"
            alt=""
          />
          <img
            class="closed_eye"
            v-show="!commentBox"
            src="@/assets/SVG/eye_hide.svg"
            alt=""
          />
        </div>

        <div
          v-if="!commentBox"
          class="caption_area"
          :class="{ caption_expand_area: expandCaption }"
        >
          <div
            @click="(expandCaption = !expandCaption), extendTimeLoggedIn()"
            class="toggle_box"
            :class="{ toggle_box_active: expandCaption }"
          ></div>

          <!--- Title ------>
          <div class="card_title">
            <p class="title">{{ post.title }}</p>
            <div class="title-divider"></div>
            <p class="posted_on">Posted: {{ post.createdOn | humanize }}</p>
          </div>
          <!---- Description ----->
          <div class="card_decription">
            <span>{{ post.description }}</span>
          </div>

          <div class="views_caption">
            <span
              ><img src="@/assets/SVG/eye.svg" alt="" />
              <span>{{ post.views.length }}</span></span
            >

            <span
              ><img src="@/assets/SVG/tag.svg" alt="" />
              <span>{{ post.tags.length }}</span></span
            >
          </div>

          <div class="comment_count">
            <span>
              <img class="comment_icon" src="@/assets/comment.png" alt="" />
              | </span
            ><span>{{ post.comments.length }}</span>
          </div>
          <!--- comment section ------------>
          <div class="comment_section">
            <div v-if="post">
              <div v-if="post.comments.length">
                <div v-for="(comment, index) in postComments" :key="index">
                  <div class="comment_avatar_image">
                    <img
                      class="user_profile"
                      :src="
                        require('../assets/avatar/' +
                          users[comment.avatarId - 1].avatarImgUrl)
                      "
                      alt=""
                    />
                    <div v-if="avatar">
                      <div
                        v-if="
                          comment.avatarId == avatar.id || avatar.id == true
                        "
                        class="edit_box"
                      >
                        <span
                          ><img
                            class="create"
                            src="@/assets/SVG/create.svg"
                            alt=""
                            @click="editComment(comment, post.id)" />
                          |
                          <img
                            class="bin"
                            src="@/assets/SVG/delete_bin.svg"
                            alt=""
                            @click="deleteComment(post.id, comment.id)"
                        /></span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="comment_box"
                    :class="{
                      comment_appears: deletedComment == comment.id,
                      comment_disappears: deletedComment == comment.id,
                      user_comment_box: avatar
                        ? avatar.id == comment.avatarId
                        : false,
                    }"
                  >
                    <div v-if="comment.replyTo" class="reply_caption">
                      <span class="name"
                        >{{ users[comment.responseToAvatarId - 1].name }} </span
                      ><span
                        >|
                        {{
                          comments[comment.replyToCommentId - 1].message
                        }}</span
                      >
                    </div>
                    <div></div>
                    <!-- <br> <img src="http://25.media.tumblr.com/b577feb75eb946edc48bfd68d9f2246f/tumblr_mhgloqjcGY1rbrys3o1_500.gif" alt=""><br> sfsdf -->
                    <span
                      class="message"
                      @click="handleClick"
                      v-html="linkHashInComment(comment)"
                    ></span>
                    <!-- <div class="image_caption" v-html="getHtmlContent()"></div> -->
                  </div>
                  <div class="posted_on">
                    Posted: {{ comment.postedOn | humanize }}
                  </div>
                  <div class="like_reply_area">
                    <span
                      ><img
                        class="like_icons"
                        src="@/assets/SVG/reply.svg"
                        alt=""
                        @click="focusInput(), toggleReplyBox(post, comment)"
                    /></span>
                    |
                    <span
                      ><img
                        @click="addLike(comment, post.id, post)"
                        class="like_icons"
                        src="@/assets/like_heart.png"
                        alt=""
                      />
                      {{ comment.likes.length }}</span
                    >
                  </div>
                </div>
              </div>
              <div
                v-else
                class="no_comments"
                :class="{ no_comments_on_expand: expandCaption }"
              >
                <h2>No comments found.</h2>
                <p>Be the first to comment.</p>
              </div>
            </div>
          </div>
          <!-- write message section --->
          <div v-if="post.replyBoxIsActive" class="comment_response_message">
            <p>{{ replyMessageBox.message }}</p>
            <div @click="clearBox(post, comment)" class="cancel_container">
              <img src="@/assets/SVG/close.svg" alt="" />
            </div>
          </div>
          <div
            v-if="post.id === onEdit"
            @click="cancelEditing"
            class="cancel_box"
          >
            Cancel
          </div>
          <div class="write_comment_area">
            <span class="avatar_profile"
              ><span v-if="avatar">
                <img
                  v-if="avatar.isCheckedIn"
                  :src="require('../assets/avatar/' + avatar.avatarImgUrl)"
                  alt=""
                />
                <img
                  v-else
                  style="backgroundcolor: white; borderradius: 50%; width: 30px"
                  src="@/assets/SVG/face.svg"
                  alt=""
                />
              </span>
              <img
                v-else
                style="
                  filter: drop-shadow(0 0 0.15rem white);
                  width: 35px;
                  margin: -2px -2px;
                "
                src="@/assets/SVG/new_user.svg"
                alt=""
              />
            </span>
            <input
              type="text"
              v-model="text.message"
              :placeholder="notice()"
              :disabled="!avatar"
              v-on:keydown.enter="sendMessage(post)"
              maxlength="250"
              ref="write"
              @blur="cancelEdit()"
            />
            <button
              class="send_button"
              :disabled="!avatar"
              @click.prevent="submit(post.id)"
            >
              <img src="@/assets/SVG/send.svg" alt="" />
            </button>
            <div @click="moreComments(post.id)" class="more_comments">
              <img src="@/assets/SVG/arrowUp.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="tags_section">
        <!-- :class="{hide_bar: outoftags}" @mouseenter="outoftags = false" @mouseleave="outoftags = true" -->
        <ul>
          <li v-for="(tag, index) in tags" :key="index">
            <div class="tag_number">{{ tag.cardsWithThisId }}</div>
            <div
              :id="tag.tagItem"
              class="tag_item"
              :class="{ current: index == current }"
              @click="getByTag(tag.tagItem, index)"
            >
              #{{ tag.tagItem }}
            </div>
          </li>
        </ul>
        <div class="tags_arrow" @click="scrollToLeft()">
          <img
            class="arrow"
            :class="{ flip_arrow: isScrolled }"
            src="@/assets/SVG/arrow_forward.svg"
            alt=""
          />
        </div>
      </div>
      <div v-show="showArrow" class="card_arrow_container">
        <div @click="scrollCardLeft" class="card_arrow">
          <svg
            :class="{ roatate_arrow: !isCardScrolled }"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 16 16"
          >
            <path
              id="ic_arrow_forward_24px"
              d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z"
              transform="translate(-4 -4)"
            />
          </svg>
        </div>
      </div>
      <div
        class="more"
        :class="{
          enter_more: !isCardScrolled || endOfListReached,
          leave_more: isCardScrolled || endOfListReached,
        }"
        @click="More()"
      >
        <img src="@/assets/SVG/next.svg" alt="" />
      </div>
      <!-- :class="{hide_scroll: outofbox}" @mouseenter="outofbox = false" @mouseleave="outofbox = true" -->
      <div
        class="card-background"
        id="card"
        ref="infoBox"
        @scroll="checkPosition"
      >
        <div v-if="users.length && gallery.length">
          <main-content
            :onEdit="onEdit"
            @editThisCard="editCard"
            :bus="bus"
            :toSend="text"
            :cardToSend="toSendCard"
            @getcurrentcard="getResult"
            @expandBox="expandCardBox"
            @tagged="getTags"
            @getThisByTag="getByTag"
            @commented="getAllCards"
            @replies="check"
            @deletecard="deleteThisCard"
            @changeTitle="updateWord($event)"
            :content="card"
            v-for="(card, index) in gallery.slice(currentPosition, pageLength)"
            :key="index"
            :ind="index"
            :comments="comments"
            :allusers="users"
            :user="avatar"
            @flagged="flagComment"
            @replying="replyingStuff"
            @extendTime="extendTimeLoggedIn"
            :repMessageBox="replyMessageBox"
            @dark="disableBGScroll"
            @restartApp="restartApp"
          >
          </main-content>
          <!-- fixed content to main-content -->
        </div>
        <div class="empty_cards" v-else><span>No Content found!</span></div>
      </div>

      <flag-choice
        class="flag"
        :showflagBox="showflagBox"
        :selectedContent="selectedContent"
        @cancelFlag="cancelFlagged"
      />

      <div v-if="avatar && avatar.name === 'Justice'" class="control_block">
        <div
          v-if="avatar.name === 'Justice'"
          class="control_room"
          @click="checking"
        >
          <div class="round_btn">
            <img src="@/assets/SVG/add.svg" alt="" />
          </div>
        </div>
        <div
          v-if="avatar.name === 'Justice'"
          class="blog_btn"
          @click="(isBlogActive = true), (hideBars = true)"
        >
          <img src="@/assets/SVG/blog.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="blog_outer">
      <div
        class="blog_box"
        :class="{ blog_opened: isBlogActive, blog_closed: !isBlogActive }"
      >
        <div class="blog_header">{{ blogLabels[inCardEdit ? 1 : 0] }} Blog</div>
        <div
          class="blog_thumbnail"
          :class="{
            small_thumb: hasShrunk,
            thumb_view: !showPreviewbox,
            thumb_view_show: showPreviewbox,
          }"
        >
          <div
            class="thumb_visibility"
            v-show="isLoaded && hasShrunk"
            @click="hideImage = !hideImage"
          >
            {{ showSwitch[hideImage ? 1 : 0] }} Image
          </div>
          <div
            class="thumbnail_preview"
            :class="{ preview_shrink: !hideImage && isLoaded }"
          >
            <transition name="fade">
              <img
                :src="createImage.thumbnailUrl"
                v-show="isLoaded"
                alt=""
                @load="isLoaded = true"
              />
            </transition>
            <img v-show="!isLoaded" src="@/assets/no_image.png" alt="" />
          </div>
          <input
            v-show="!hasShrunk"
            type="text"
            placeholder="Paste Image Link"
            v-model="simpleMethod"
          />
          <j-button
            v-show="isLoaded && !hasShrunk"
            label="Add"
            @click.native="addAndShrink"
          />
        </div>
        <div
          @click="thumbBtnAction"
          class="thumb_btn"
          :class="{ thumb_btn_rotate: hasShrunk || showPreviewbox }"
        >
          <img
            v-show="!isLoaded"
            class="add"
            src="@/assets/SVG/add.svg"
            alt=""
          />
          <img
            v-show="isLoaded"
            class="bin"
            src="@/assets/SVG/delete_bin.svg"
            alt=""
          />
        </div>
        <transition name="fade">
          <div v-show="!showPreviewbox && !isLoaded" class="thumbnail_label">
            Add Thumbnail
          </div>
        </transition>
        <div class="blog_container">
          <div class="preview_box">
            <h1 @click="blogSelect(0)">{{ card.title }}</h1>
            <h3 @click="blogSelect(1)">{{ card.description }}</h3>
            <div
              style="white-space: pre-line"
              @click="blogSelect(2)"
              v-html="card.content"
            ></div>
          </div>
          <div
            class="input_type_container"
            :class="{ input_enter: showToolInput, input_leave: !showToolInput }"
          >
            <div
              class="input_type_area"
              v-if="showToolInput"
              @blur="showToolInput = false"
            >
              <input
                type="text"
                ref="tool"
                :placeholder="displayTool"
                v-model="toolItem"
              />
              <button @click="addContentToText">Add</button>
              <span class="close_tool" @click="showToolInput = false"
                ><img src="@/assets/SVG/close.svg" alt=""
              /></span>
            </div>
          </div>
          <div class="tool_box">
            <div>
              <input
                type="text"
                maxlength="10"
                placeholder="Add Tag"
                v-model="createTag.tagItem"
                v-on:keydown.enter="addTagInput"
              />
            </div>
            <div class="tool_btn">
              <div v-for="(tag, index) in tagsList" :key="index">
                <div class="tool_tag">
                  {{ tag.tagItem }}
                  <span class="remove_tag" @click="removeTag(index)">
                    <img src="@/assets/SVG/close.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="blog_entry">
            <span class="blog_avatar">x</span>
            <textarea
              type="text"
              ref="blogInput"
              :placeholder="blogInputPlaceholder"
              v-model="blogEntry"
            />
            <button @click="nextStep()">next</button>
            <j-button label="Clear" @click.native="clearBlog" />
            <j-button label="Post" @click.native="addCard()" />
            <j-button label="Cancel" @click.native="closeBlog" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="avatar">
      <div v-show="avatar.name === 'Justice'">
        <div
          class="control_box"
          :class="{ on_appear: !showBox, on_disappear: showBox }"
        >
          <div class="control_box_container">
            <error-message
              v-show="isError"
              label="Image already exists!"
            ></error-message>
            <div class="edit_icon_area" v-show="inCardEdit">
              <div class="edit_icon">
                <img src="@/assets/SVG/create.svg" alt="" />
              </div>
              <span>In Edit</span>
            </div>
            <div class="image_collection">
              <div v-for="(image, index) in imageList" :key="index">
                <div class="image_box">
                  <div class="remove_image" @click="removeImage(index)">
                    <img src="@/assets/SVG/close.svg" alt="" />
                  </div>
                  <img class="image_in_box" :src="image.thumbnailUrl" alt="" />
                  <div
                    class="indicator"
                    :class="{ 'indicator-editing': currentImageIndex == index }"
                    @click="editImage(index)"
                  >
                    <img src="@/assets/SVG/create.svg" alt="" />
                  </div>
                  <div
                    v-show="image.quickDescription"
                    class="description_indicator"
                  >
                    notes
                  </div>
                </div>
              </div>
            </div>
            <div class="pic_box">
              <transition name="fade">
                <img
                  :src="createImage.thumbnailUrl"
                  v-show="isLoaded"
                  alt=""
                  @load="isLoaded = true"
                />
              </transition>

              <div class="no_image" v-show="!isLoaded">
                <img src="@/assets/no_image.png" alt="" />
              </div>
            </div>
            <form class="input_area" autocomplete="on">
              <ul>
                <li>
                  <input
                    type="text"
                    placeholder="Image Description"
                    v-model="createImage.quickDescription"
                    minlength="10"
                    @change="tests"
                  />
                </li>
                <li>
                  <input
                    type="text"
                    placeholder="Paste Image Link"
                    v-model="simpleMethod"
                    minlength="10"
                    required
                    @change="tests"
                  />
                </li>
                <li>
                  <input
                    type="text"
                    placeholder="Title"
                    v-model="card.title"
                    minlength="10"
                    maxlength="40"
                    required
                  />
                </li>

                <li>
                  <input
                    type="text"
                    placeholder="Description"
                    maxlength="250"
                    v-model="card.description"
                    required
                  />
                </li>
                <li class="tag_input_area">
                  <input
                    type="text"
                    maxlength="10"
                    placeholder="Tag"
                    v-model="createTag.tagItem"
                    v-on:keydown.enter="addTagInput"
                  />
                  <div class="tag_list">
                    <div v-for="(tag, index) in tagsList" :key="index">
                      <div class="tag">
                        {{ tag.tagItem }}
                        <div class="remove_tag" @click="removeTag(index)">
                          <img src="@/assets/SVG/close.svg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tag_button" @click="addTagInput">add tag</div>
                </li>
              </ul>
              <div class="btn_group">
                <j-button :label="changeLabel" @click.native="addCard()" />
                <j-button label="Cancel" @click.native="checking" />
                <j-button label="Add Image" @click.native="addImage" />
                <input
                  type="file"
                  label="Upload Image"
                  @change="onFileChange"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="gallery-box">
      <button class="test_button" @click.once="tests">Test1</button>
      <div class="anchor" id="contact"></div>
      <div class="contact_title"><p>Contact Me</p></div>
      <div class="card-background">
        <contact />
      </div>
      <!-- <button @click="tested">Press</button>
      <button @click="tested2">Press</button> -->
    </div>
    <div class="gallery-box">
      <div class="anchor" id="about"></div>
    </div>
    <alert
      v-if="showAlert"
      class="alert_box"
      @closeAlert="closeAlert()"
      :alert="alertThis"
    />
    <mobile-action-bar
      class="mobile_navbar"
      @goto="goTo"
      :hideBars="hideBars"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { IContent, Comment, Tag, Image } from "@/types/Content";
import ContentService from "@/services/content-services";
import MainContent from "@/components/MainContent.vue";
import IAvatar from "@/types/Avatar";
import IMessageBox from "@/types/MessageBox";
import JButton from "@/components/JButton.vue";
import ICommentToDelete from "@/types/CommentToDelete";
import ICreateContent from "@/types/CreateContent";
import IWriteComment from "@/types/WriteComment";
import ActionBar from "@/components/ActionBar.vue";
import IImageCreate from "@/types/ImageCreate";
import ErrorMessage from "@/components/ErrorMessage.vue";
import $ from "jquery";
import ITag from "@/types/TagCreate";
import IUnregisteredGuest from "@/types/UnregisteredGuest";
import IAnon from "@/types/Anon";
import IGuest from "@/types/Guest";
import IOptions from "@/types/Options";
import ICreateAvatar from "@/types/createAvatar";
import ILogin from "@/types/Login";
import INewIp from "@/types/NewIp";
import MobileActionBar from "@/components/MobileActionBar.vue";
import Contact from "@/components/Contact.vue";
import FlagChoice from "@/components/FlagChoice.vue";
import IForFlagging from "@/types/ForFlagging";
import Axios from "axios";
import FilterService from "@/services/filter-service";
import Alert from "@/components/Alert.vue";
import IAlertBox from "@/types/AlertBox";
import SettingsBar from "@/components/SettingsBar.vue";
import MembershipBox from "@/components/MembershipBox.vue";
import IChapter from "@/types/Chapter";
import { UserMutations } from "@/store/user/mutations";

const contentService = new ContentService();
const filterService = new FilterService();

export enum Commands {
  None,
  Active,
}

@Component({
  name: "Content",
  components: {
    MainContent,
    JButton,
    ActionBar,
    ErrorMessage,
    MobileActionBar,
    Contact,
    FlagChoice,
    Alert,
    SettingsBar,
    MembershipBox,
  },
})
export default class Gallery extends Vue {
  // data
  gallery: IContent[] = [];
  additionGallery!: IContent[];
  avatar!: IAvatar;
  users: IAvatar[] = [];
  comments: Comment[] = [];
  tags: Tag[] = [];
  @Prop({ default: false }) isRefreshed!: boolean;
  @Prop({ default: false }) command!: boolean;
  // Add the above props to local data to avoid mutation
  @Prop({ required: false }) counters!: number;
  logIn!: ILogin;

  onEdit = 0;
  unregGuest!: IUnregisteredGuest;
  counter = false;
  showBg = false;
  galleryShrunk = false;

  card: ICreateContent = {
    title: "",
    description: "",
    images: [
      {
        imageUrl: "",
        quickDescription: "",
      },
    ],
    tags: [
      {
        tagItem: "",
      },
    ],
  };

  //@Watch('gallery')
  @Prop() messageBack!: string;
  @Prop({ default: 0 }) optionReturn!: number;
  //@Prop({default: null}) messageBox!: IMessageBox;

  // ---- Prop to Data --->
  isDarkend = false;
  toSendCard = -1;
  toSendMessage!: IWriteComment;

  actionOn = false;

  showAlert = false;
  inCardEdit = false;

  isBlogActive = false;

  imageList: IImageCreate[] = [];

  createImage: IImageCreate = {
    imageUrl: "",
    quickDescription: "",
    cardId: -1,
    thumbnailUrl: "",
  };

  createTag: ITag = {
    tagItem: "",
  };

  currentIP!: INewIp;

  guest!: IGuest;

  tagsList: ITag[] = [];

  isError = false;

  isLoaded = false;

  post: IContent = {};

  // user = this.avatar;
  // allUsers = this.users;
  // allComments = this.commments;
  // allTags = this.tags;

  // --------------------->

  controlVisible = false;

  text: IWriteComment = {
    id: -1,
    message: "",
  };

  alertThis: IAlertBox = {
    title: "",
    message: "",
    isActive: false,
  };

  anon!: IAnon;

  createBlog: ICreateContent = {
    title: "Add Title",
    description: "Add Description",
    content: "Add Content",
  };
  selectedtag = false;
  outofbox = true;
  outoftags = true;
  wording = "";
  showBox = true;
  isScrolled = false;

  showCardBox = false;
  commentBox = false;
  expandCaption = false;

  currentImageIndex = -1;

  renderComponent = true;
  inImageEdit = false;

  showArrow = false;

  enableGuest = false;

  showflagBox = false;

  blogLabels = ["Create", "Edit"];

  tagCount = 0;

  indexx = 0;

  outCome: any;

  @Watch("post")
  watchCommand() {
    console.log("In watching...");
  }

  // @Watch("gallery")
  // onChange(cards: IContent, user: IAvatar) {
  //   console.log("in watcher");
  //   console.log(cards);
  //   console.log(user);
  //   this.getAllCards;
  //   console.log("out of watcher");
  // }

  messageBox: IMessageBox = {
    title: "Default",
    message: "",
    isActive: false,
  };

  alreadyvoted = false;

  query = "";
  typeSearch = "";
  avatarId = -1;
  current = -1;
  tcount = 0;
  imageUrl = "";

  options!: IOptions;

  hideBars = false;

  isCardScrolled = true;

  endOfListReached = false;
  indicateScrollBack = false;

  optioni = false;

  vote: any;

  signInAvatar!: ILogin;

  justIp!: INewIp;

  selectedContent!: IForFlagging;

  isReplying = false;

  chapterCounter = 0;

  bus = new Vue();

  updateThisPost = -1;

  commentToDelete: ICommentToDelete = {
    id: 0,
    contentId: 0,
  };

  // ----------------- METHIDS --------------------->
  // computed properties
  shiftItems = false;
  shiftUp(res: boolean) {
    if (this.galleryShrunk) {
      this.shiftItems = res;
    }
  }

  addTypeSearch(e) {
    this.typeSearch = e;
    this.avatarId = this.avatar.id !== undefined ? this.avatar.id : -1;
    //alert(this.typeSearch + " " + this.avatarId);
    this.clearPart();
    this.getAllComments();
    this.getResult();
  }

  commentsPage = 1;
  commentsPageSize = 4;
  commentsSection: Comment[] = [];
  commentsPart: [Comment[]] = [[]];
  moreComments(id: number) {
    console.log("More Comments");
    this.commentsSection = [];
    setTimeout(async () => {
      this.commentsPage++;
      console.log("Comment page - " + this.commentsPage);
      const result = await contentService.getCommentsByCard(
        id,
        this.commentsPageSize,
        this.commentsPage
      );
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          this.commentsSection.push(result[i]);
        }
        this.commentsSection.length
          ? this.commentsPart.push(this.commentsSection)
          : 0;
      }
      if (result.length === 0) {
        this.commentsPage--;
        alert("No more comments found!!");
      }
      this.commentsCollections();
      this.postComments = this.finalComments;
      //alert("Result - " + result.length + " " + this.commentsPage);
    }, 100);
  }
  finalComments: Comment[] = [];
  commentsCollections(): Comment[] {
    const tempComments = [] as Comment[];
    console.log("temp before - " + tempComments);
    for (let i = 0; i < this.commentsPart.length; i++) {
      const element = this.commentsPart[i];
      for (let a = 0; a < element.length; a++) {
        tempComments.push(element[a]);
      }
    }
    console.log("comments collections - " + this.finalComments);
    this.finalComments = tempComments;
    return this.finalComments;
  }

  closeAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 1000);
  }

  restartApp() {
    console.log("Restarting App...");
    document.location.reload(true);
  }

  nextStep() {
    console.log("In next step");
    this.blogSelection++;
    this.$refs.blogInput.focus();
  }

  typeSearchLeave() {
    setTimeout(() => {
      this.isTypeSearch = false;
      this.contentSelectionHover =
        this.typeLastSelected == -1 ? 0 : this.typeLastSelected;
    }, 200);
  }

  typeLastSelected = -1;
  typeChoice(id: number) {
    console.log("test - " + id);
    this.isTypeSearch = false;
    this.typeLastSelected = id;
    this.postType = id - 1;
    this.clearPart();
    if (this.gallery.length) {
      this.getAllCards(this.gallery[0].id);
      this.getAllCards(this.gallery[0].id);
    } else {
      this.getAllCards();
      setTimeout(() => {
        if (this.gallery.length) {
          this.getAllCards(this.gallery[0].id);
        } else {
          alert("No data found!");
        }
      }, 400);
    }
    this.isCardScrolled = false;
    this.scrollCardLeft();
  }

  searchType = ["library", "content", "note"];

  contentSelction = -1;
  contentTypeSearchSelection() {
    console.log();
  }

  contentSelectionHover = 0;
  isTypeSearch = false;

  currentPosition = 0;
  currentPage = 1;
  skipBy = 4;
  pageLength = 4; // pagenumver
  steps = 1; //page size
  moreTriesCounter = 0;
  chapCounter = 0;
  More() {
    console.log("MORE");
    this.currentPage = this.currentPage + 1; // pagenumber
    console.log("dsd" + this.skipBy);
    setTimeout(async () => {
      let hasData = false;
      await contentService
        .getAllCards(
          this.query,
          this.skipBy,
          this.currentPage,
          this.postType,
          this.avatarId,
          this.typeSearch
        )
        .then((res) => {
          if (res.length) {
            this.additionGallery = res;
            hasData = true;
          }
        });
      if (hasData) {
        let indexCounter = 0;

        this.chapCounter++;
        for (let i = 0; i < this.additionGallery.length; i++) {
          this.additionGallery[i].chapterIndex = [
            this.chapCounter,
            indexCounter++,
          ];
        }
        this.chapter = {
          startRange: (this.currentPage - 1) * this.skipBy,
          endRange: this.gallery.length + this.additionGallery.length,
          posts: this.additionGallery,
        };
        //this.parts.push(this.chapter)
        if (this.chapter) {
          this.parts.push(this.chapter);
          console.log(this.parts);
        }
        console.log(this.chapter);

        if (this.additionGallery) {
          this.pageLength += this.additionGallery.length;
          console.log(
            "extra cards - " +
              this.additionGallery.length +
              " pageLength - " +
              this.pageLength
          );
          for (let i = 0; i < this.additionGallery.length; i++) {
            if (i != 0) {
              this.gallery.push(this.additionGallery[i]);
            }
            if (this.additionGallery.length == 1) {
              this.gallery.push(this.additionGallery[0]);
            }
          }
          console.log("Gallery final -" + this.gallery.length);
          // this.currentPosition += this.steps;
          // this.skipBy += this.steps;
        }
        this.chaptering();
        this.chaptering();
        if (this.additionGallery.length) {
          this.isCardScrolled = true;
        }
      } else {
        this.showAlert = true;
        this.alertThis = {
          title: "End Reached",
          message: "There are no more post to view.",
          isActive: true,
        };
        this.isCardScrolled = false;
        this.endOfListReached = true;
      }
    }, 980);

    // this.getAllCards();

    // setTimeout(() => {
    // this.getAllCards();

    // }, 1000);
  }

  totalPostsCount = 0;
  parts: IChapter[] = [];

  logInHere(e: ILogin) {
    this.logIn = e;
    console.log("Next - " + this.logIn.usertype);
    console.log(this.$children);
    this.$children[11].runLogin(this.logIn);
  }

  introIsActive(e) {
    this.showBg = e;
    if (this.showBg) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      document.body.style.overflow = "hidden";
      this.hideBars = true;
    } else {
      document.body.style.overflow = "";
      this.hideBars = false;
    }
  }

  finalVideo = "";
  get simpleMethod(): string {
    return this.createImage.imageUrl;
  }
  set simpleMethod(value) {
    console.log("SIMPLE - " + value);
    if (value.includes("youtube")) {
      const ytcode = value.split("v=")[1];
      setTimeout(async () => {
        this.createImage.thumbnailUrl = await `https://img.youtube.com/vi/${ytcode}/hqdefault.jpg`;
        this.createImage.imageUrl = value;
      }, 80);
      console.log("GOAL - " + ytcode + " " + this.createImage.imageUrl);
    }
    if (value.includes("youtu.be")) {
      this.finalVideo = value;
      const ytcode = value.split("be/")[1];
      setTimeout(async () => {
        this.createImage.thumbnailUrl = await `https://img.youtube.com/vi/${ytcode}/0.jpg`;
        this.createImage.imageUrl = value;
      }, 80);
    }
    if (value.includes("vimeo")) {
      const vimcode = value.replace("https://vimeo.com/", "");
      console.log(vimcode);
      setTimeout(async () => {
        await Axios.get(`http://vimeo.com/api/v2/video/${vimcode}.json`)
          .then((res) => {
            this.createImage.thumbnailUrl = res.data[0].thumbnail_large;
            this.createImage.imageUrl = value;
          })
          .catch((err) => console.log(err));
      }, 80);
    }
    this.createImage.thumbnailUrl = value;
  }

  blogSelection = 0;
  finalBlogDescription = "";
  finalBlogTitle = "";
  finalBlogContent = "";
  get blogEntry(): string {
    console.log("in blog entry.");
    if (this.blogSelection == 0) {
      this.blogInputPlaceholder = "Add a Title";
      return this.card.title;
    }
    if (this.blogSelection == 1) {
      this.blogInputPlaceholder = "Add a Discription";
      return this.card.description;
    }
    if (this.blogSelection == 2) {
      this.blogInputPlaceholder = "Write some content";
      return this.finalBlogContent;
    }
    return "";
  }

  set blogEntry(value) {
    if (this.blogSelection == 0) this.card.title = value;

    if (this.blogSelection == 1) this.card.description = value;

    if (this.blogSelection == 2) {
      this.finalBlogContent = value;
      this.card.content = filterService.FilterComment(value);
    }
  }

  blogSelect(index: number) {
    if (index > 2) index = 2;
    this.blogSelection = index;
    this.$refs.blogInput.focus();
  }

  hideImage = true;
  hasShrunk = false;
  showSwitch = ["Show", "Hide"];
  blogInputPlaceholder = "";
  addAndShrink() {
    this.hasShrunk = true;
    this.addImage();
  }

  showPreviewbox = false;
  thumbBtnAction() {
    console.log("");
    //URL.createObjectURL
    if (this.showPreviewbox) {
      if (!this.isLoaded) {
        this.showPreviewbox = false;
      }
      this.hideImage = true;
      this.hasShrunk = false;
      this.isLoaded = false;
      this.createImage.thumbnailUrl = "";
    } else {
      this.showPreviewbox = true;
    }
  }

  compareTime(content: IContent): boolean {
    const updatedOn = new Date(content.updatedOn)
      .getTime()
      .toString()
      .substring(0.9);
    const createdOn = new Date(content.createdOn)
      .getTime()
      .toString()
      .substring(0.9);
    return updatedOn > createdOn;
  }

  closeBlog() {
    this.isBlogActive = false;
    this.hideBars = false;
    this.imageList = [];
    this.tagsList = [];
    this.createImage = {
      imageUrl: "",
      quickDescription: "",
      thumbnailUrl: "",
    };
    this.isLoaded = false;
    this.card.title = "";
    this.card.description = "";
    this.card.content = "";
    this.finalBlogContent = "";
    this.showPreviewbox = false;
    this.hasShrunk = false;
    this.blogSelection = 0;
    this.inCardEdit = false;
  }

  clearBlog() {
    console.log("Clearing Blog");
    this.imageList = [];
    this.tagsList = [];
    this.createImage = {
      imageUrl: "",
      quickDescription: "",
      thumbnailUrl: "",
    };
    this.isLoaded = false;
    this.card.title = "";
    this.card.description = "";
    this.card.content = "";
    this.finalBlogContent = "";
    this.showPreviewbox = false;
    this.hasShrunk = false;
    this.blogSelection = 0;
  }
  testContent =
    "Here are some works I found that I like from http://www.artstation.com https://cdna.artstation.com/p/assets/images/images/034/796/486/large/daniel-kho-lux-wip13.jpg?1613253409 https://cdna.artstation.com/p/assets/images/images/034/796/486/large/daniel-kho-lux-wip13.jpg?1613253409";
  postContentFilter(content: string): string {
    console.log("In content post filter");
    return filterService.FilterComment(content);
  }

  finalTextEntry = "";
  addContentToText() {
    console.log("INSIDE CONTEXT");
    if (this.toolOptions[this.toolIndex] == "Add Image")
      this.finalTextEntry = this.toolItem;

    this.finalBlogContent += this.finalTextEntry;
    this.createBlog.content += filterService.FilterComment(this.finalTextEntry);
    this.showToolInput = false;
    this.$refs.blogInput.focus();
    this.$refs.blogInput.scrollLeft = this.$refs.blogInput.scrollWidth;
  }

  toolOptions = ["Add Image", "Add Link", "Bold", "Italic", "Underline"];
  showToolInput = false;
  displayTool = "";
  toolIndex = -1;
  toolItem = "";
  showToolOption(index: number) {
    console.log("new - " + this.toolOptions[index]);
    this.toolIndex = index;
    this.displayTool = this.toolOptions[index];
    this.showToolInput = true;
    setTimeout(() => {
      this.$refs.tool.focus();
    }, 100);
  }

  disableBGScroll(e: boolean) {
    console.log("In this is DARKEND");
    if (e) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  alertFromActionBar(e: IAlertBox) {
    this.showAlert = true;
    console.log("In alertFromActionBar - " + e.title + " " + e.isActive);
    this.alertThis = e;
  }

  replyingStuff(e: boolean) {
    this.isReplying = e;
    this.autoRefresher();
  }

  editComment(comment: Comment, id: number) {
    this.onEdit = id;
    this.text.message = comment.message;
    this.text.id = comment.id;
    this.$refs.write.focus();
  }

  comment2Delete: ICommentToDelete = {
    id: 0,
    contentId: 0,
  };

  deleteComment(contentId: number, id: number) {
    this.comment2Delete = {
      id: id,
      contentId: contentId,
    };

    this.updateWord(this.comment2Delete);
  }

  imageResult!: string;
  contentType = [
    "image",
    "youtubevideo",
    "vimeovideo",
    "webvideo",
    "weblink",
    "none",
  ];
  getHtmlContent(): string {
    const style = `style="
          max-width: 100%;
          max-height: 200px;
          border-radius: 8px;"`;
    const imgLink = "https://data.whicdn.com/images/329717697/original.gif";
    const videoLink = "https://www.w3schools.com/tags/movie.mp4";
    const webVideoLink = "https://www.bitchute.com/embed/XZfPVJP3W-U/";
    let finalHtml = "no content";
    if (this.contentType[-1] == "image") {
      finalHtml = `<img ${style} src="${imgLink}" alt="" >`;
    }
    if (this.contentType[-1] == "video") {
      finalHtml = `<video ${style} controls :src="${videoLink}"></video>`;
    }
    if (this.contentType[3] == "webvideo") {
      finalHtml = `<iframe ${style} src="${webVideoLink}" frameborder="0"  ></iframe>`;
    }
    console.log(finalHtml);
    return finalHtml;
  }
  styleFill = `
  object-fit: contain;
    width: 100%;
    height: 100%;
    max-height: 550px;
    display: inline-block;
    justify-content: center;`;
  videoStyle = `
    width: 90%; height: 520px; max-height: 550px;
    `;
  getImageByType(image: Image): string {
    //     let finalHtml = `<img style="${this.styleFill}" src="@/assets/SVG/no_image.png" alt="" >`;
    //     if (this.contentType[image.catergory] == "image") {
    //       finalHtml = `<img style="${this.styleFill}" src="${image.imageUrl}" alt="" >`;
    //     }
    //     if (this.contentType[image.catergory] == "youtubevideo") {
    //       const ytcode = image.imageUrl.replace("https://youtu.be/", "");
    //       console.log(ytcode);
    //       const final = `<iframe style="${this.videoStyle}" src="${image.imageUrl}" frameborder="0"  ></iframe>`;
    //       return final;
    //     }
    //     if (this.contentType[image.catergory] == "vimeovideo") {
    //       console.log("In vimeo video section");
    //       const vimcode = image.imageUrl.replace("https://vimeo.com/", "");
    //       finalHtml = `
    //       <style>
    //       section {
    //   position: relative;
    //   padding-bottom: 56.25%;
    //   height: 0;
    //   overflow: hidden;
    //   max-width: 100%;
    //   height: auto;
    // }
    // section iframe,
    // section object,
    // section embed {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    // }
    //       </style>
    //       <section>
    //       <iframe title="vimeo-player" src="https://player.vimeo.com/video/${vimcode}" frameborder="0" allowfullscreen ></iframe>
    //       </section>`;
    //     }

    const result = filterService.MediaFilter(image);
    const final = result.finalHtml ? result.finalHtml : "";
    return final;
  }

  linkHashInComment(comment: Comment): string {
    const result = filterService.FilterComment(comment.message);
    return result;
  }

  cancelEditing() {
    this.text.message = "";
    this.text.id = -1;
    this.onEdit = 0;
  }

  handleClick(e) {
    const tagResult = e.target.text;
    const final = tagResult.replace("#", "");
    this.getByTag(final, this.indexx);
    this.closeCard();
  }

  focusInput() {
    this.extendTimeLoggedIn();
    this.$refs.write.focus();
  }

  replyMessageBox!: Comment;
  toggleReplyBox(content: IContent, comment: Comment) {
    this.extendTimeLoggedIn();
    content.replyBoxIsActive = true;
    this.replyMessageBox = comment;
    this.getAllCards();
    // setTimeout(async () => {
    //     this.showCardBox = false;
    //     this.expandCardBox(this.indexx);
    //   }, 140);
    //   this.getAllCards();
  }
  clearBox(item: IContent) {
    this.extendTimeLoggedIn();
    item.replyBoxIsActive = false;
  }

  extendTimeLoggedIn() {
    console.log("In ExendTime");
    if (this.avatar) {
      clearTimeout(this.presenceTimer);
      this.out = true;
      this.checkUserPresence();
    }
  }

  flagComment(e: IForFlagging) {
    this.showflagBox = true;
    this.isDarkend = true;
    this.selectedContent = e;
  }

  cancelFlagged() {
    this.$nextTick().then(() => {
      this.showflagBox = false;
      this.isDarkend = false;
    });
    this.$nextTick(() => {
      this.getAllCards();
      this.getTags();
    });
  }
  refreshTimer: any;
  autoRefresher() {
    if (this.isReplying) {
      clearTimeout(this.refreshTimer);
    }
    if (!this.isReplying) {
      this.refreshTimer = setTimeout(async () => {
        console.log("Refreshing Stuff");
        this.counter = false;
        this.getUsers();
        this.getAllComments();
        this.getAllCards();
        this.getTags();
      }, 10000);
    }
  }

  testButton() {
    console.log("This is the best thing.");
    console.log(this.options.visitCount);
    this.showflagBox = true;
  }

  runAvatar(e: boolean) {
    console.log("FINAlly HERE!!");
    const avatarToCreate: ICreateAvatar = {
      currentIP: this.justIp.query,
    };
    this.signInAvatar = {
      usertype: false,
      currentIp: this.justIp.query,
    };
    setTimeout(async () => {
      console.log("Attempting to create a new avatar");
      this.avatar = await contentService.createNewAvatar(avatarToCreate);
    }, 120);
    this.options.enableGuest = false;
    this.options.isMember = true;
    this.options.ipAddress = this.justIp.query;
    this.options.isLiving = true;
    setTimeout(async () => {
      await contentService.editOption(this.options);
    }, 20);
    this.getThisOption();
    contentService.logOutGuest();
    setTimeout(() => {
      console.log(this.options);
    }, 30);

    console.log(this.justIp.query);
    setTimeout(async () => {
      await contentService.loginIn(this.signInAvatar);
    }, 180);

    setTimeout(() => {
      //this.getAllCards();
      document.location.reload(true);
    }, 300);
  }

  enableThisGuestf(e: boolean) {
    console.log("In final section");
    this.enableGuest = true;
    localStorage.name = "jim";
    console.log(localStorage.name);
    if (!this.guest) {
      if (!this.options.isUnregistered) {
        console.log(
          "There's a problem here! " +
            "\nGuest? - " +
            this.options.enableGuest +
            "\nAnon? - " +
            this.options.isAnonymous
        );
        this.addUnregisteredGuestUser();
        setTimeout(() => {
          if (!this.options.isUnregistered) {
            console.log(
              "There's STILL a problem here! " +
                "\nGuest? - " +
                this.options.enableGuest +
                "\nAnon? - " +
                this.options.isAnonymous
            );
          }
        }, 60);
      }
      this.options = {
        ipAddress: this.justIp.query,
        enableGuest: true,
        isAnonymous: false,
        isUnregistered: false,
        isLiving: true,
      };
      contentService.resetGuestSession();

      if (this.enableGuest) {
        setTimeout(async () => {
          const result: IOptions = await contentService.editOption(
            this.options
          );
          this.options = result;
          if (this.options.enableGuest) {
            this.getGuestUser();
            contentService.createAndAddGuest();
            contentService.editOption(this.options);
            //this.getAllCards();
            if (result.enableGuest) {
              document.location.reload(true);
            } else {
              alert("not working");
            }
          }
        }, 1000);
      }
    } else {
      this.options = {
        ipAddress: this.justIp.query,
        enableGuest: true,
        isAnonymous: false,
        isUnregistered: false,
        isLiving: true,
      };
      contentService.resetGuestSession();
      contentService.createAndAddGuest();
      contentService.editOption(this.options);
      //this.getAllCards();
      setTimeout(() => {
        document.location.reload(true);
      }, 500);
    }
  }

  sendMessage(content: IContent) {
    this.extendTimeLoggedIn();
    console.log("In send message!");
    console.log(this.$children);
    this.sendingMessage(content);
    setTimeout(async () => {
      this.showCardBox = false;
      this.expandCardBox(this.indexx);
    }, 140);
    this.getAllCards(content.id);
    // ---->
    this.cancelEdit();
    this.cancelEditing();
  }

  cancelEdit() {
    this.extendTimeLoggedIn();
    this.text.message = "";
    this.text.id = -1;
    this.text.avatarId = 0;
  }
  idToUpdate = -1;
  upVote(content: IContent) {
    this.extendTimeLoggedIn();
    console.log(this.$children);
    setTimeout(async () => {
      await contentService.addNewUpVote(content.id);
    }, 20);
    setTimeout(async () => {
      this.showCardBox = false;
      this.expandCardBox(this.indexx);
    }, 140);
    this.updateId = content.id;
    this.toUpdate = true;
    this.getAllCards();
  }

  async addUpVode(id: number) {
    await contentService.addNewUpVote(id);
    console.log(id);
    console.log();
  }

  onFileChange(e) {
    const file = e.target.files[0];
    this.createImage.imageUrl = URL.createObjectURL(file);
  }

  checkPosition() {
    this.matchHeight();

    const container = document.querySelector(".card-background");
    const scrollLimit = container?.scrollWidth - container?.clientWidth; // scroll limit
    console.log(container?.scrollLeft);
    console.log("Client width " + container?.scrollWidth);
    console.log("Difference " + scrollLimit);

    if (scrollLimit <= container?.scrollLeft + 100) {
      console.log("THIS IS EQUAL");
      this.isCardScrolled = false;
    } else {
      this.isCardScrolled = true;
    }
  }

  get cardCount() {
    return this.gallery.length;
  }

  get changeLabel() {
    return this.inCardEdit ? "Save Changes" : "Add Card";
  }
  // props
  // methods
  // lifecycle hooks

  //   scrollFuction() {
  //     console.log('Now scrolling');
  //     const ele = document.querySelector('.card-background');
  //     const cw = ele?.clientHeight;
  //     const sw = ele?.scrollWidth;
  //     if(cw < 525) {
  //       console.log('it more!!');
  //       console.log(cw + ' ' + sw);
  //     }
  //   }

  editCard(id: number) {
    console.log(id + " in edit Card!");
    this.inCardEdit = !this.inCardEdit;
    const result = this.gallery[id];
    this.indexx = result.id;
    const postType = result.postType;
    const images = result.images as IImageCreate[];
    const tags = result.tags as ITag[];
    this.imageList = images;
    if (result.postType == 1) {
      this.createImage = {
        imageUrl: "",
        quickDescription: "",
        thumbnailUrl: images[0].thumbnailUrl,
      };

      //this.blogSelection = 2;
      this.card.content = filterService.FilterComment(result.content);
      this.finalBlogContent = result.content;

      console.log("The url -" + window.location);
      const createdOn = new Date(2021, 2, 19, 15, 35, 45);
      const updatedOn = new Date(2021, 2, 19, 15, 35, 46);
      const u = updatedOn.getTime().toString().substring(0, 10);
      const c = createdOn.getTime().toString().substring(0, 10);
      console.log(u < c);

      this.isLoaded = true;
      this.showPreviewbox = true;
      this.hasShrunk = true;
    }

    this.tagsList = tags;

    console.log(this.imageList[0].imageUrl);

    // this.createImage.imageUrl = images[0].imageUrl;

    // if(images[0].quickDescription !== undefined || "" || null) {
    // console.log('inside quick description');
    // this.createImage.quickDescription = images[0].quickDescription;
    // }

    this.card.title = result.title;
    this.card.description = result.description;

    console.log("all good");

    // for (let inde = 0; inde < result.images.length; inde++) {
    //   console.log(inde);
    //   if (result.images[inde].imageUrl !== undefined || null) {
    //   this.imageList[inde].imageUrl = result.images[inde].imageUrl;
    //   }
    //   if (result.images[inde].quickDescription !== undefined || null)
    //   this.imageList[inde].quickDescription = result.images[inde].quickDescription;
    // }

    // this.createImage.imageUrl = result.images[0].imageUrl;
    // this.createImage.quickDescription = result.images[0].quickDescription;
    // this.card.title = result.title;
    // this.card.description = result.description;

    // if (result.tags !== undefined || null) {
    //   console.log(result.tags);
    // for (let index = 1; index < result.tags.length; index++) {
    //   this.tagsList[index].tagItem = result.tags[index].tagItem;
    //   this.tagsList[index].id = result.tags[index].id;
    // }
    // }
    postType == 0 ? (this.showBox = !this.showBox) : (this.isBlogActive = true);
  }

  editImage(id: number) {
    this.extendTimeLoggedIn();
    this.currentImageIndex = id;
    this.createImage = this.imageList[id];
    this.inImageEdit = true;
  }

  addTagInput() {
    if (this.createTag.tagItem != "") {
      const tempTag = {
        tagItem: this.createTag.tagItem,
      };
      this.tagsList.push(tempTag);
      this.createTag.tagItem = "";
    } else {
      console.log("No tag has been entered");
    }
  }

  removeTag(ind: number) {
    this.extendTimeLoggedIn();
    this.tagsList.splice(ind, 1);
  }

  dark() {
    this.isDarkend = !this.isDarkend;
  }

  get helloMessage(): string {
    return this.$store.state.user.lastLogin;
  }

  get userInfo(): boolean {
    return this.$store.getters.getUsername;
  }

  set userInfo(value: boolean) {
    console.log(value);
    this.$store.commit(UserMutations.SET_LIVING, value);
  }

  tests() {
    this.submit();
    console.log("in testedt");
    //   let result: IContent[] = [];
    //   setTimeout(async() => {
    //       result = await contentService.getAllCards(
    //       this.query,
    //       this.limit,
    //       this.skipBi,
    //       this.postType
    //     );

    //     this.chapter = {
    //       posts: result,
    //       startRange: 0,
    //       endRange: result.length,
    //     };

    //   console.log(this.chapter);
    //  }, 120);

    //this.chaptering();
    // setTimeout(() => {
    //   console.log("the parts - " + this.parts);
    // }, 150);

    console.log(
      "Chapter index for index 2 - " + this.gallery[2].chapterIndex[1]
    );
    console.log("Chapters - " + this.parts + "posts - " + this.parts[0].posts);
    for (let i = 0; i < this.parts[0].posts.length; i++) {
      const element = this.parts[0].posts[i];
      console.log("id - " + element.id);
      console.log("id - " + element.chapterIndex);
    }
    for (let i = 0; i < this.parts.length; i++) {
      const element = this.parts[i];
      console.log(
        i + " ranges - " + element.startRange + ", " + element.endRange
      );
    }

    console.log(this.isReplying);
    console.log(this.options);
    console.log(this.options.isUnregistered);
    console.log(this.avatar);
    console.log(this.comments);
    alert(this.options.enableGuest)
    setTimeout(async () => {
    contentService.resetGuestSession();
      contentService.createAndAddGuest();
      contentService.editOption(this.options);
    }, 30);
    console.log("Guest - " + this.guest.id);

    setTimeout(async () => {
      await contentService.getRemainingFruits().then((res) => {
        console.log(res);
      });
    });

    console.log(
      "pagelength - " +
        this.pageLength +
        " page start -" +
        this.currentPosition +
        " gallery length -" +
        this.gallery.length
    );

    const test =
      "a message %This is some great work http://www.google.com  a test";
    const l = test.match(/%[^\s]+/g);
    const f = test.replace(
      /%([ :\w+]*)(https?:\/\/\w+[^\s]*)/g,
      `<a href="$2">$1</a>`
    );
    const final = JSON.stringify(test.match(/\[[^\]]*\]/g)).replace(
      /["[\]']+/g,
      ""
    );

    console.log("FINAL -" + f);
    this.showAlert = true;
    this.alertThis = {
      title: "Testing Method",
      message: "Just checking to see if this works.",
      isActive: true,
    };
  }

  goTo(refName: string) {
    const element = document.querySelector(refName);
    console.log(refName);
    element.scrollIntoView({ behavior: "smooth" });
  }

  addImage() {
    this.extendTimeLoggedIn();
    console.log("before process - " + this.createImage.thumbnailUrl);
    this.isError = false;
    if (
      (this.createImage.imageUrl !== "" ||
        this.createImage.thumbnailUrl !== "") &&
      this.isLoaded
    ) {
      console.log("in add images!!");
      this.createImage.thumbnailUrl.includes("jpg")
        ? (this.createImage.catergory = 0)
        : this.createImage.thumbnailUrl.includes("youtu")
        ? (this.createImage.catergory = 1)
        : this.createImage.thumbnailUrl.includes("bitchute")
        ? (this.createImage.catergory = 3)
        : this.createImage.thumbnailUrl.includes("vimeo")
        ? (this.createImage.catergory = 2)
        : (this.createImage.catergory = -1);
      console.log("Assigning Video");

      const image = {
        imageUrl: this.createImage.thumbnailUrl
          ? this.createImage.thumbnailUrl
          : null,
        thumbnailUrl: this.createImage.thumbnailUrl,
        quickDescription: this.createImage.quickDescription
          ? this.createImage.quickDescription
          : "",
        cardId: this.createImage.cardId != null ? this.createImage.cardId : -1,
        catergory:
          this.createImage.catergory >= 0
            ? this.createImage.catergory
            : this.isBlogActive && this.createImage.thumbnailUrl !== ""
            ? 0
            : -1,
      };
      console.log("Checking if image - " + image.imageUrl);
      const result = this.imageList.find(
        (x) => x.imageUrl === this.createImage.thumbnailUrl
      );
      console.log("Checking result - " + result?.imageUrl);
      // console.log('from create - '+ this.createImage.imageUrl)
      // if(this.createImage.imageUrl != "" && this.inCardEdit) {
      //   console.log('in edit mode')
      //   image.imageUrl = this.
      //   image.quickDescription = this.createImage.quickDescription;
      console.log(this.createImage.quickDescription);
      // }
      if (
        (result?.imageUrl == null || this.inImageEdit) &&
        !this.isBlogActive
      ) {
        if (this.inImageEdit) {
          console.log(image.cardId);
          this.imageList.splice(this.currentImageIndex, 1);
        }
        console.log("IMAGE - " + this.imageList);
        this.imageList.push(image);
        this.showBox = true;
        this.showBox = false;
        this.isLoaded = false;
        this.createImage.imageUrl = "";
        this.createImage.thumbnailUrl = "";
        this.createImage.quickDescription = "";
      } else if (!this.inImageEdit && !this.isBlogActive) {
        this.isError = true;
        console.log("this image already exists");
      } else if (this.isBlogActive) {
        this.imageList.push(image);
        console.log("Image added to blog." + image.imageUrl);
      }
    } else {
      console.log("No image was found to add!!");
    }
    this.inImageEdit = false;
  }

  removeImage(ind: number) {
    this.extendTimeLoggedIn();
    this.imageList.splice(ind, 1);
  }

  async addLike(comment: Comment, contentId: number) {
    this.extendTimeLoggedIn();
    console.log(this.$children);
    const result = await contentService.addLiketoComment(comment.id, contentId);
    if (result === 200) {
      console.log("Like posted!");
      // ---->

      setTimeout(async () => {
        this.showCardBox = false;
        this.expandCardBox(this.indexx);
      }, 140);
      this.getAllCards();

      // ---->
    }
  }

  scrollToLeft() {
    this.extendTimeLoggedIn();
    console.log("in scroll to left!!");
    const bar = document.querySelector(".tags_section ul");
    if (!this.isScrolled) {
      bar.scrollLeft = bar.scrollWidth;
    } else {
      bar.scrollLeft = 0;
    }
    this.isScrolled = !this.isScrolled;
  }

  showMore = false;
  scrollCardLeft() {
    this.extendTimeLoggedIn();
    console.log("In CARD scroll left");
    const bar = document.querySelector(".card-background");
    if (this.isCardScrolled) {
      bar.scrollLeft = bar.scrollWidth;
    } else {
      bar.scrollLeft = 0;
    }
    this.isCardScrolled = !this.isCardScrolled;
  }

  expandCardBox(content: number, expand = false) {
    console.log("number is: " + content);
    this.showCardBox = true;
    this.hideBars = true;

    this.indexx = content;
    this.addView(this.gallery[content].id);
    this.getCommentsByPost(this.gallery[content].id);
    this.post = this.gallery[content];
    this.vote = this.post.upVotes.find((v) => v.voteById == this.avatar.id);
    this.expandCaption = expand;

    this.$nextTick().then(() => {
      console.log((this.$refs.cardTop.scrollTop = 0));
    });
  }

  goToLink(post: IContent) {
    this.extendTimeLoggedIn();
    window.open(post.imageUrl);
  }

  submit() {
    this.extendTimeLoggedIn();
    this.bus.$emit("submit");
  }
  updateWord(updatedStuff: ICommentToDelete) {
    this.tempPostId = updatedStuff.contentId;
    this.commentToDelete = updatedStuff;
    //this.wording = updatedStuff;
    console.log(this.commentToDelete);
    this.messageBox = {
      title: "Are you sure?",
      message: "Please confirm that you wish to delete this comment.",
      isActive: true,
    };
  }

  // tagss() {
  //  for (const tag of this.tags) {
  //    if(this.tags.filter(t => t.tagItem === tag.tagItem)) {
  //      console.log(tag + ' ' + )
  //    }
  //  }
  // }
  cascade = false;
  async addCard() {
    this.extendTimeLoggedIn();
    //this.card.imageUrl = this.imageUrl;
    this.card.images = this.imageList;
    this.card.tags = this.tagsList;
    if (this.isBlogActive) {
      this.card.postType = 1;
      this.card.content = this.finalBlogContent;
    } else {
      this.card.postType = 0;
    }
    if (this.indexx > 0 && this.inCardEdit) {
      await contentService.updateCard(this.card, this.indexx).then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Successfully UPDATED card!");
        }
      });
    } else if (!this.inCardEdit) {
      console.log(this.card);
      console.log(this.imageList);
      console.log("in add card!");
      await contentService
        .addNewCard(this.card)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            console.log("Successfully ADDED card!");
            this.matchHeight();
          }
        })
        .catch((err) => console.log(err));
    }

    console.log("Success!!");
    this.inCardEdit = false;
    this.cascade = true;
    this.closeCard();
    this.clearBlog();
    this.getAllCards(this.gallery[0].id);
    this.getTags();
    if (this.card.postType == 1) {
      console.log("");
      this.isBlogActive = false;
    }

    if (this.card.postType == 0) this.showBox = !this.showBox;
  }

  addView(id: number) {
    console.log("In Add View");
    setTimeout(async () => {
      const result = await contentService.addView(id);
      if (result.status == 200) {
        console.log("A view has been added");
      } else {
        console.log("No view has been added");
      }
      this.updateThisPost = id;
      this.toUpdate = true;
    }, 20);
  }

  closeCard() {
    this.extendTimeLoggedIn();
    this.showCardBox = false;
    this.commentBox = false;
    this.inCardEdit = false;
    this.imageList = [];
    this.tagsList = [];
    this.createImage = {
      imageUrl: "",
      quickDescription: "",
      thumbnailUrl: "",
    };
    this.isLoaded = false;
    this.card.title = "";
    this.card.description = "";
    this.currentImageIndex = -1;
    this.hideBars = false;
    this.getAllCards();
    this.disableBGScroll(false);
    this.expandCaption = false;
  }

  checking() {
    this.extendTimeLoggedIn();
    this.showBox = !this.showBox;
    this.imageList = [];
    this.tagsList = [];
    this.inCardEdit = false;
    this.createImage = {
      imageUrl: "",
      quickDescription: "",
      thumbnailUrl: "",
    };
    this.isLoaded = false;
    this.card.title = "";
    this.card.description = "";
    this.currentImageIndex = -1;
    this.hideBars = false;

    this.getAllCards();
  }

  // cardsWithThisTag(tag: Tag): number {
  //   const result = this.gallery.filter(x =>x.tags.find(t => t.tagItem === tag.tagItem));
  //   return result.length;
  // }

  getByTag(tag: string, id: number) {
    this.extendTimeLoggedIn();
    this.current = id;
    if (id == -1) {
      this.postType = -1;
      this.contentSelectionHover = 0;
      this.typeLastSelected = -1;
    }

    this.clearPart();
    this.avatarId = -1;
    this.typeSearch = "";
    this.query = tag;
    this.getAllComments();
    this.getResult();
  }

  tested() {
    console.log("Let get ready!!!");
    //alert("Text: " + $("#test").text());
    const el = document.querySelector(".card-background");
    console.log(el?.scrollWidth + " scroll width");
    console.log(el?.clientWidth + " client width");

    console.log(Vue.prototype.$play);
    console.log(Vue.prototype.$isLoggedin);
    //localStorage.name = "sand";
    if (localStorage.name == "water") {
      localStorage.name = "sindy";
    } else {
      localStorage.name = "unchanged";
    }
    contentService.getCurrentUserIP();
    localStorage.setItem("ally", "super");
    console.log(localStorage.name);

    // setTimeout(async () => {
    //   await contentService
    //     .getCurrentUserIP()
    //     .then((res) => {
    //       this.currentIP = res;
    //       console.log(res.geoplugin_regionName);
    //     })
    //     .catch((err) => console.log(err));
    // }, 100);
  }

  tested2() {
    console.log("In Tested Two");
    localStorage.name = "water";
    console.log(localStorage.name);
  }
  isSearch = false;
  getResult() {
    this.extendTimeLoggedIn();
    console.log(this.query);
    this.isSearch = true;
    this.endOfListReached = false;
    if (this.gallery.length) {
      this.getAllCards(this.gallery[0].id);
      this.getAllCards(this.gallery[0].id);
      this.isCardScrolled = false;
      this.scrollCardLeft();
    } else {
      this.getAllCards();
    }
    this.getTags();
    //this.getAllCards();
  }

  returnMessage() {
    console.log("working!!");
    this.messageBack = "howdy!!!!";
  }

  check(e: number) {
    console.log("in check...");
    this.isReplying = false;
    this.autoRefresher();
    this.getUsers();
    this.getAllComments();
    this.getAllCards(e);
  }

  limit = 4;
  skipBi = 1;
  postType = -1;
  chapter: IChapter = {
    posts: [] as IContent[],
    startRange: 0,
    endRange: 0,
  };
  getAllCards(id = -1) {
    this.chaptering(id);
    // if (this.gallery.length <= 4) {
    //   setTimeout(async () => {
    //     this.gallery = await contentService.getAllCards(
    //       this.query,
    //       this.limit,
    //       this.skipBi,
    //       this.postType
    //     );

    // if (this.pageLength > this.gallery.length) {
    //   setTimeout(async () => {
    //     this.additionGallery = await contentService.getAllCards(
    //       this.query,
    //       this.skipBy,
    //       this.currentPage
    //     );
    //   }, 20);

    //   for (let i = 0; i < this.additionGallery.length; i++) {
    //     if (i != 0) {
    //       this.gallery.push(this.additionGallery[i]);
    //     }
    //     if (this.additionGallery.length == 1) {
    //       this.gallery.push(this.additionGallery[0]);
    //     }
    //   }
    // }

    //}, 110);
    //}

    // contentService.getAllCards(this.query)
    // .then((res) => this.gallery = res )
    // .catch((err) => console.log(err));
  }

  chapterResult: IContent[] = [];
  updatedChapter = 0;
  toUpdate = false;
  updateId = -1;
  section: [IContent[]] = [[]];
  tempPostId = -1;
  noResult = false;
  chaptering(id = -1) {
    let result: IContent[] = [];
    setTimeout(async () => {
      console.log("chaptering - " + id);
      id > -1 ? (this.toUpdate = true) : (id = -1);
      if (!this.toUpdate) {
        result = await contentService.getAllCards(
          this.query,
          this.limit,
          this.skipBi,
          this.postType,
          this.avatarId,
          this.typeSearch
        );
        this.isSearch = false;
        //alert(result.length + "id - " + id)
        // let indexCounter = 0;
        // console.log("CHAPTER - " + this.chapterCounter)
        // for (let i = 0; i < result.length; i++) {
        //   result[i].chapterIndex = [this.chapterCounter >= this.updatedChapter ? this.chapterCounter : this.updatedChapter, indexCounter];
        //   this.chapterResult.push(result[i]);
        //   indexCounter++;
        // }
        // this.chapter = {
        //   posts: result,
        //   startRange:
        //     (this.skipBi - 1) * this.limit == 0
        //       ? 1
        //       : (this.skipBi - 1) * this.limit,
        //   endRange: this.skipBi * this.limit,
        // };
      }

      const check = await contentService.getAllCards(
        this.query,
        this.limit,
        this.skipBi,
        this.postType,
        this.avatarId,
        this.typeSearch
      );

      // let hasResult = false;
      // if(result.length) {
      //   hasResult = true;

      //   if(this.noResult && this.gallery.length == 0) {
      //     this.toUpdate = false;
      //     this.noResult = false;
      //     console.log("THIS IS DONE!!")
      //   }
      // } else {
      //   this.noResult = true;
      //   this.gallery = [];
      //   this.parts = [];
      // }

      //alert(result[0].id + " id " + id)
      if (this.toUpdate && check.length > 0 && this.gallery.length > 0) {
        id > -1 ? (this.updateThisPost = id) : -1;
        let post;
        if (this.partsPosts().length) {
          console.log(this.partsPosts());
          post = this.partsPosts().find(
            (x) =>
              x.id ==
              (this.updateThisPost > -1 ? this.updateThisPost : this.post.id)
          );
        } else {
          post = this.gallery.find(
            (x) =>
              x.id ==
              (this.updateThisPost > -1 ? this.updateThisPost : this.post.id)
          );
        }

        const partChapter = post ? post.chapterIndex[0] : -1;
        this.updatedChapter = partChapter;
        console.log("post id " + post?.id + "partchap " + partChapter);

        if (this.cascade && partChapter >= 0) {
          let counterParts = partChapter;
          for (let i = 0; i < this.parts.length; i++) {
            if (i >= counterParts) {
              this.section[i] = result = await contentService.getAllCards(
                this.query,
                this.limit,
                counterParts + 1,
                this.postType,
                this.avatarId,
                this.typeSearch
              );
            }

            let indexCounter = 0;
            if (this.section[i]) {
              for (let k = 0; k < this.section[i].length; k++) {
                console.log(this.section[i][k]);
                this.section[i][k].chapterIndex = [counterParts, indexCounter];
                indexCounter++;
              }
              this.chapter = {
                posts: this.section[i],
                startRange:
                  counterParts * this.limit >= 1 ? partChapter * this.limit : 1,
                endRange: (partChapter + 1) * this.limit,
              };
              //console.log("sss" + this.onEdit[0].length)
              console.log(this.chapter);
              this.parts[counterParts] = this.chapter;
              counterParts++;
            }
          }

          this.cascade = false;
        }

        if (!this.cascade) {
          result = await contentService.getAllCards(
            this.query,
            this.limit,
            partChapter + 1,
            this.postType,
            this.avatarId,
            this.typeSearch
          );
          this.parts[partChapter].posts = result;
          console.log("result - " + result[0].id);
        }
        //alert("pc - " + this.updateThisPost)
        id = -1;
        this.updateThisPost = -1;
        this.tempPostId = -1;

        // alert(result[0].id + "Post id -" + " partch" + partChapter + "posts " + post?.id);
        this.toUpdate = false;
      }

      if (check.length == 0) {
        this.gallery = [];
        this.parts = [];
      } else if (check.length > 0 && this.gallery.length == 0) {
        result = check;
      }

      //console.log("idddddd-" + this.gallery.length ? this.gallery[this.gallery.length - 3].id : "nothing");
      //if (this.pageLength > this.gallery.length) {

      // if (
      //   this.pageLength > this.gallery.length &&
      //   this.chapter.posts.length > 0 &&
      //   this.chapter.posts.length < 4
      // ) {
      //   if (this.gallery) {
      //     if (this.gallery[0].id > result[0].id) {
      //       for (let i = 0; i < result.length; i++) {
      //         if (this.chapter.posts.length < 4) {
      //           this.chapter.posts.push(result[i]);
      //           this.chapter.startRange += 1;
      //           this.chapter.endRange += 1;
      //         } else {
      //           this.parts.push(this.chapter);
      //           this.chapterCounter++;
      //           this.chapter = {
      //             posts: [] as IContent[],
      //             startRange: (this.skipBi - 1) * this.limit,
      //             endRange:
      //               this.gallery.length > result.length
      //                 ? this.gallery.length
      //                 : result.length,
      //           };
      //         }
      //       }
      //       this.chapter.endRange += result.length;
      //     }
      //   }
      // } else {

      if (!this.cascade && result.length) {
        let indexCounter = 0;
        console.log("CHAPTER - " + this.chapterCounter);
        for (let i = 0; i < result.length; i++) {
          result[i].chapterIndex = [
            this.chapterCounter >= this.updatedChapter
              ? this.chapterCounter
              : this.updatedChapter,
            indexCounter,
          ];
          this.chapterResult.push(result[i]);
          indexCounter++;
        }
        this.chapter = {
          posts: result,
          startRange:
            (this.skipBi - 1) * this.limit == 0
              ? 1
              : (this.skipBi - 1) * this.limit,
          endRange: this.skipBi * this.limit,
        };
        if (this.parts.length == 0) {
          this.parts.push(this.chapter);
        }
      }
      //}
      //this.partsmethod(this.chapter);

      /// FIX!
      // if (this.partsPosts().length < this.pageLength) {
      //   //alert("in")
      //   if (
      //     this.chapter.startRange > this.parts[this.chapCounter + 1].startRange
      //   ) {
      //     console.log("FIXX Processing...");
      //     this.parts.push(this.chapter);
      //     this.chapterCounter = this.parts.length;
      //   } else {
      //     let r: IContent[];
      //     setTimeout(async () => {
      //       r = await contentService.getAllCards(
      //         this.query,
      //         this.limit,
      //         this.skipBy,
      //         this.postType
      //       );
      //       this.parts[this.chapCounter + 1].posts = r;
      //     }, 100);
      //   }
      // }
      // if (
      //   this.parts[this.chapterCounter].posts.filter(
      //     (x) => x.id == result[0].id
      //   )
      // ) {
      //   console.log("g Processing...")
      //   this.chapter = {
      //     posts: result,
      //     startRange:
      //       (this.skipBi - 1) * this.limit == 0
      //         ? 1
      //         : (this.skipBi - 1) * this.limit,
      //     endRange: this.skipBi * this.limit,
      //   };
      //   this.parts[this.chapterCounter] = this.chapter;
      // }

      this.gallery = this.partsPosts();
      console.log("gallery - " + this.gallery[0].id);

      // this.parts.push(this.chapter);
      // if (this.parts) {
      //   const el = [];
      //   for (let i = 0; i < this.parts.length; i++) {
      //     for (let a = 0; a < this.parts[i].posts.length; a++) {
      //       //this.gal.push(this.parts[i].posts[a]);
      //       el.push(this.parts[i].posts[a]);
      //       gal.push(this.parts[i].posts[a])
      //     }
      //   }
      //   console.log(gal);
      //   console.log("math min - " + Math.floor(3 / 4)); //opposite is math.ceil
      // }
      // //}
      // console.log("the chapter - " + this.chapter);
      for (let i = 0; i < this.gallery.length; i++) {
        console.log(
          " id " + this.gallery[i].id + " " + this.gallery[i].chapterIndex
        );
      }
    }, 100);
  }
  partsPostsMax(limit: number): boolean {
    const posts: IContent[] = [];
    for (let i = 0; i < this.parts.length; i++) {
      for (let a = 0; a < this.parts[i].posts.length; a++) {
        //this.gal.push(this.parts[i].posts[a]);
        posts.push(this.parts[i].posts[a]);
      }
    }
    return posts.length > limit;
  }

  partsPosts(): IContent[] {
    const posts: IContent[] = [];
    for (let i = 0; i < this.parts.length; i++) {
      for (let a = 0; a < this.parts[i].posts.length; a++) {
        //this.gal.push(this.parts[i].posts[a]);
        posts.push(this.parts[i].posts[a]);
      }
    }
    return posts;
  }

  clearPart() {
    console.log("Clearing Parts");
    this.currentPage = 1;
    this.skipBy = 4;
    this.pageLength = 4;
    this.chapCounter = 0;
    if (this.parts.length > 1) {
      for (let i = 0; i < this.parts.length; i++) {
        if (i > 0) {
          this.parts.pop();
        }
      }
    }
    this.chapter = {
      posts: [] as IContent[],
      startRange: 0,
      endRange: 0,
    };
  }
  clearAllParts() {
    this.currentPage = 1;
    this.skipBy = 4;
    this.pageLength = 4;
    this.chapCounter = 0;
    for (let i = 0; i < this.parts.length; i++) {
      this.parts.pop();
    }
    this.chapter = {
      posts: [] as IContent[],
      startRange: 0,
      endRange: 0,
    };
  }

  updatePart(postId: number) {
    const post = this.partsPosts().find((x) => x.id == postId);
    const partChapter = post ? post.chapterIndex[0] : -1;
    const partsToUpdate = this.parts[partChapter];
    this.toUpdate = true;
    this.getAllCards();
  }

  partsmethod(chapter: IChapter) {
    const gal: IContent[] = [];
    this.parts.push(chapter);

    if (this.parts) {
      const el = [];
      for (let i = 0; i < this.parts.length; i++) {
        for (let a = 0; a < this.parts[i].posts.length; a++) {
          el.push(this.parts[i].posts[a]);
          gal.push(this.parts[i].posts[a]);
        }
      }
      console.log(gal);
      console.log("math min - " + Math.floor(3 / 4)); //opposite is math.ceil
      console.log("chapter counter - " + this.chapterCounter);

      if (this.chapterCounter == 1)
        console.log(
          this.parts[this.chapterCounter].startRange +
            " " +
            this.parts[this.chapterCounter].endRange
        );
    }
    //}
    console.log("the chapter - " + this.chapter);

    this.parts;
  }

  noUser = false;
  getAvatar() {
    console.log("in avatar!!");
    setTimeout(async () => {
      this.avatar = await contentService.getThisAvatar();
    }, 50);

    // contentService.getThisAvatar()
    //   .then((res) => this.avatar = res )
    //   .catch((err) => console.log(err));
  }

  tagQuery = "";
  pageLimit = 5;
  getTags() {
    setTimeout(async () => {
      this.tags = await contentService.getAllTags(this.query, this.pageLimit);
    }, 50);
    // contentService.getAllTags()
    // .then((res) => this.tags = res )
    // .catch((err) => console.log(err));
  }
  unguestCounter = 0;
  addUnregisteredGuestUser() {
    const visitCount = this.options?.visitCount ? this.options?.visitCount : 0;
    if (visitCount < 1) this.getThisOption();

    if (!this.guest && !this.avatar)
      setTimeout(async () => {
        this.unregGuest = await contentService.addCurrentUnregisteredUser();
        //alert(this.unregGuest)
        if (this.options) {
          if (this.options.isAnonymous) {
            const opt = {
              ipAddress: this.unregGuest.ipAddress,
              isUnregistered: true,
              isLiving: true,
            };
            contentService.enableOption(opt);
          }
        }
      }, 40);
    if (!this.guest && !this.unregGuest && this.unguestCounter < 4) {
      setTimeout(() => {
        this.addUnregisteredGuestUser();
        this.unguestCounter++;
        console.log("GG Counting - " + this.unguestCounter);
        clearTimeout();
      }, 400);
    } else {
      this.unguestCounter = 0;
      console.log("COUNTER ZEROED!");
    }
    if (this.unguestCounter > 4) {
      alert("There is a connection issue!!");
    }
  }

  getThisOption() {
    console.log(" in get options");
    setTimeout(async () => {
      this.options = await contentService.getOptions();
    }, 30);
  }

  getGuestUser() {
    console.log("Options " + this.options);
    setTimeout(async () => {
      if (!this.options?.enableGuest && !this.options?.isMember)
        this.getThisOption();
      //localStorage.name == "jim"
      if (this.options.enableGuest && !this.avatar && !this.guest) {
        console.log("IN GET GUEST!!!");
        if (!this.options?.enableGuest) {
          alert("in");
          this.guest = await contentService.createAndAddGuest();
          contentService.resetGuestSession();
          contentService.createAndAddGuest();
        } else {
          this.guest = await contentService.getGuestById(-1, this.justIp.query);
        }
        //contentService.editOption(this.options);
        this.getAllCards(this.gallery[0].id);
      } else {
        contentService.logOutGuest();
        this.getAvatar();
      }
    }, 350);
  }

  async getItGuest() {
    await contentService.createAndAddGuest().then((res) => {
      this.guest = res;
    });
  }

  // timedRefresh() {
  //   setTimeout(() => {
  //     this.getAllCards();
  //   }, 9000);
  //   this.checkTime();
  // }

  // checkTime() {
  //   setTimeout(() => {
  //   this.timedRefresh();
  //   }, 9000);
  // }

  getAllComments() {
    setTimeout(async () => {
      await contentService.getComments().then((res) => {
        if (res) {
          this.comments = res;
        }
      });
    }, 220);

    // contentService.getComments()
    // .then((res) => this.comments = res )
    // .catch((err) => console.log(err));
  }

  postComments: Comment[] = [];
  commentParams = {
    pageSize: 4,
    pageNumber: 1,
  };
  getCommentsByPost(id: number, partToUpdate = 0) {
    setTimeout(async () => {
      let pageCounter = 0;
      for (let i = 0; i < this.commentsPart.length; i++) {
        pageCounter += partToUpdate + 1;
        const result = await contentService.getCommentsByCard(
          id,
          this.commentParams.pageSize,
          pageCounter
        );
        if (i >= partToUpdate) this.commentsPart[i] = result;
      }
      this.commentsCollections();
      this.postComments = this.finalComments;
    }, 100);
  }

  getUsers() {
    setTimeout(async () => {
      this.users = await contentService.getAllAvatars();
    }, 40);
    // contentService.getAllAvatars()
    // .then((res) => this.users = res )
    // .catch((err) => console.log(err));
  }

  getAnon() {
    setTimeout(() => {
      if (this.options) this.addUnregisteredGuestUser();

      if (!this.unregGuest && !this.guest && !this.avatar) {
        console.log(this.guest);
        // create and get anon option here
        if (!this.options) {
          this.options = {
            isAnonymous: true,
            isLiving: true,
          };
          contentService.enableOption(this.options);
        }
        console.log("In ANON!!!!!");
        console.log(this.unregGuest);
        setTimeout(async () => {
          this.anon = await contentService.getandAddAnon();
        }, 1);
      } else {
        console.log("An unregisted guest user is already loged in.");
      }
    }, 1000);
  }
  getUserIp() {
    setTimeout(async () => {
      this.justIp = await contentService.getCurrentUserIP();
      console.log("From getUserIp - " + this.justIp);
    }, 130);
  }

  getGuest(e: string) {
    if (this.options.isUnregistered)
      setTimeout(async () => {
        this.guest = await contentService.getGuestById(-1, e);
      }, 200);
  }

  notice(): string {
    if (this.avatar) {
      return "Write a comment.";
    } else {
      return "Please join to comment.";
    }
  }

  // document.getElementById(this.tags[this.tags.length -1].tagItem)?.scrollLeft;
  // this.tags[this.tags.length -1
  member = false;

  // berforeDestroy() {
  //    setTimeout(async() => {
  //     const result = await contentService.getCurrentUserIP();
  //     if(result)
  //     alert(result)
  //     this.member = true;
  //   },200)
  // }
  finalCounter = 0;
  finalCheck() {
    let remaining;
    if (this.finalCounter < 1) {
      remaining = 2100;
    } else {
      remaining = 9000;
    }
    if (this.finalCounter < 1)
      setTimeout(() => {
        this.getAllCards(this.gallery.length ? this.gallery[0].id : -1);
        this.finalCounter++;
      }, remaining);
  }
  checkHome() {
    setTimeout(() => {
      if (this.options?.isLiving && this.guest || this.avatar) {
        this.galleryShrunk = true;
      } else {
        this.galleryShrunk = false;
      }
    }, 500);
  }

  created() {
    this.getUserIp();
    this.getAllComments();

    this.getAllCards();
    this.getUsers();
    this.getGuestUser();
    // if loging is true then
    this.getAvatar();
    this.getTags();
    this.getThisOption();
    this.addUnregisteredGuestUser();
    this.getAnon(); //
    this.checkHome();
    this.finalCheck();
    this.intro();

    // setTimeout(() => {
    //   if (!this.guest) {
    //     console.log("local storage has been set to 'tom'");
    //     //localStorage.name = "tom";
    //   } else {
    //     console.log("LOCAL STORAGE - not changed");
    //   }
    // }, 1200);

    // ---------------
    // setTimeout(async () => {
    //     this.getAllCards();
    //   }, 1900);
    //this.getAllComments();
  }

  async sendingMessage(content: IContent) {
    if (this.onEdit > 0) {
      console.log("in edit comment");
      let finalResult!: IWriteComment;
      if (this.text && this.text.message != "") {
        finalResult = this.text;
      }

      const result = await contentService.updateMessage(
        finalResult,
        content.id,
        finalResult.id
      );
      if (result === 200) {
        console.log("Comment has been edited!");
        this.replyingStuff(false);
        this.getAllCards(content.id);
      } else {
        console.log("Nothing has been done!!");
      }
    }

    if (this.onEdit === 0) {
      if (content.replyBoxIsActive) {
        console.log("DOES THIS WORK?");
        //console.log("HA - " + this.repMessageBox + " and " + this.avatar);
        console.log("sending REPLY message!!");
        let finalMessage: IWriteComment = {
          message: "",
        };
        let finalReplyBox!: Comment;
        if (this.text && this.text.message != "") {
          this.text.isReply = true;
          this.text.avatarId = this.avatar.id;
          finalMessage = this.text;
          finalReplyBox = this.replyMessageBox;
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
              this.check(content.id);
            }
          });
      } else {
        if (this.text && this.text.message !== "") {
          this.text.isReply = false;

          console.log("seding message!!!");
          this.text.avatarId = this.avatar.id;
          this.text.message !== ""
            ? await contentService.sendNewMessage(this.text, content.id)
            : (content.replyBoxIsActive = false);
          this.getAllCards(content.id);
          this.getTags();
        }
      }
    }
    this.text.message = "";
    this.text.id = -1;
    this.text.avatarId = 0;
    this.onEdit = 0;
    console.log(content.id);
  }

  deletedComment = -1;
  async confirm() {
    this.extendTimeLoggedIn();
    console.log("in confirm");
    console.log(this.commentToDelete);
    this.deletedComment = this.commentToDelete.id;
    //alert(this.comment2Delete.contentId)
    const result = await contentService.deleteThisComment(
      this.commentToDelete.contentId,
      this.commentToDelete.id
    );
    const contentForUpdate = this.comment2Delete.contentId;
    if (this.showCardBox) {
      setTimeout(async () => {
        this.showCardBox = false;
        this.expandCardBox(this.indexx);
      }, 340);
      this.getAllCards(this.tempPostId);
    }
    console.log(
      `Comment id: ${this.commentToDelete.id} has success fully been deleted`
    );
    console.log("report: " + result);
    this.commentToDelete = {
      id: 0,
      contentId: 0,
    };
    this.closeBox();
    this.getAllCards(this.tempPostId);

    console.log("Confirmed!!!");
    console.log("ddd - " + contentForUpdate);
    /// delete comment here
  }

  decline(e: string) {
    this.extendTimeLoggedIn();
    console.log(e);
    console.log("Declined!!");
    this.closeBox();
  }

  closeBox() {
    this.extendTimeLoggedIn();
    console.log("in closed!");
    if (this.messageBox.title?.length) {
      console.log("in in");
      console.log(this.commentToDelete);
      this.messageBox = {
        title: "",
        message: "",
        isActive: false,
      };
    }
  }

  async deleteThisCard(id: number) {
    console.log("in delete card");
    console.log(id);
    const result = await contentService.deleteCard(id);
    console.log(result);
    if (result === 200) {
      console.log("card has been deleted");
      this.cascade = true;
      this.getAllCards(id);
      this.matchHeight();
    } else {
      console.log(`Unable to delete card, status code: ${result}`);
    }
  }

  updated() {
    // console.log("in update in content");
    // console.log("UPDATE GUEST - " + this.guest);

    console.log(localStorage.name);
    console.log(this.$play);

    // if (this.createImage.imageUrl == "") {
    //   this.isLoaded = false;
    // }
    // this.$children[0].checking(); call a method in another component;
    //console.log(this.$children) see which child has which method available

    // if(this.count){
    //   this.getAllCards();
    //   this.count = false;
    // }
  }
  out = false;
  presenceTimer: any;
  checkUserPresence() {
    if (this.out)
      this.presenceTimer = setTimeout(async () => {
        await contentService.checkSession().then((res) => {
          if (!res) {
            if (this.avatar) {
              document.location.reload(true);
            }
          }
        });

        this.out = false;
        this.swapTime();
      }, 300000);
    console.log("hello");
  }

  swapTime() {
    if (this.avatar) {
      console.log("in swap");
      this.out = true;

      this.checkUserPresence();
    }
  }

  // watchers
  beforeUpdate() {
    // if(!this.counter) {
    // this.autoRefresher();
    // this.swapTime();
    // this.counter = true;
    // }
    this.$nextTick().then(() => {
      this.matchHeight();
    });
  }

  isIntro = false;
  intro() {
    this.isIntro = true;
  }
  happy: any;
  mounted() {
    //this.getAllComments();
    this.actionOn = true;

    window.onresize = () => {
      this.matchHeight();
    };
    window.onscroll = () => {
      this.checkWindowScroll();
    };
    if (!this.isIntro) {
      window.addEventListener("click", (e) => {
        console.log(e.target.className);
        if (e.target.className == "bg") {
          this.closeCard();
        }

        this.extendTimeLoggedIn();
      });
    }
    // setTimeout(() => {
    //   this.userInfo = "happr gaga";
    // }, 500);
    // setTimeout(async() => {
    // await this.$store.dispatch('loadAPIResult').then(res => {this.happy = res;})
    // console.log("from happy -" +this.happy)
    // },1)
  }

  windowClicked() {
    console.log("Working!");
    document.getElementById("cardFocus");
  }

  checkWindowScroll() {
    if (window.scrollY > 500 && window.scrollY < 1000) {
      this.controlVisible = true;
    } else {
      this.controlVisible = false;
    }
  }

  matchHeight() {
    console.log("in match height");
    const height = this.$refs.infoBox.clientWidth;
    const scrollW = this.$refs.infoBox.scrollWidth;
    console.log(height);
    console.log(scrollW);
    if (height < scrollW - 160) {
      this.showArrow = true;
      console.log("CHANGES MADE HERE!!!!");
    } else {
      this.showArrow = false;
      console.log("NOTHING CHANGED");
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
$transitions: cubic-bezier(0.68, -0.6, 0.32, 1);

* {
  font-family: "Roboto", sans-serif;
}

.member_container {
  display: flex;
  justify-content: center;

  .member_box {
    position: absolute;
    top: 190px;
    z-index: 10;
  }
}

.settings_bar {
  position: fixed;
  top: 30px;
  left: 3%;
  z-index: 7;
}

.action_bar {
  position: fixed;
  top: 10px;
  right: 5%;
  z-index: 20;
}

.card_focus {
  position: fixed;
  background-color: rgb(0, 0, 0);
  width: 60%;
  min-width: 200px;
  max-width: 90%;
  max-height: 80%;
  min-height: 100px;
  top: 150px;
  z-index: 7;
  border: 2px solid white;
  border-radius: 15px;
  display: block;
  flex-flow: row wrap;
  overflow: scroll;
  transform: scale(0.4);
  opacity: 0;
  transition: ease-in;

  img {
    max-width: 900px;
  }

  .expand_image {
    position: absolute;
    background-color: #fff;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    margin: 10px;
    display: flex;
    justify-content: center;
    opacity: 0.5;
    cursor: pointer;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);

    img {
      width: 70%;
    }
  }

  .fill {
    object-fit: contain;
    width: 100%;
    height: 100%;
    max-height: 550px;
    display: inline-block;
    justify-content: center;
  }

  .image_message {
    position: relative;
    color: white;
  }

  .blog_wrapper {
    background-color: #fff;
    width: 100%;
    min-height: 500px;
    display: inline-block;
    padding-top: 30px;

    .blog_wrapper_box {
      width: 100%;
      height: 100%;
      text-align: left;

      .title {
        display: flex;
        justify-content: center;
        h1 {
          position: absolute;
          margin-top: 15%;

          color: #fff;
          font-size: 3em;
          text-align: center;
          z-index: 1;
        }
      }

      h3 {
        padding-top: 10px;
        padding-bottom: 10px;
        margin: 0 10%;
      }

      .blog_avatar_area {
        position: absolute;
        background-color: green;
        padding: 4px 10px 4px 2px;
        font-size: 0.9em;
        color: white;
        margin: 0 10%;

        //border-radius: 15px;

        .blog_avatar_icon {
          background-color: #fff;
          padding: 1px;
          border-radius: 50%;

          img {
            position: relative;
            margin-top: -10px;
            top: 5px;
          }
        }

        .blog_avatar_name {
          padding-left: 5px;
        }
      }

      .blog_banner {
        position: relative;
        left: 0px;

        img {
          height: 350px;
          width: 100%;
          object-fit: cover;
          object-position: left top;
          filter: brightness(50%);
        }
      }

      .blog_post_content {
        margin-top: 90px;
        width: 80%;
        margin: 90px auto;
      }

      .blog_published {
        position: absolute;
        margin: 30px 10%;
        font-size: 0.8em;
      }

      .blog_updated {
        position: absolute;
        margin: 45px 10%;
        font-size: 0.8em;
        font-weight: 600;
      }
    }
  }

  .comment_visibility {
    position: absolute;
    background-color: rgb(255, 121, 121);
    padding: 8px;
    z-index: 1;
    right: 10px;
    top: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.45);
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s;

    &:hover {
      opacity: 0.9;
    }

    .opened_eye {
      width: 30px;
    }

    .closed_eye {
      position: relative;
      width: 30px;
      top: 4px;
      left: 1px;
    }

    &:active {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.45);
    }
  }

  .caption_area {
    position: sticky;
    width: 90%;
    height: 200px;
    background-color: #fff;
    bottom: 10px;
    border-radius: 20px;
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.25);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    transition: 0.4s;
    transition-timing-function: $transitions;
    z-index: 3;

    .card_title {
      position: absolute;
      background-color: rgb(242, 242, 242);
      max-width: 170px;
      min-height: 70px;
      top: -30px;
      left: 10px;
      border-radius: 10px;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
      z-index: 2;

      p {
        padding: 5px 10px;
        margin: 0;
      }

      .title {
        font-size: 1.1em;
      }

      .title-divider {
        border-top: 2px solid rgb(90, 90, 90);
        border-radius: 2px;
        width: 90%;
        margin: 0 auto;
      }

      .posted_on {
        font-size: 0.7em;
      }
    }

    .card_decription {
      position: absolute;
      background-color: rgb(243, 243, 243);
      min-width: 50px;
      max-width: 40%;
      height: 60px;
      z-index: 2;
      padding: 0 15px;
      display: flex;
      justify-content: center;
      border-radius: 20px;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
      top: -18px;

      span {
        margin: 10px 0;
      }
    }

    .toggle_box {
      position: absolute;
      background-color: rgb(155, 155, 155);
      width: 15px;
      height: 15px;
      right: 10px;
      top: 10px;
      border-radius: 4px;
      border: 3px solid rgb(21, 21, 21);
      cursor: pointer;
      transition: 0.2s ease-in;
      z-index: 2;
    }
    .toggle_box_active {
      height: 3px;
      border: 3px solid rgb(177, 33, 33);
    }

    .toggle_box:hover {
      border: 3px solid rgb(136, 136, 136);
    }

    .views_caption {
      position: absolute;
      height: 50px;
      width: 60px;
      top: -10px;
      right: 120px;
      background-color: white;
      border-radius: 15px;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
      padding-bottom: 6px;
      padding: 0 2px;
      z-index: 2;
      display: flex;
      justify-content: center;
      gap: 3px;
      font-weight: 600;

      .title-divider {
        border-top: 2px solid rgb(90, 90, 90);
        border-radius: 2px;
        width: 90%;
        margin: 0 auto;
      }

      img {
        position: relative;
        top: 6px;
        width: 20px;
      }
    }

    .comment_count {
      position: absolute;
      background-color: rgb(255, 255, 255);
      border-radius: 20px;
      width: 60px;
      height: 30px;
      right: 40px;
      top: -10px;
      padding: 0 5px;
      display: block;
      justify-content: center;
      font-weight: 600;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
      z-index: 2;

      img {
        position: relative;
        top: 5px;
        width: 20px;
      }
    }

    .comment_section {
      position: relative;
      background-color: rgb(242, 242, 242);
      overflow: scroll;
      width: 90%;
      height: 90%;
      margin: 0 auto;
      top: 14px;
      display: block;
      justify-content: center;

      .comment_avatar_image {
        position: absolute;
        background-color: rgb(255, 255, 255);
        width: 25px;
        height: 25px;
        margin: 28px 48%;
        border-radius: 50%;
        border: 2px solid rgb(196, 196, 196);
        display: block;
        justify-content: center;

        .user_profile {
          width: 35px;
          margin-top: -10px;
          margin-left: -5px;
          filter: drop-shadow(0 0 0.2rem rgb(38, 38, 38));
        }

        .edit_box {
          position: absolute;
          background-color: #fff;
          border: 2px solid rgb(196, 196, 196);
          padding: 3px 10px;
          border-radius: 15px;
          left: 50px;
          top: -2px;
          width: 40px;

          span {
            img {
              cursor: pointer;
            }
            .create {
              width: 15px;
            }
          }
        }
      }

      .comment_box {
        background-color: rgb(196, 196, 196);
        min-width: 100px;
        max-width: 500px;
        min-height: 30px;
        margin: 20px auto;
        border-radius: 10px;
        display: inline-block;
        padding: 10px 15px;

        span {
          padding: 0;
          min-width: 30px;
        }

        .message {
          img {
            border-radius: 10px;
            padding: 5px;
            width: 100%;
          }
        }

        .comment_content {
          max-width: 100%;
          max-height: 200px;
          border-radius: 8px;
        }

        .reply_caption {
          min-width: 100px;
          background-color: #fff;
          font-size: 0.75em;
          padding-right: 10px;
          border-radius: 10px;
          display: inline-block;
          justify-content: center;
          margin: 0 auto;

          span {
            color: black;
          }

          .name {
            background-color: rgb(48, 48, 48);
            padding: 0 5px;
            color: white;
            border-radius: 10px 0 0 10px;
          }
        }
      }

      .user_comment_box {
        background-color: rgb(68, 68, 68);
        color: white;
      }

      .comment_box:nth-child(2) {
        margin-top: 50px;
      }

      .comment_box:last-child() {
        margin-bottom: 15px;
      }

      .comment_appears {
        transform: scale(1);
        visibility: visible;
        opacity: 1;
        transition: 0.3s;
        transition-timing-function: $transitions;
      }

      .comment_disappears {
        transform: scale(0.4);
        visibility: hidden;
        opacity: 0;
        transition: 0.3s;
        transition-timing-function: $transitions;
      }

      .posted_on {
        padding: 0;
        margin-top: -20px;
        font-size: 0.8em;
      }

      .like_reply_area {
        position: relative;
        background-color: rgb(233, 233, 233);
        width: 70px;
        height: 20px;
        border-radius: 10px;
        margin: 0px auto;
        margin-bottom: 10px;
      }

      .no_comments {
        position: relative;
        background-color: rgb(255, 255, 255);
        width: 250px;
        height: 80px;
        margin: 35px auto;
        border-radius: 10px;
        display: block;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);

        transition: 0.2s ease-in-out;

        p {
          padding: 0;
          margin: -10px 0;
        }

        h2 {
          padding-top: 10px;
          margin: 10px 0;
        }
      }

      .no_comments_on_expand {
        margin-top: 150px;
      }
    }

    .comment_response_message {
      position: absolute;
      background-color: rgb(247, 247, 247);
      bottom: 45px;
      padding: 0 16px;
      border-radius: 10px 10px 0 0;
      display: inline-block;
      max-width: 300px;
      box-shadow: 0 0px 15px rgba(0, 0, 0, 0.25);

      .cancel_container {
        position: absolute;
        width: 35px;
        height: 35px;
        background-color: #fff;
        z-index: 2;
        top: 5px;
        right: -45px;
        border: 3px solid black;
        border-radius: 50%;
        box-shadow: 0 5px 8px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        display: flex;
        justify-content: center;

        img {
          width: 20px;
        }
      }
    }

    .cancel_box {
      position: absolute;
      background-color: red;
      color: white;
      bottom: 50px;
      padding: 8px 15px;
      border-radius: 20px;
      border: 3px solid white;
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      z-index: 2;
    }

    .write_comment_area {
      position: absolute;
      background-color: rgb(252, 252, 252);
      width: 80%;
      height: 43px;
      bottom: 5px;
      border-radius: 20px;
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.25);

      display: block;

      .avatar_profile {
        position: relative;
        background-color: #fff;
        height: 30px;
        width: 30px;
        float: left;
        left: 5px;
        top: 4px;
        border: 3px solid rgb(51, 51, 51);
        border-radius: 50%;

        img {
          margin-left: -5px;
          margin-top: -5px;
          filter: drop-shadow(0 0 0.2rem rgb(38, 38, 38));
        }
      }

      .more_comments {
        position: absolute;
        background-color: rgb(255, 255, 255);
        display: flex;
        justify-content: center;
        width: 35px;
        height: 35px;
        right: -20px;
        bottom: 45px;
        border-radius: 50%;
        border: 3px solid grey;
        box-shadow: 0 7px 13px rgba(0, 0, 0, 0.55);
        transition: 0.2s all;
        cursor: pointer;

        &:active {
          box-shadow: 0 2px 3px rgba(0, 0, 0, 0.55);
        }

        img {
          margin-top: 2px;
          width: 20px;
          transform: rotate(180deg);
        }
      }

      input[type="text"] {
        position: relative;
        border: none;
        background: none;
        width: 50%;
        height: 30px;
        border-bottom: 3px solid red;
        transition: 0.2s ease-in-out;
      }
      input:focus {
        width: 70%;
        outline: none;
        border-bottom: 2px solid green;
      }
      .send_button {
        position: relative;
        top: 10px;
        left: 3px;
        cursor: pointer;
        color: green;
      }
    }
  }

  .caption_expand_area {
    height: 450px;
  }
}
.card-background:nth-child(2) {
  background-color: #fff;
}

.flag {
  position: fixed;
  top: 20%;
  z-index: 7;
}
.contact_title {
  position: absolute;
  background: rgb(228, 228, 228);
  top: 30px;
  left: 70px;
  min-width: 150px;
  height: 90px;
  border-radius: 20px;
  z-index: 2;
  display: inline-block;

  p {
    padding: 0px 30px 0px 30px;
    position: relative;
    bottom: 27px;
    font-size: 2.8em;
  }
}

.bottom {
  position: relative;
  bottom: 50px;
  background-image: linear-gradient(to bottom, transparent, black);
  width: 100%;
  height: 50px;
}
.close_box {
  position: sticky;
  background-color: #fff;
  width: 100%;
  height: 30px;
  left: 10px;
  top: 0px;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 5px;

  span {
    position: relative;
    background-color: rgb(116, 118, 116);
    width: 50%;
    display: inline-block;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: rgb(82, 82, 82);
    }

    &:nth-child(1) {
      background-color: rgb(90, 90, 90);

      &:hover {
        background-color: rgb(51, 51, 51);
      }
    }

    label {
      position: relative;
      font-size: 1.3em;
      font-weight: 500;
      top: 2px;
      color: white;
      display: inline-block;
      justify-content: center;
      cursor: pointer;
    }
  }
  .voted {
    background-color: rgb(7, 136, 50);
    &:hover {
      background-color: rgb(5, 102, 38);
    }
  }

  // .vote_span {
  //   position: absolute;
  //   font-weight: 500;
  //   font-size: 1.3em;
  //   background-color: blue;
  //   padding: 0 10px 0 10px;
  //   width: 45%;
  //   height: 30px;
  //   right: 0px;
  // }
  // .close_span {
  //   position: absolute;
  //   font-weight: 500;
  //   font-size: 1.3em;
  //   background-color: rgb(255, 60, 0);
  //   padding: 0 10px 0 10px;
  //   width: 45%;
  //   height: 30px;
  //   left: 0px;
  // }

  svg {
    margin: -3px 0;
    width: 20px;
    padding: 2px 10px;
  }
}

.card_focused {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
  transition-timing-function: $transitions;
}

.card_leave {
  transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.25s;
  transition-timing-function: $transitions;
}

.card_blog {
  background-color: #fff;
}

.empty_cards {
  background-color: #fff;
  width: 300px;
  height: 100px;
  margin: 200px auto;
  border-radius: 20px;
  border: 5px solid grey;

  span {
    position: relative;
    top: 35px;
    font-size: 1.5em;
  }
}

.type_select {
  position: absolute;
  left: 0px;
  background-color: rgb(175, 175, 175);
  padding: 6px;
  width: 24px;
  height: 24px;
  top: -38px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;

  img {
    width: 15px;
  }
}

.search_section {
  position: absolute;
  //background-color: red;
  width: 50%;
  height: 100px;
  left: 5%;
  z-index: 1;
}
.search_type {
  position: absolute;
  background-color: rgb(242, 242, 242);
  border-radius: 20px;
  top: 50px;
  left: 5.5%;
  z-index: 6;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.55);

  .type {
    margin-top: 5px;
    cursor: pointer;
    padding: 3px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;

    img {
      width: 15px;
    }

    &:nth-child(1) {
      margin-top: 0;
    }
  }
  .type_hover {
    background-color: green;
    border-radius: 50%;

    //  &:nth-child(1) {
    //   border-radius: 20px 20px 5px 5px;
    //  }
    //  &:nth-last-child(1) {
    //   border-radius: 5px 5px 20px 20px;
    //  }
  }
}

.serach_visibility {
  visibility: visible;
}

.search_bar_section {
  position: absolute;
  width: 400px;
  height: 40px;
  top: 10px;
  //background-color: blue;

  input[type="text"] {
    border: none;
    position: relative;
    border-radius: 30px;
    width: 250px;
    height: 40px;
    padding: 0 40px;
    right: 33px;
    font-size: 1em;
  }

  input:focus {
    outline: none;
  }

  .search_button {
    background-color: rgb(5, 109, 0);
    width: 60px;
    height: 36px;
    right: 72px;
    top: 2px;
    border-radius: 20px;
    position: absolute;
    padding: 0 10px;
    transition: 0.2s;
    cursor: pointer;

    p {
      position: relative;
      bottom: 7px;
      color: white;
      transition: 0.2s;
    }
  }

  .reset_search {
    position: absolute;
    background-color: rgb(209, 209, 209);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 160px;
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.25);
    transition: 0.2s;
    cursor: pointer;
    z-index: 3;

    img {
      position: relative;
      top: 7px;
    }
  }

  .reset_search:hover {
    background-color: rgb(245, 245, 245);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
  }

  .search_button:hover {
    background-color: rgb(8, 165, 0);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
  }

  .search_button:active {
    background-color: rgb(6, 82, 2);
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.25);
  }
}

.tags_section {
  position: absolute;
  top: 40px;
  width: 330px;
  height: 40px;
  float: left;
  left: 5%;
  z-index: 5;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
  }

  .hide_bar {
    overflow: hidden;
  }

  li {
    display: inline-block;
  }
  .tag_item {
    margin-left: 5px;
    background-color: #fff;
    line-height: 25px;
    max-width: 150px;
    width: auto;
    padding: 3px 10px;
    border-radius: 20px;
    border: 3px solid green;
    white-space: pre-wrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: 0.2s;
  }

  .tag_item:hover {
    background-color: rgb(1, 177, 1);
    color: white;
  }

  .tag_item:focus {
    background-color: green;
  }
  .current {
    background-color: rgb(1, 106, 1);
    color: #fff;
  }

  .tag_number {
    position: relative;
    background-color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid green;
    margin: 0 10px;
    top: 13px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }
}
.tags_arrow {
  background-color: rgb(0, 160, 0);
  width: 45px;
  height: 45px;
  position: absolute;
  margin: -52px 320px;
  border-radius: 50%;
  z-index: 5;
  border: 3px solid rgb(255, 255, 255);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  transition: 0.2s;
  cursor: pointer;

  .arrow {
    width: 25px;
    transition: 0.2s ease-in-out;
  }

  .flip_arrow {
    transform: rotate(180deg);
  }
}

.like_icons {
  margin-top: 2px;
  height: 15px;
  transition: 0.2s ease-in;
  cursor: pointer;
}

.like_icons:hover {
  transform: scale(1.1);
}

.like_icons:active {
  transform: scale(0.8);
}

.tags_arrow:hover {
  background-color: rgb(0, 143, 0);
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.25);
}

.tags_arrow:active {
  background-color: rgb(0, 92, 0);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
}

.tag_title {
  position: absolute;
  background: rgb(231, 231, 231);
  top: 35px;
  right: 70px;
  width: 250px;
  height: 70px;
  border-radius: 20px;
  z-index: 2;
}

.tag_title p {
  position: relative;
  bottom: 27px;
  font-size: 2.5em;
}
.anchor {
  display: block;
  position: relative;
  top: -80px;
  visibility: hidden;
}

.gallery-box {
  margin: 0 auto 20px;
  position: relative;
  background-color: rgb(54, 54, 54);
  height: 700px;
  width: 90%;
  top: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  transition: 0.5s;
  transition-timing-function: $transitions;
}

.shrink_box {
  height: 80px;
}

.test_button {
  position: absolute;
}

.first-box {
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  display: block;
  justify-content: center;
  mask-image: radial-gradient(
    ellipse 90% 95% at 50% 55%,
    black 40%,
    transparent 98%
  );
  

  .logo_content_wrapper {
    transition: all 0.3s ease-in-out;
    .logo_container {
      display: flex;
      justify-content: center;

      .logo {
        width: 500px;
        transition: 0.5s;
        transition-timing-function: $transitions;
      }
    }
    .links_to_profiles {
      position: absolute;
      width: 50%;
      height: 100px;
      z-index: 6;
      left: 25%;
      bottom: 10%;
      transition: 0.5s;
      transition-timing-function: $transitions;

      ul {
        display: flex;
        justify-content: center;
        gap: 20%;
        padding: 0;
        margin-top: 10px;

        li {
          list-style: none;
          width: 65px;
          height: 60px;
          font-weight: bold;
          color: green;

          a {
            text-decoration: none;
            &:visited {
              color: green;
            }
          }

          .little_icon {
            width: 40px;
          }
        }
      }
    }
    .shrink_logo {
      .logo {
        position: relative;
        bottom: 30px;
        width: 100px;
      }
    }
    .on_hover {
      .logo {
        position: relative;
        bottom: 100px;
        width: 100px;
      }
    }
    .shift_profile {
      // top: 5%;
      // width: 30%;
      // left: 5%;
      bottom: -100px;
    }
    .on_enter {
      bottom: -25px;
    }
  }
}

.shrink_first {
  mask-image: radial-gradient(
    ellipse 10% 95% at 50% 55%,
    black 10%,
    transparent 598%
  );
  transition: all 0.3 ease-in;
}

.message_container {
  margin: 20px 10px;
}

.message_box {
  background-color: rgb(206, 206, 206);
  width: 350px;
  height: 190px;
  border: 5px solid white;
  border-radius: 10px;
  position: fixed;
  top: 180px;
  margin: auto -180px;
  display: inline-block;
  box-shadow: 0 35px 15px rgba(0, 0, 0, 0.25);
  z-index: 10;
  transition: 0.3s;

  .message_title {
    font-size: 2em;
    margin: 0;
    padding: 10px 0;
    position: relative;
  }

  .message_text {
    margin: 0;
    padding: 10px 0;
    position: relative;
  }

  .message_buttons {
    position: relative;
    margin: 0 20px;
    justify-content: center;
    display: flex;
  }
}

.on_appear {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
  transition-timing-function: $transitions;
}

.on_disappear {
  transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.25s;
  transition-timing-function: $transitions;
}

.close {
  background-color: rgb(238, 232, 232);
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
  z-index: 3;
}

.card-background {
  position: relative;
  margin: 20px auto;
  background-color: rgb(181, 181, 181);
  width: 98%;
  height: 525px;
  top: 70px;
  white-space: nowrap;
  overflow: auto;
  border-radius: 10px;
  z-index: 1;
  scroll-behavior: smooth;
}

.card_arrow_container {
  .card_arrow {
    position: absolute;
    background-color: rgb(0, 163, 0);
    width: 50px;
    height: 80px;
    border: 3px solid white;
    top: 50%;
    right: -20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
    fill: black;
    transition: 0.2s ease-in-out;
    z-index: 2;
    opacity: 0.5;

    svg {
      margin-top: 50%;
      transition: 0.3s;
    }
    .roatate_arrow {
      transform: rotate(180deg);
    }
  }

  .card_arrow:hover {
    background-color: rgb(1, 100, 1);
    box-shadow: 0 10px 8px rgba(0, 0, 0, 0.25);
    opacity: 1;
    fill: white;
  }

  .card_arrow:active {
    background-color: rgb(0, 67, 0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    opacity: 1;

    fill: white;
  }
}

.hide_scroll {
  overflow: hidden;
}

.more {
  position: absolute;
  background-color: green;
  padding: 10px 18px;
  right: -20px;
  z-index: 4;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  border: 3px solid white;
  top: 42%;

  img {
    width: 15px;
  }
}

.enter_more {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
  transition-timing-function: $transitions;
}
.leave_more {
  transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.25s;
  transition-timing-function: $transitions;
}

.control_block {
  position: fixed;
  width: 80px;
  height: 80px;
  bottom: 100px;
  right: 10px;
  display: flex;
  justify-content: center;
  z-index: 6;

  .blog_btn {
    position: absolute;
    background-color: #fff;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    margin: -50px 0px;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    cursor: pointer;

    &:active {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }
  }

  .control_room {
    background-color: rgb(213, 89, 6);
    position: absolute;
    justify-content: center;
    width: 55px;
    height: 55px;
    top: 5px;
    border: 4px solid white;
    border-radius: 50%;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    transition: 0.3s;
    cursor: pointer;
  }

  .control_room:hover {
    background-color: rgb(245, 98, 0);
    box-shadow: 0 15px 8px rgba(0, 0, 0, 0.25);
  }

  .control_room:active {
    background-color: rgb(148, 60, 2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }
  .round_btn {
    display: flex;
  }

  img {
    width: 30px;
  }
}

.btn_leave {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.25s;
  transition-timing-function: $transitions;
}

.blog_outer {
  display: flex;
  justify-content: center;

  .fade-enter-active {
    transition: opacity 0.4s ease-in-out;
  }

  .fade-enter-to {
    opacity: 1;
  }

  .fade-enter {
    opacity: 0;
  }

  .blog_thumbnail {
    position: absolute;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    right: 85px;
    top: 40px;
    border-radius: 8px;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.25);
    transition: width 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8),
      height 800ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

    .thumb_visibility {
      position: absolute;
      background-color: green;
      padding: 5px 10px;
      margin: -20px 8%;
      border-radius: 20px;
      color: white;
      box-shadow: 0 6px 9px rgba(0, 0, 0, 0.25);
      cursor: pointer;
    }

    .thumbnail_preview {
      background-color: #fff;
      padding: 5px;
      margin: 3px auto;
      width: 230px;
      transition: width 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8),
        height 800ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 0;
        border-radius: 10px;
      }
    }

    .preview_shrink {
      height: 0;
      width: 50;
    }

    input {
      outline: none;
      border: none;
      font-size: 1em;
      width: 100%;
    }
  }

  .small_thumb {
    right: 45px;

    .thumbnail_preview {
      width: 130px;
    }
  }
  .thumb_view {
    right: -10px;
    top: -10px;
    visibility: hidden;
    transform: scale(0.4);
    opacity: 0;
    transition: 0.3s;
    transition-timing-function: $transitions;
  }
  .thumb_view_show {
    visibility: visible;
    transform: scale(1);
    opacity: 1;
    transition: 0.25s;
    transition-timing-function: $transitions;
  }

  .thumb_btn {
    position: absolute;
    background-color: rgb(162, 162, 162);
    width: 50px;
    height: 50px;
    right: 30px;
    top: 40px;
    border-radius: 50%;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    cursor: pointer;
    z-index: 3;

    .add {
      width: 20px;
    }

    .bin {
      width: 15px;
    }
  }

  .thumb_btn_rotate {
    .add {
      transition: 0.3s;
      transition-timing-function: $transitions;
      transform: rotate(135deg);
    }
  }

  .thumbnail_label {
    position: absolute;
    background-color: rgb(46, 46, 46);
    right: 10px;
    margin-top: 80px;
    width: 80px;
    padding: 2px 5px;
    border-radius: 8px;
    color: white;
    box-shadow: 0 2px 9px rgba(0, 0, 0, 0.25);
    transition: all 0.3s;

    &::before {
      content: " ";
      background-color: rgb(46, 46, 46);
      width: 10px;
      height: 10px;
      margin: 0 10px;
      position: absolute;
      transform: rotate(45deg);
      top: -5px;
    }
  }

  .blog_header {
    position: absolute;
    left: 30px;
    top: 10px;
    background-color: rgb(104, 33, 0);
    padding: 10px 15px;
    color: white;
    font-size: 1em;
    border-radius: 20px;
  }

  .blog_box {
    position: fixed;
    top: 100px;
    background-color: rgb(213, 213, 213);
    border-radius: 15px;
    padding: 20px 5px;
    width: 70%;
    min-width: 300px;
    max-width: 800px;
    min-height: 70%;
    max-height: 800px;
    display: inline-block;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

    .blog_container {
      padding: 10px;
      height: 550px;
      display: block;
      justify-content: center;

      .input_type_container {
        display: flex;
        justify-content: center;

        .input_type_area {
          position: absolute;
          background-color: #fff;
          padding: 10px;
          border-radius: 10px;
          margin: -40px 0;
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.25);

          input {
            outline: none;
            border: none;
            font-size: 1em;
          }

          .close_tool {
            position: relative;
            margin: 0;
            padding-left: 7px;
            top: 2px;
            cursor: pointer;

            img {
              margin: 0;
              padding: 0;
            }
          }
        }
      }

      .input_leave {
        transform: scale(0.4);
        visibility: hidden;
        opacity: 0;
        transition: 0.3s;
        transition-timing-function: $transitions;
      }

      .input_enter {
        transform: scale(1);
        visibility: visible;
        opacity: 1;
        transition: 0.3s;
        transition-timing-function: $transitions;
      }

      .preview_box {
        background-color: #fff;
        padding: 30px;
        height: 370px;
        border-radius: 10px;
        display: block;
        text-align: left;
        overflow-y: scroll;

        h1 {
          margin: 10px 0;
        }

        h3 {
          color: rgb(107, 107, 107);
        }
      }

      .tool_box {
        background-color: #fff;
        height: 40px;
        margin: 10px 0px;
        padding: 5px 4px;
        display: flex;
        border-radius: 10px;
        overflow-x: scroll;
        overflow-x: overlay;
        overflow-y: hidden;

        input {
          width: 100px;
          height: 32px;
          border-radius: 20px;
          padding: 2px 10px;
          outline: none;
          border: none;
          font-size: 1.05em;
        }

        .tool_btn {
          display: flex;

          .tool_tag {
            background-color: green;
            border-radius: 8px;
            padding: 10px 10px;
            margin: 0 2px;
            white-space: nowrap;
            color: white;
            cursor: pointer;
          }
        }
      }

      .blog_entry {
        background-color: #fff;
        padding: 10px 0;
        margin: 10px 0;
        display: flex;
        justify-content: center;
        border-radius: 10px;

        .blog_avatar {
          height: 35px;
          width: 35px;
          background-color: green;
          margin: 0 5px;
          border-radius: 15px;
        }

        input {
          width: 60%;
          height: 32px;
          border-radius: 20px;
          padding: 0 10px;
          outline: none;
          border: none;
          font-size: 1.05em;
        }

        button {
          margin-left: 5px;
        }
      }
    }
  }

  .blog_opened {
    transform: scale(1);
    visibility: visible;
    opacity: 1;
    transition: 0.3s;
    transition-timing-function: $transitions;
  }
  .blog_closed {
    transform: scale(0.4);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    transition-timing-function: $transitions;
  }
}

.control_box {
  background-color: rgb(225, 225, 225);
  min-height: 455px;
  width: 75%;
  z-index: 7;
  position: fixed;
  display: inline-block;
  justify-content: center;
  right: 30%;
  border-radius: 10px;
  top: 100px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  .control_box_container {
    position: absolute;
    width: 99%;
    height: 290px;
    border-radius: 10px;

    .edit_icon_area {
      background-color: #fff;
      width: 80px;
      height: 70px;
      display: flex;
      justify-content: center;
      float: right;
      margin-right: 5px;
      border-radius: 8px;

      .edit_icon {
        background-color: rgb(245, 245, 245);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 5px 10px 0;
        border: 3px solid rgb(47, 153, 51);
        display: flex;
        justify-content: center;

        img {
          width: 20px;
        }
      }
      span {
        position: absolute;
        width: 47px;
        height: 20px;
        top: 50px;
        padding-top: 4px;
        border-radius: 10px;
        font-size: 0.8em;
        font-weight: 700;
      }
    }

    .image_collection {
      background-color: rgb(245, 245, 245);
      width: 70%;
      height: 70px;
      border-radius: 10px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      padding: 0 5px;
      overflow: auto;

      .image_box {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        margin: 0 2px;

        // .image_in_box {
        //   cursor: pointer;
        // }

        // .image_in_box:hover {
        //   filter: brightness(0.4);
        //   opacity: 1;
        //   transition: 0.2s ease-in-out;
        // }
        .indicator {
          position: absolute;
          opacity: 0;
          width: 70px;
          height: 70px;
          top: 0;
          border-radius: 10px;
          background-color: #fff;
          cursor: pointer;
          transition: 0.2s ease-in-out;

          img {
            margin-top: 10px;
            width: 50px;
            height: 50px;
          }
        }

        .indicator:hover {
          opacity: 0.3;
        }

        .indicator-editing {
          opacity: 0.5;
        }

        .remove_image {
          position: absolute;
          background-color: #fff;
          margin: 5px 5px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          cursor: pointer;
          opacity: 0.5;
          z-index: 3;

          img {
            margin: auto auto;
            width: 10px;
            height: 10px;
          }
        }
        .description_indicator {
          position: absolute;
          background-color: rgb(255, 255, 255);
          margin: -23px 14px;
          border-radius: 8px;
          opacity: 0.6;
          font-size: 0.7em;
          padding: 0 8px;
        }

        .remove_image:hover {
          opacity: 1;
        }

        img {
          border-radius: 10px;

          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 0;
        }
      }
    }

    .input_area {
      position: relative;
      width: 100%;
      height: 185px;
      top: 0px;
      display: block;

      ul {
        margin: 0;
      }

      li {
        position: relative;
        list-style: none;
        display: flex;
        left: -20px;

        input[type="text"] {
          position: relative;
          width: 40%;
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
          width: 90%;
          height: 60px;
          padding: 10px;
          border: none;
          margin: 0 auto;
        }
      }
      .tag_input_area {
        //background-color: blue;
        width: 100%;
        height: 50px;
        display: flex;

        input[type="text"] {
          width: 20%;
        }

        .tag_list {
          //background-color: #fff;
          width: 70%;
          overflow: auto;
          display: flex;
          justify-content: left;
        }

        .tag {
          background-color: rgb(253, 253, 253);
          min-width: 20px;
          height: 23px;
          border-radius: 10px;
          padding: 12px 10px 0 10px;
          display: inline-block;
          margin: 2px 3px;
          border: 3px solid green;

          .remove_tag {
            background-color: rgb(247, 247, 247);
            width: 14px;
            height: 13px;
            border-radius: 5px;
            margin: -30px -8px;
            opacity: 0.7;
            border: 1px solid green;
            display: flex;
            justify-content: center;
            cursor: pointer;

            img {
              width: 60%;
            }
          }
        }
        .tag_button {
          background-color: #fff;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          margin-left: 3px;
          cursor: pointer;
        }
      }

      .btn_group {
        position: relative;
        top: 15px;
        display: flex;
        justify-content: center;
      }
    }

    .pic_box {
      position: relative;
      background-color: #fff;
      width: 98%;
      height: 20%;
      top: 2%;
      border-radius: 10px;
      margin: 0 auto;
      display: inline-block;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
        object-position: 50% 40%;
      }

      .no_image img {
        margin-top: 5px;
        width: 50px;
        height: 50px;
      }

      .fade-enter-active {
        transition: opacity 0.4s ease-in-out;
      }

      .fade-enter-to {
        opacity: 1;
      }

      .fade-enter {
        opacity: 0;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 8px;
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
@media only screen and (max-width: 1790px) {
  .control_box {
    left: 30%;
  }
}
@media only screen and (max-width: 1600px) {
  .control_box {
    left: 25%;
  }
}

@media only screen and (min-width: 1300px) {
  .content-container {
    margin: 0 auto;
    width: 1300px;
  }
}

@media only screen and (min-width: 1140px) {
  .card_focus {
    max-width: 900px;
  }
}

@media only screen and (max-width: 850px) {
  .tag_title {
    opacity: 0;
    transition: 0.1s ease-in-out;
  }
  .control_box {
    left: 25%;
  }
}

@media only screen and (min-width: 900px) {
  .caption_area {
    max-width: 700px;
  }
  .control_box {
    width: 700px;
  }
}

@media only screen and (max-width: 1100px) {
  .control_box {
    left: 15%;
  }
}

@media only screen and (max-width: 1170px) {
  .card_focus {
    width: 80%;
  }
}

@media only screen and (max-width: 970px) {
  .card_focus {
    width: 90%;
  }
  .caption_area {
    .card_decription {
      border-radius: 50%;
      visibility: hidden;
    }
  }
  .control_box {
    left: 10%;
  }
}

.alert_box {
  position: fixed;
  top: 20px;
  left: 20%;
  z-index: 20;
}

@media only screen and (max-width: 420px) {
  .card_focus {
    width: 90%;
  }
  .control_box {
    left: 10%;
  }
  .caption_area {
    .views_caption {
      visibility: hidden;
    }

    .comment_count {
      margin-right: -5px;
    }
  }

  .contact_title {
    padding-top: 10px;
    font-size: 0.8em;
    height: 80px;
    left: 15%;
  }
  .blog_outer {
    .blog_thumbnail {
      right: 10px;
      width: 140px;
      padding: 2px;
      .thumbnail_preview {
        width: 100px;
      }
      input {
        width: 90%;
      }
    }
    .small_thumb {
      right: 25px;

      .thumbnail_preview {
        padding: 0;
        margin: 0;
        width: 100%;
      }
    }
    .thumbnail_label {
      top: 5px;
      padding: 2px 2px;
      right: -20px;
      font-size: 0.8em;
    }

    .thumb_btn {
      right: -5px;
    }
  }
}

@media only screen and (max-height: 1070px) {
  .card_focus {
    width: 80%;
    top: 80px;
  }
}

@media only screen and (max-height: 760px) {
  .card_focus {
    width: 80%;
    top: 80px;
  }
}

@media only screen and (max-height: 760px) {
  .card_focus {
    top: 50px;
  }
}

@media only screen and (max-height: 640px) {
  .card_focus {
    top: 30px;
  }
}

// @media only screen and (max-width: 520px) {
//   .action_bar {
//     top: 700px;
//   }

// }

// @media only screen and (max-width: 1700px) {
//   .card_focus {
//     background-color: #fff;
//     left: 40%;
//     transition: 0.3s;
//   }
// }

// @media only screen and (max-width: 700px) {
//   .card_focus {
//     background-color: #fff;
//     left: 25%;
//     transition: 0.3s;
//   }
// }

// @media only screen and (max-width: 610px) {
//   .card_focus {
//     background-color: rgb(35, 80, 128);
//     left: 10%;
//     transition: 0.3s;
//   }
// }
</style>