<template>
  <div>
    <div class="logo-wrapper">
      <div class="circle flex" @click="toPosts()">
        <i class="fa-solid fa-arrow-left back"></i>
      </div>
      <img
        class="logo"
        src="../assets/groupo-logo-white.png"
        alt="logo groupomania"
      />
    </div>
    <main class="post__wrapper" v-for="post in posts" :key="post.id">
      <!-- The post -->
      <section class="unique__post" v-if="post">
        <div class="infos">
          <userProfile v-show="profile" @userInfosCloser="closeUserInfos" />
          <div class="author" @click="showProfile()">
            <img
              v-if="post.image"
              :src="post.image"
              :alt="'picture of ' + post.username"
            />
            <p class="username">
              By:
              <strong>{{ post.username }}</strong>
            </p>
          </div>
          <p class="date">{{ dateFormatter(post.date) }}</p>
        </div>
        <div class="content">
          <img
            v-if="post.imageUrl != 'noImg'"
            :src="post.imageUrl"
            :alt="post.title + 'from ' + post.username"
          />
          <strong class="post-title">
            {{ post.title }}
          </strong>
          <p>
            {{ post.content }}
          </p>
        </div>
        <div class="actions">
          <div class="owner-actions" v-if="user.userId == post.userId">
            <button class="delete_btn" @click="toggleDeletePost">DELETE</button>
            <button class="edit_btn" @click="togglePostForm">EDIT</button>
          </div>

          <i class="fa-solid fa-paper-plane" @click="toggleCommentForm"></i>

          <p class="comms" @click="getComments()">
            <i class="fa-solid fa-envelope"></i>
            <span>{{ post.totalComms }}</span>
          </p>
          <!-- LIKES -->
          <p class="likes" @click="debounce()">
            <i class="fa-solid fa-heart"></i>
            <span>{{ post.totalLikes }}</span>
          </p>
        </div>
        <!-- Delete Post box -->
        <div class="box confirmation flex" v-if="deletePostBox">
          <div class="confirmation-wrapper">
            <p>Do you want to delete this post ?</p>
            <div class="icons">
              <i class="fa-solid fa-check" @click="deletePost"></i>
              <i class="fa-solid fa-xmark" @click="toggleDeletePost"></i>
            </div>
          </div>
        </div>
        <!-- Update post Box -->
        <div class="box modify-post flex" v-show="postForm">
          <div class="form-container" id="update-post-form">
            <h2>Update your post</h2>
            <i class="fa-solid fa-xmark" @click="togglePostForm"></i>
            <form @submit.prevent="updatePost">
              <div class="form-group">
                <label for="title">Title : </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  :value="post.title"
                  minLength="5"
                  maxlength="70"
                />
              </div>
              <div class="form-group">
                <label for="content">Content : </label>
                <input
                  type="textarea"
                  name="content"
                  id="content"
                  :value="post.content"
                  maxlength="250"
                />
              </div>
              <div class="form-group file-input">
                <label for="update-post-image">image</label>
                <input type="file" name="image" id="update-post-image" />
              </div>
              <div class="form-group">
                <button type="submit">Update !</button>
              </div>
            </form>
          </div>
        </div>
        <!-- Comment form -->
        <div class="comment-form-container" v-show="commentForm">
          <form @submit.prevent="commentPost()">
            <div class="form-group">
              <label for="content">Comment :</label>
              <input
                type="textarea"
                name="content"
                id="content"
                placeholder="Say something..."
                required
                maxlength="250"
                v-model="comment"
                minlength="5"
              />
            </div>
            <div class="form-group">
              <button type="submit">Comment !</button>
            </div>
          </form>
        </div>
        <!-- 1 Comment -->
        <div class="comment-global-container" v-if="comments">
          <div
            class="comment-container"
            v-for="comment in comments"
            :key="comment.id"
          >
            <div class="comment-infos">
              <img
                v-if="comment.image"
                :src="comment.image"
                :alt="'Profile picture of ' + comment.username"
              />
              <p class="comment-username">{{ comment.username }}</p>
              <p class="comment-date">{{ dateFormatter(comment.date) }}</p>
            </div>
            <div class="comment-content">
              <p>{{ comment.content }}</p>
            </div>
            <div class="comment-actions">
              <div
                class="comment-owner-actions"
                v-if="user.id == comment.userId"
              >
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- End comment -->
        <p class="err-msg" v-show="errorMsg">{{ errorMsg }}</p>
        <button class="more" @click="getComments">See More Comments</button>
      </section>
    </main>
  </div>
