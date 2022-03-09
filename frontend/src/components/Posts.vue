<template>
  <div class="posts-container">
    <header>
      <a class="picture" href="#">
        <img src="../assets/default_user.jpg" alt="profile-picture" />
      </a>
      <ul>
        <li>
          <a href="#"
            ><i class="fa-solid fa-circle-plus"></i><span>Post</span></a
          >
          <a href="#" @click="openProfile()"><i class="fa-solid fa-user"></i><span>Profile</span></a>
          <a href="#" @click="logOut()"
            ><i class="fa-solid fa-arrow-right-from-bracket"></i
            ><span>Log Out</span></a
          >
        </li>
      </ul>
    </header>
    <section class="profile-page" v-if="profile">
      <h2 @click="closeProfile()">My profile page</h2>
    </section>
    <main>
      <div class="logo">
        <img src="../assets/groupo-logo-white.png" alt="logo groupomania" />
      </div>
      <div class="form-container">
        <h1>New post</h1>
        <form>
          <div class="form-group">
            <label for="title">Title : </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title of your post..."
              required
              maxlength="70"
              v-model="postTitle"
            />
            <p class="err-msg"></p>
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
              v-model="postContent"
            />
          </div>
          <div class="form-group">
            <label for="file" id="file-btn">image</label>
            <input id="file" type="file" />
          </div>
          <div class="form-group">
            <button type="submit">Post !</button>
          </div>
        </form>
      </div>
      <loader v-if="loading" />
      <div class="error-msg" v-if="postErr || commentErr">
        <p>{{ postErr }}</p>
        <p>{{ commentErr }}</p>
      </div>
      <!-- POST -->
      <div class="post-block">
        <div
          class="post-container"
          v-for="(post, i) in posts"
          :key="'post ' + post.id"
          :index="i"
        >
          <div class="infos">
            <p class="post-author">
              <span>Author :</span>
              UserId: {{ post.userId }}
            </p>
            <p class="post-date">
              <span>Date :</span>
              {{ post.date }}
            </p>
          </div>
          <div class="post-content">
            <h2>{{ post.title }}</h2>
            <p>
              {{ post.content }}
              {{ post.imageUrl }}
            </p>
            <img src="#" alt="#" />
          </div>
          <div class="actions">
            <div class="owner-actions">
              <i class="fa-solid fa-pen" @click="temp()"></i>
              <i class="fa-solid fa-trash" @click="temp()"></i>
            </div>
            <i class="fa-solid fa-reply" @click="temp()"></i>
          </div>
        </div>
        <!-- COMMENT -->
        <div
          class="comment-container"
          v-for="(comment, i) in comments"
          :key="'comment ' + comment.id"
          :index="i"
        >
          <div class="infos">
            <p class="post-author">
              <span>Author :</span>
              UserId: {{ comment.userId }}
            </p>
            <p class="post-date">
              <span>Date :</span>
              {{ comment.date }}
            </p>
          </div>
          <div class="comment-content">
            <p>{{ comment.content }}</p>
          </div>
          <div class="actions">
            <div class="owner-actions">
              <i class="fa-solid fa-pen" @click="temp()"></i>
              <i class="fa-solid fa-trash" @click="temp()"></i>
            </div>
            <i class="fa-solid fa-reply" @click="temp()"></i>
          </div>
        </div>
      </div>
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
      user: null,
      profile: false,
      loading: false,
      posts: [],
      comments: [],
      activities: [],
      postTitle: '',
      postContent: '',
      postFile: '',
      postErr: '',
      commentErr: '',
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/');
    },
    temp() {
      alert('Element clicked ! ');
    },
    dateFormat(date) {
      return date.toLocaleDateString('fr');
    },
    openProfile() {
      return (this.profile = true);
    },
    closeProfile() {
      return (this.profile = false);
    },
  },
  created() {
    if (!localStorage.getItem('user')) {
      this.$router.push('/');
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loading = true;
      // Get all posts
      axios
        .get(`${url}post`)
        .then((res) => {
          this.posts = res.data;
          console.log(this.posts);
        })
        .catch((err) => {
          this.postErr = err;
        });
      // Get all comments
      axios
        .get(`${url}comment`)
        .then((res) => {
          this.comments = res.data;
          console.log(this.comments);
        })
        .catch((err) => {
          this.commentErr = err;
        })
        .finally((this.loading = false));
    }
  },
};
</script>

