<template>
  <div class="page-container">
    <profile v-show="profile" @profileCloser="closeProfile" />
    <div class="loader" v-if="loading">
      <loader />
    </div>
    <header>
      <div class="header-content" v-if="user">
        <div class="picture" @click="openProfile" v-if="user">
          <img :src="user.image" alt="profile-picture" />
        </div>
        <ul>
          <li>
            <div class="panel-link" v-if="user.permission == 'admin'">
              <router-link to="/panel">
                <i class="fa-solid fa-lock"></i>
                <span>Panel</span>
              </router-link>
            </div>
          </li>
          <li>
            <div @click="openProfile">
              <i class="fa-solid fa-user"></i><span>Profile</span>
            </div>
          </li>
          <li>
            <div @click="logOut">
              <i class="fa-solid fa-arrow-right-from-bracket"></i
              ><span>Log Out</span>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <main class="activities-container">
      <div class="logo-wrapper">
        <img
          class="logo"
          src="../assets/groupo-logo-white.png"
          alt="logo groupomania"
        />
      </div>
      <div class="form-container">
        <h1>New post</h1>
        <form @submit.prevent="newPost">
          <div class="form-group">
            <label for="title">Title : </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title of your post..."
              required
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
              placeholder="Content of your post..."
              required
              maxlength="250"
            />
          </div>
          <div class="form-group file-input">
            <label for="new-post-image">image</label>
            <input type="file" name="image" id="new-post-image" />
          </div>
          <div class="form-group">
            <button type="submit">Post !</button>
          </div>
        </form>
      </div>
      <div class="error-msg" v-if="fetchErr">
        <p>{{ fetchErr }}</p>
      </div>

      <!-- ###### ALL POSTS ###### -->
      <section class="all-posts-container">
        <!-- 1 post -->
        <div
          class="post-container"
          v-for="(post, postIndex) in posts"
          :key="post.id"
        >
          <!-- The post -->
          <section class="unique__post" v-if="post" ref="post">
            <div class="infos">
              <div class="author">
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
            <div class="content" @click="toPost(post.id)">
              <img
                v-if="post.imageUrl != 'noImg'"
                :src="post.imageUrl"
                :alt="post.title + 'from' + post.username"
              />
              <strong class="post-title">
                {{ post.title }}
              </strong>
              <p>
                {{ post.content }}
              </p>
            </div>
            <div class="actions">
              <button @click="showCommentForm(postIndex)">
                Comment
                <i class="fa-solid fa-paper-plane"></i>
              </button>
              <button @click="debounce(post.id, postIndex)">
                Like <i class="fa-solid fa-heart"></i>
                <span>{{ post.totalLikes }}</span>
              </button>
              <button @click="toPost(post.id)">
                See More
                <i class="fa-solid fa-envelope"></i>
                <span>{{ post.totalComms }}</span>
              </button>
            </div>
          </section>

          <!-- Comment form -->
          <div class="comment-form-container" v-if="commentForm == postIndex">
            <form @submit.prevent="newComment(post.id, postIndex)">
              <div class="form-group">
                <label for="content">Comment :</label>
                <input
                  type="textarea"
                  name="content"
                  id="content"
                  placeholder="Content of your comment..."
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

          <!-- End comment form-->
        </div>

        <!-- End post -->
      </section>

      <!-- End all posts -->
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue';
import Profile from '@/components/Profile.vue';
import Mixins from '../mixins/Mixins.js';

const url = 'http://localhost:3000/api/';
const ls = JSON.parse(localStorage.getItem('user'));
const headers = {
  'Content-type': 'application/json',
  Authorization: 'Bearer ' + ls.token,
};

