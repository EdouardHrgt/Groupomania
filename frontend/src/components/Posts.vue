<template>
  <div class="page-container">
    <div class="loader" v-if="loading">
      <loader />
    </div>
    <header>
      <div class="header-content">
        <div class="picture" @click="getComments(3)">
          <img src="../assets/default_user.jpg" alt="profile-picture" />
        </div>
        <ul>
          <li>
            <div><i class="fa-solid fa-user"></i><span>Profile</span></div>
            <div @click="logOut()">
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
          <div class="form-group">
            <label for="file" id="file-btn">image</label>
            <input id="file" type="file" name="image" />
          </div>
          <div class="form-group">
            <p class="new-post-msg" v-if="newPostMsg">
              Your new post is created !
            </p>
          </div>
          <div class="form-group">
            <button type="submit">Post !</button>
          </div>
        </form>
      </div>
      <div class="error-msg" v-if="postErr || commentErr">
        <p>{{ postErr }}</p>
        <p>{{ commentErr }}</p>
      </div>
      <!-- ###### POSTS ###### -->
      <section class="all-posts-container">
        <!-- 1 post -->
        <div class="post-container" v-for="post in posts" :key="post.id">
          <div class="infos">
            <div class="author">
              <img src="../assets/default_user.jpg" alt="Profile picture" />
              <p class="username">UserID: {{ post.userId }}</p>
            </div>
            <p class="date">{{ post.date }}</p>
          </div>
          <div class="content">
            <h3>{{ post.title }}</h3>
            <p>
              Post Id : {{ post.id }} <br />
              {{ post.content }}
            </p>
            <img :src="post.imageUrl" v-if="post.imageUrl" alt="#" />
          </div>
          <div class="actions">
            <div class="owner-actions" v-if="user.userId == post.userId">
              <i class="fa-solid fa-pen"></i>
              <i class="fa-solid fa-trash"></i>
            </div>
            <i class="fa-solid fa-message"></i>
          </div>
          <!-- 1 Comment -->
          <div
            class="comment-container"
            v-for="comment in filterComments(post.id)"
            :key="comment.id"
          >
            <div class="comment-infos">
              <img src="../assets/default_user.jpg" alt="Profile picture" />
              <p class="comment-username">PostID: {{ comment.postId }}</p>
              <p class="comment-date">{{ comment.date }}</p>
            </div>
            <div class="comment-content">
              <p>
                {{ comment.content }}
              </p>
            </div>
            <div class="comment-actions">
              <div
                class="comment-owner-actions"
                v-if="user.userId == comment.userId"
              >
                <i class="fa-solid fa-pen"></i>
                <i class="fa-solid fa-trash"></i>
              </div>
              <i class="fa-solid fa-reply" @click="openComment()"></i>
            </div>
            <!-- COMMENT FORM -->
            <div class="comment-form-container" v-show="commentForm">
              <form>
                <div class="form-group">
                  <label for="content">Comment :</label>
                  <input
                    type="textarea"
                    name="content"
                    id="content"
                    placeholder="Content of your comment..."
                    required
                    maxlength="250"
                  />
                </div>
                <div class="form-group">
                  <button type="submit">Comment !</button>
                </div>
              </form>
            </div>
            <!-- END COMMENT FORM -->
          </div>
          <!-- End comment -->
        </div>
        <!-- End post -->
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue';
const url = 'http://localhost:3000/api/';
//{headers: { Authorization: 'Bearer ' + this.user.token }};
export default {
  name: 'Posts',
  components: {
    loader: Loader,
  },
  data: function () {
    return {
      profile: false,
      loading: false,
      posts: [],
      comments: [],
      postErr: '',
      commentErr: '',
      commentForm: false,
      user: null,
      newPostMsg: null,
    };
  },
  methods: {
    newPost(event) {
      const userId = String(this.user.userId);
      const { title, content, image } = Object.fromEntries(
        new FormData(event.target)
      );
      this.title = title;
      this.content = content;
      this.image = image;
      let newPost = {};

      if (this.image.name == '') {
        newPost = { title, content, userId };
      } else {
        newPost = { title, content, image, userId };
      }
      console.log(newPost);
      axios
        .post(`${url}post`, newPost)
        .then((res) => {
          console.log(res.data);
          this.newPostMsg = res.data.message;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getComments(postId) {
      axios
        .get(`${url}comment/filter/${postId}`)
        .then((res) => {
          console.log(res.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterComments(idPost) {
      return this.comments.filter((comment) => comment.postId == idPost);
    },
    logOut() {
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/');
    },
    openComment() {
      return (this.commentForm = true);
    },
  },
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push('/');
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loading = true;
      axios
        .get(`${url}post`)
        .then((res) => {
          this.posts = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          this.postErr = err;
        });
      axios
        .get(`${url}comment`)
        .then((res) => {
          this.comments = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.commentErr = err;
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
  border-radius: 10px;
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
  color: #dd00ff;
}
header li i {
  width: 1rem;
}
header li span {
  font-size: 1rem;
  margin-left: 1rem;
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
}
.form-container h1 {
  font-family: var(--font-2);
  color: var(--secondary);
  text-align: center;
  padding-top: 0.5rem;
  font-size: 1.5rem;
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
#file-btn {
  background-color: var(--white);
  color: var(--primary);
  width: 6rem;
  text-align: center;
  padding: 0.3rem;
  cursor: pointer;
  outline: var(--black) 1px solid;
}
#file {
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
  display: none;
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
}
.infos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: var(--white);
  border-bottom: 1px solid var(--primary);
  color: var(--primary);
  font-weight: bolder;
}
.author {
  display: flex;
  align-items: center;
}
.infos img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.content {
  padding: 0.5rem 1rem 0 1rem;
  background-color: var(--white);
}
.content h3 {
  font-size: 1.1rem;
}
.content img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}
.content p {
  text-align: justify;
}
.actions {
  display: flex;
  justify-content: flex-end;
  padding: 0rem 1rem;
  background-color: var(--white);
}
.actions i {
  color: var(--primary);
  font-size: 1.2rem;
  margin: 0 0.5rem;
  transition: 0.4s;
  cursor: pointer;
}
.actions .fa-trash {
  color: var(--red);
}
.actions i:hover,
.comment-actions i:hover {
  opacity: 0.7;
  transform: scale(1.2);
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
}
.comment-infos img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 1rem;
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
  }
  header {
    min-height: 6rem;
    max-height: 7rem;
    display: flex;
    align-items: center;
    position: sticky;
    z-index: 100;
    top: 0;
    background-color: var(--transp5);
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
  header ul li {
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;
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