<style scoped>
.posts-container {
  width: 1440px;
  margin: auto;
  display: flex;
}
/* ===== Header ===== */
header {
  background-color: var(--transp2);
  width: 20rem;
  padding: 2rem;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header .picture {
  width: 3.7rem;
  height: 3.7rem;
  border-radius: 50%;
  overflow: hidden;
  align-self: center;
  margin-bottom: 2rem;
  transition: 0.4s;
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
}

header li a {
  color: var(--white);
  font-size: 1.5rem;
  font-family: var(--font-2);
  padding: 0.3rem 0;
  margin: 0.5rem 0;
  transition: 0.4s;
  width: 6.1rem;
}

header li a:hover {
  color: #dd00ff;
}

header li a i {
  width: 1.5rem;
}

header li a span {
  font-size: 1rem;
  margin-left: 1rem;
}
/* ===== Profile page ===== */
.profile-page {
  background-color: var(--white);
  position: absolute;
  inset: 0 10%;
  z-index: 10;
  text-align: center;
  font-size: 3rem;
}
/* ===== MAIN ===== */
main {
  padding: 2rem 5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.logo {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--white);
  padding-bottom: 1rem;
  margin-bottom: 3rem;
}

.logo img {
  width: 20rem;
  height: 5rem;
  object-fit: cover;
}

/*===== FORM =====*/
.form-container {
  background-color: var(--transp2);
  width: 70%;
  margin: auto;
}

.form-container h1 {
  font-family: var(--font-2);
  color: var(--white);
  text-align: center;
  padding-top: 0.5rem;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 2rem;
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
  width: 70%;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.error-msg p {
  color: var(--white);
  font-weight: bolder;
  letter-spacing: 1.3px;
}

/* ===== POSTS ===== */
.post-block {
  width: 70%;
  align-self: center;
  margin-bottom: 3rem;
}

.post-container {
  background-color: var(--white);
  min-height: 11rem;
  padding: 2rem 3rem;
  margin-bottom: 1.5rem; /*TEMP !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
}

.infos {
  background-color: var(--light-gray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.2rem 0;
}

.infos span {
  font-family: var(--font-2);
  color: var(--primary);
  font-weight: bolder;
  margin-right: 0.3rem;
}

.post-content h2 {
  font-size: 1.1rem;
}
.post-content img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.post-content p {
  text-align: justify;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.actions i {
  color: var(--primary);
  font-size: 1.2rem;
  margin: 0 0.5rem;
  transition: 0.4s;
  cursor: pointer;
}

.actions i:hover {
  color: var(--secondary);
}

/* ===== COMMENTS ===== */
.comment-container {
  /*background-color: var(--light-gray);*/
  background-color: var(--red);
  align-self: center;
  padding: 0.5rem 3rem;
  border-top: 1px solid var(--black);
}

.comment-content {
  background-color: var(--white);
  padding: 0.4rem 0;
}
@media screen and (max-width: 1440px) {
  .posts-container {
    width: 100%;
  }
}
@media screen and (max-width: 1024px) {
  .posts-container {
    width: 100%;
    display: block;
  }
  .logo {
    display: none;
  }
  header {
    width: 100%;
    height: 7rem;
    flex-direction: row;
    background-color: #10001b;
    border-bottom: white 2px solid;
  }
  header .picture {
    margin-bottom: 0;
  }
  header ul {
    width: 100%;
  }
  header ul li {
    flex-direction: row;
    justify-content: center;
  }
  header li a {
    padding: 0.3rem 0;
    margin: 0.5rem 1rem;
  }
  header li a span {
    display: none;
  }
  .form-container,
  .post-block {
    width: 90%;
  }
}
@media screen and (max-width: 800px) {
  .posts-container,
  .form-container,
  .post-block {
    width: 100%;
  }
  main {
    padding: 2rem 2rem;
  }
  .post-container {
    padding: 1rem;
  }
}
</style>