export default {
  name: 'Posts',

  mixins: [Mixins],

  components: {
    loader: Loader,
    profile: Profile,
  },

  data: function () {
    return {
      //states
      profile: false,
      loading: false,

      //Datas
      user: null,
      posts: [],
      likes: null,
      comment: '',
      response: '',

      // Popups
      postLikes: null,
      isLiked: false,
      timeout: null,
      commentForm: -1,
      commentBlock: -1,
      fetchErr: null,
    };
  },
  methods: {
    /*=====================================*/
    /* ALL ABOUT POSTS */
    /*=====================================*/
    toPost(idPost) {
      const id = idPost;
      this.$router.push(`SinglePost/${id}`);
    },

    getAllPosts() {
      axios
        .get(`${url}post`, { headers })
        .then((res) => {
          this.posts = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.fetchErr = err;
          this.loading = false;
        });
    },

    newPost(event) {
      const userId = String(this.user.userId);
      let post = new FormData(event.target);

      axios
        .post(`${url}post/${userId}`, post, { headers })
        .then((res) => {
          this.response = res;
          this.commentForm = -1;
          this.fetchErr = null;
          this.getAllPosts();
        })
        .catch((err) => {
          this.fetchErr = err;
        });
    },

    /*=====================================*/
    /* ALL ABOUT LIKES */
    /*=====================================*/
    debounce(id, i) {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.likePost(id, i);
      }, 300);
    },

    likePost(idPost, index) {
      const postId = String(idPost);
      const userId = String(this.user.userId);

      axios
        .get(`${url}like/${postId}/${userId}`, { headers })
        .then((res) => {
          this.isLiked = res;
          this.getLikes(idPost, index);
          this.getAllPosts();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    getLikes(idPost, index) {
      const postId = String(idPost);

      axios
        .get(`${url}like/${postId}`, { headers })
        .then((res) => {
          this.likes = res.data.length;
          this.postLikes = index;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /*=====================================*/
    /* ALL ABOUT COMMENTS */
    /*=====================================*/
    showCommentForm(i) {
      this.commentBlock = -1;
      this.commentForm == i ? (this.commentForm = -1) : (this.commentForm = i);
    },

    newComment(idPost) {
      const comment = {
        content: this.comment,
        userId: this.user.userId,
        postId: idPost,
      };

      axios
        .post(`${url}comment`, comment, { headers })
        .then((res) => {
          this.response = res;
          this.commentForm = -1;
          this.toPost(idPost);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /*=====================================*/
    /* ALL ABOUT USER */
    /*=====================================*/
    logOut() {
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/');
    },

    openProfile() {
      this.profile = true;
    },

    closeProfile(bool) {
      this.profile = bool;
      this.user = JSON.parse(localStorage.getItem('user'));
    },
  },

  /*=====================================*/
  /* MAIN FETCH */
  /*=====================================*/
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push('/');
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loading = true;

      axios
        .get(`${url}post`, { headers })
        .then((res) => {
          this.posts = res.data;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response.status == 401) {
            localStorage.removeItem('user');
            this.user = null;
            this.$router.push('/');
          } else {
            this.fetchErr = err;
            this.loading = false;
          }
        });
    }
  },
};
</script>

<style scoped>
/*MAIN WRAPPER*/
.page-container {
  width: 1440px;
  min-height: 100vh;
  margin: auto;
  display: flex;
}
/*HEADER*/
header {
  min-height: 100vh;
  background-color: var(--transp2);
}
.header-content {
  min-width: 15rem;
  max-width: 15rem;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
}
header .picture {
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  margin-bottom: 2rem;
  align-self: center;
  border-radius: 50%;
  cursor: pointer;
}
.picture img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}
header ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
}
header li div {
  color: var(--white);
  font-size: 1.1rem;
  font-family: var(--font-2);
  margin: 0.5rem 0;
  transition: 0.4s;
  width: 6.1rem;
  cursor: pointer;
}
header li div:hover {
  color: var(--secondary);
}
header li i {
  width: 1rem;
}
header li span {
  font-size: 1rem;
  margin-left: 1rem;
}
.panel-link a {
  color: var(--secondary);
  font-weight: bolder;
}
/*ACTIVITIES*/
.activities-container {
  width: 100%;
}
.logo-wrapper {
  text-align: center;
  width: 100%;
}
.logo {
  margin: 2rem;
  width: 21rem;
  height: 4rem;
  object-fit: cover;
}
.form-container {
  background-color: var(--transp2);
  width: 60%;
  margin: auto;
  position: relative;
}
.form-container h1,
.form-container h2 {
  font-family: var(--font-2);
  color: var(--secondary);
  text-align: center;
  padding-top: 0.5rem;
  font-size: 1.5rem;
}
.form-container h2 {
  color: var(--white);
}
#update-post-form {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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
  outline: var(--white) 1px solid;
  background-color: transparent;
}
.error-msg {
  background-color: var(--red);
  width: 60%;
  margin: 1rem auto;
  text-align: center;
  color: var(--white);
}
.new-post-msg {
  color: var(--white);
  background-color: var(--green);
  text-align: center;
}
/*POSTS + COMMENTS*/
.all-posts-container {
  width: 60%;
  margin: auto;
}
.post-container {
  margin-top: 1rem;
  position: relative;
  cursor: pointer;
  transition: 0.4s;
}
.post-container:last-child {
  margin-bottom: 10rem;
}
.box {
  position: absolute;
  z-index: 10;
  inset: 0;
  background-color: var(--transp6);
  color: var(--black);
}
.alert {
  border: 5px solid var(--red);
}
.confirmation {
  border: 5px solid var(--primary);
  flex-direction: column;
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
}
.content {
  padding: 2rem 1rem;
  background-color: var(--white);
}
.post-title {
  font-size: 1.1rem;
}
.content img {
  width: 100%;
  max-height: 550px;
  object-fit: contain;
}
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--white);
  border-bottom: 1px solid var(--primary);
  border-top: 1px solid var(--gray);
  position: relative;
}
.actions button {
  background-color: transparent;
  border: 1px solid var(--gray);
  font-family: var(--font-3);
  letter-spacing: 1.5px;
  width: 8.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: baseline;
  justify-content: center;
}
.actions button:hover {
  background: var(--secondary);
  opacity: 0.8;
  color: white;
}
.actions button i {
  margin-left: 1rem;
  color: var(--primary);
}
.actions button span {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-left: 0.2rem;
}
.actions .fa-heart {
  color: transparent;
  background: var(--gradient-2);
  background-clip: text;
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
/*RESPONSIVE*/
@media screen and (max-width: 1440px) {
  .page-container {
    width: 90%;
  }
  .form-container,
  .all-posts-container {
    width: 80%;
  }
}
@media screen and (max-width: 1024px) {
  .page-container {
    flex-direction: column;
    width: 100%;
  }
  header {
    min-height: 6rem;
    max-height: 7rem;
    display: flex;
    align-items: center;
    position: sticky;
    z-index: 100;
    top: 0;
    background-color: var(--transp3);
    backdrop-filter: blur(2px);
  }
  .header-content {
    min-width: 90%;
    margin: auto;
    padding: 0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  header .picture {
    margin-bottom: 0;
    align-self: center;
    outline: none;
  }
  header ul {
    display: flex;
  }
  header li div {
    margin: 0;
  }
  .logo-wrapper {
    display: none;
  }
  .form-container {
    margin-top: 2rem;
  }
  .form-container,
  .all-posts-container {
    width: 80%;
  }
}
@media screen and (max-width: 800px) {
  .page-container {
    width: 100%;
  }
  header li div {
    width: auto;
  }
  header li i {
    width: auto;
    font-size: 1.5rem;
    padding: 0 1rem;
  }
  header li span {
    display: none;
  }
  header .picture {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
  .form-container,
  .all-posts-container {
    width: 100%;
  }
}
</style>