</template>

<script>
import UserInfos from '@/components/UserInfos.vue';
import Mixins from '../mixins/Mixins.js';
import axios from 'axios';

const ls = JSON.parse(localStorage.getItem('user'));
const headers = {
  'Content-type': 'application/json',
  Authorization: 'Bearer ' + ls.token,
};
const url = 'http://localhost:3000/api/';
export default {
  name: 'SinglePost',
  mixins: [Mixins],
  components: {
    userProfile: UserInfos,
  },
  data() {
    return {
      /*datas*/
      user: {},
      postId: this.$route.params.id,
      posts: [],
      comments: [],
      comment: '',

      /*Errors handler*/
      errorMsg: '',

      /*Unused responses*/
      trash: null,

      /*Functions handlers*/
      timeout: null,
      postLiked: null,
      integer: null,

      /*Modals toggle*/
      profile: false,
      postForm: false,
      commentForm: false,
      deletePostBox: false,
    };
  },
  methods: {
    /*=====================================*/
    /* ALL ABOUT POSTS */
    /*=====================================*/
    getPost() {
      const postId = this.postId;

      axios
        .get(`${url}post/filteredPost/${postId}`, { headers })
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    deletePost() {
      const postId = this.postId;
      const userId = this.user.userId;

      axios
        .delete(`${url}post/delete/${postId}/${userId}`, { headers })
        .then((res) => {
          this.trash = res;
          this.toggleDeletePost();
          this.toPosts();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    updatePost() {
      const postId = this.postId;
      const updatedPost = new FormData(event.target);

      axios
        .put(`${url}post/update/${postId}`, updatedPost, { headers })
        .then((res) => {
          this.trash = res;
          this.togglePostForm();
          this.getPost();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /*=====================================*/
    /* ALL ABOUT LIKES */
    /*=====================================*/
    debounce() {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.likePost();
      }, 300);
    },

    likePost() {
      const postId = this.postId;
      const userId = this.user.userId;

      axios
        .get(`${url}like/${postId}/${userId}`, { headers })
        .then((res) => {
          this.postLiked = res;
          this.getPost();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /*=====================================*/
    /* ALL ABOUT COMMENTS */
    /*=====================================*/
    commentPost() {
      const comment = {
        content: this.comment,
        userId: this.user.userId,
        postId: this.postId,
      };

      axios
        .post(`${url}comment`, comment, { headers })
        .then((res) => {
          this.commentForm = false;
          const newComment = res.data[0];
          let arr = [];
          if (this.comments.length === 0) {
            arr.unshift(newComment);
            this.comments = arr;
          } else {
            this.comments.unshift(newComment);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    getComments() {
      const postId = this.postId;
      const offset = this.integer;

      axios
        .get(`${url}comment/limited/${postId}/${offset}`, { headers })
        .then((res) => {
          
          if (res.status == 204) {
            this.errorMsg = 'No comments to display';
            setTimeout(() => {this.errorMsg = '';}, 750);

          } else {
            this.integer += 3;
            res.data.map((n) => this.comments.push(n));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /*=====================================*/
    /* ALL ABOUT HELPERS */
    /*=====================================*/
    toggleDeletePost() {
      this.deletePostBox
        ? (this.deletePostBox = false)
        : (this.deletePostBox = true);
    },
    togglePostForm() {
      this.postForm ? (this.postForm = false) : (this.postForm = true);
    },

    toggleCommentForm() {
      this.commentForm ? (this.commentForm = false) : (this.commentForm = true);
    },

    showProfile() {
      this.profile ? (this.profile = false) : (this.profile = true);
    },

    closeUserInfos(bool) {
      this.profile = bool;
    },

    toPosts() {
      this.$router.push('/posts');
    },
  },

  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push('/');
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));

      // GET THE POST
      const postId = this.$route.params.id;
      axios
        .get(`${url}post/filteredPost/${postId}`, { headers })
        .then((res) => {
          this.posts = res.data;
          this.$store.commit('saveProfile', this.posts[0].username);
        })
        .catch((err) => {
          console.error(err);

          if (err.response.status == 401) {
            localStorage.removeItem('user');
            this.user = null;
            this.$router.push('/');
          }
        });

      // GET COMMENTS
      const offset = 0;
      axios
        .get(`${url}comment/limited/${postId}/${offset}`, { headers })
        .then((res) => {
          this.comments = res.data;
          this.integer = this.comments.length;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
};
</script>

<style scoped>
.logo-wrapper {
  width: 60%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.logo-wrapper .circle {
  width: 5rem;
  height: 2rem;
  background-color: var(--transp2);
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  left: 0;
}
.logo-wrapper i {
  font-size: 1.2rem;
  color: white;
  font-weight: bolder;
}
.logo-wrapper .circle:hover {
  opacity: 0.8;
}
.logo {
  margin: 2rem;
  width: 21rem;
  height: 4rem;
  object-fit: cover;
}
main {
  width: 60%;
  margin: auto;
  position: relative;
}

.infos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: var(--white);
  border-bottom: 1px solid var(--primary);
  color: var(--primary);
}
.author {
  display: flex;
  align-items: center;
}

.author .username strong {
  color: transparent;
  background: var(--gradient-2);
  background-clip: text;
  font-family: var(--font-3);
  letter-spacing: 1px;
}
.infos img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
.infos img:hover {
  outline: 1px solid var(--primary);
  transform: rotate(360deg);
}
.content {
  padding: 0.5rem 1rem 0 1rem;
  background-color: var(--white);
  min-height: 15rem;
}
.post-title {
  font-size: 1.1rem;
}
.content img {
  width: 100%;
  height: 300px;
  object-fit: contain;
}
.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  background-color: var(--white);
  border-bottom: 1px solid var(--primary);
  border-top: 1px solid var(--gray);
  position: relative;
}
.actions .owner-actions {
  position: absolute;
  left: 1rem;
}
.owner-actions button {
  background-color: var(--gray);
  font-family: var(--font-3);
  letter-spacing: 1.5px;
  width: 4.5rem;
  margin-right: 0.3rem;
  cursor: pointer;
  transition: 0.3s;
}
.owner-actions button:hover {
  opacity: 0.6;
  transform: scale(1.03);
}
.owner-actions .delete_btn {
  color: var(--red);
}
.owner-actions .edit_btn {
  color: var(--green);
}
.actions i {
  color: var(--primary);
  margin: 0 0.5rem;
  transition: 0.4s;
  cursor: pointer;
}
.actions .fa-trash {
  color: var(--red);
}
.likes,
.comms {
  display: flex;
}
.likes span,
.comms span {
  font-size: 0.8rem;
  color: var(--black);
}
.actions .fa-heart {
  color: transparent;
  background: var(--gradient-2);
  background-clip: text;
}
.actions i:hover,
.comment-actions i:hover {
  opacity: 0.7;
  transform: scale(1.3);
}
.err-msg {
  background-color: var(--red);
  text-align: center;
  color: white;
  font-size: 0.9rem;
}
.form-container {
  background-color: var(--transp2);
  width: 65%;
  margin: auto;
  position: relative;
}
.form-container h1,
.form-container h2 {
  font-family: var(--font-2);
  color: transparent;
  background: var(--gradient-2);
  background-clip: text;
  text-align: center;
  padding-top: 0.5rem;
  font-size: 1.5rem;
}
.form-container h2 {
  color: var(--white);
}
.comment-form-container {
  width: 100%;
  background-color: var(--transp2);
}
.form-group {
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 1.5rem;
}
.form-group label {
  font-family: var(--font-2);
  font-size: 1.1rem;
  color: var(--white);
  width: 100%;
  margin-bottom: 0.3rem;
}
.form-group input {
  width: 100%;
  padding: 0.6rem;
  outline: 1px solid --black;
}
.form-group input::placeholder {
  color: var(--primary);
}

.file-input label {
  background-color: var(--white);
  color: var(--primary);
  width: 6rem;
  text-align: center;
  padding: 0.3rem;
  cursor: pointer;
  outline: var(--black) 1px solid;
}
.file-input input {
  display: none;
}
.form-group button {
  width: 7rem;
  align-self: center;
  padding: 0.6rem 0;
  cursor: pointer;
  color: var(--white);
  background-color: var(--secondary);
  font-size: 1.1rem;
  font-weight: 700;
  transition: 0.4s;
}
.form-group button:hover {
  border-radius: 20px;
}
.box {
  position: absolute;
  z-index: 10;
  inset: 0;
  background-color: var(--transp6);
  backdrop-filter: blur(3px);
  color: var(--black);
}
.confirmation-wrapper {
  text-align: center;
  background-color: var(--gray);
  padding: 1rem;
  border-radius: 5px;
}
.confirmation i {
  margin: 0 0.5rem;
  font-size: 1.7rem;
  cursor: pointer;
  transition: 0.3s;
}
.confirmation i:first-child {
  color: var(--green);
}
.confirmation i:last-child {
  color: var(--red);
}
.confirmation i:hover {
  opacity: 0.8;
  transform: scale(1.2);
}
.modify-post i {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.3rem;
  cursor: pointer;
}
.comment-container {
  background-color: var(--gray);
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}
.comment-infos {
  background-color: var(--white);
  display: flex;
  align-items: center;
  position: relative;
  color: var(--primary);
  border-bottom: 1px solid var(--gray);
  padding: 0.2rem;
}
.comment-infos img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
}
.comment-username {
  font-weight: bolder;
}
.comment-date {
  width: auto;
  margin-left: auto;
}
.comment-content {
  background-color: var(--white);
  font-style: italic;
  padding: 0.3rem;
  display: flex;
  overflow: hidden;
}

.comment-actions {
  display: flex;
  background-color: var(--white);
  align-items: center;
  justify-content: flex-end;
}
.comment-actions i {
  margin: 0 0.3rem;
  padding: 0.3rem 0;
  cursor: pointer;
}
.comment-form-container label {
  visibility: hidden;
}
.more {
  background-color: var(--transp2);
  padding: 1rem 0;
  margin-top: 0.5rem;
  width: 100%;
  color: white;
  font-family: var(--font-2);
  letter-spacing: 2px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}
.more:hover {
  background-color: var(--secondary);
}
@media screen and (max-width: 1440px) {
  main,
  .logo-wrapper,
  .form-container {
    width: 75%;
  }
}
@media screen and (max-width: 1024px) {
  main,
  .logo-wrapper {
    width: 85%;
  }
  .form-container {
    width: 90%;
  }
}
@media screen and (max-width: 768px) {
  main,
  .logo-wrapper {
    width: 95%;
  }
  .form-container {
    width: 100%;
  }
  .logo-wrapper {
    width: 100%;
    display: block;
    text-align: center;
  }
  .logo-wrapper .circle {
    width: 100%;
    height: 2.2rem;
    border-radius: 0;
  }
  .logo {
    margin: 2.3rem 0 0 0;
  }
}
</style>
