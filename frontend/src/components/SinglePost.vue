<template>
  <div>
    <div class="logo-wrapper">
      <div class="circle flex" @click="toPosts">
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
        <div class="content">
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
          <div class="owner-actions">
            <button class="delete_btn">DELETE</button>
            <button class="edit_btn">EDIT</button>
          </div>
          <i class="fa-solid fa-paper-plane"></i>
          <!-- LIKES -->
          <p class="likes">
            <i class="fa-solid fa-heart"></i>
            <span>{{ post.totalLikes }}</span>
          </p>
        </div>
        <!-- 1 Comment -->
        <div
          class="comment-global-container"
          v-if="comments && commentBlock == postIndex"
        >
          <div
            class="comment-container"
            v-for="comment in comments"
            :key="comment.id"
          >
            <div class="comment-infos">
              <img
                v-if="comment.image"
                :src="comment.image"
                :alt="'Profile picture of' + comment.username"
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
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
const url = 'http://localhost:3000/api/';
export default {
  name: 'SinglePost',
  data() {
    return {
      user: {},
      postId: this.$route.params.id,
      posts: [],
      comments: [],
      errorMsg: '',
    };
  },
  methods: {
    dateFormatter(t) {
      let date = new Date(t);
      return date.toLocaleDateString();
    },
    toPosts() {
      this.$router.push('/posts');
    },
    getComments(idPost) {
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.user.token,
      };
      const postId = idPost;
      axios
        .get(`${url}comment/filter/${postId}`, { headers })
        .then((res) => {
          this.comments = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push('/');
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.user.token,
      };
      const postId = this.$route.params.id;
      // GET POST
      axios
        .get(`${url}post/filteredPost/${postId}`, { headers })
        .then((res) => {
          this.posts = res.data;
          console.log(this.posts);
        })
        .catch((err) => {
          console.log(err);
          this.errorMsg = err;
        });
      // GET COMMENTS
      axios
        .get(`${url}comment/filter/${postId}`, { headers })
        .then((res) => {
          this.comments = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.errorMsg = err;
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
}
.confirmation {
  border: 5px solid var(--primary);
  flex-direction: column;
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
  padding: 0.5rem 1rem 0 1rem;
  background-color: var(--white);
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
.likes {
  display: flex;
}
.likes span {
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
</style>
