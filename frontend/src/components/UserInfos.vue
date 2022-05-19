<template>
  <div>
    <div class="infos_card" v-if="profile">
      <i class="fa-solid fa-xmark" @click="closeModal()"></i>
      <div class="user-infos flex">
        <img :src="profile.image" :alt="'picture of ' + profile.username" />
      </div>
      <div class="user-activities">
        <h1>{{ profile.username }}</h1>
        <p class="date">
          {{ profile.permission }} since :
          {{ dateFormatter(profile.createDate) }}.
        </p>
        <p class="bio" v-if="profile.bio">
          {{ profile.bio }}
        </p>
        <div class="stats">
          <h2>Stats</h2>
          <p>
            Total posts : <span>{{ profile.totalPosts }}</span>
          </p>
          <p>
            Total comments : <span>{{ profile.totalComms }}</span>
          </p>
          <p @click="clicked('coucou')">
            Total Likes : <span>{{ profile.totalLikes }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import userMixins from '../mixins/userMixins.js'
const url = 'http://localhost:3000/api/user/';
export default {
  name: 'UserInfos',
  mixins: [userMixins],
  data() {
    return {
      user: {},
      profile: '',
      bool: false,
    };
  },
  methods: {
    dateFormatter(t) {
      let date = new Date(t);
      return date.toLocaleDateString();
    },
    closeModal() {
      this.$emit('userInfosCloser', this.bool);
    },
  },
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push('/');
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      const username = this.$store.state.Profile;
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.user.token,
      };
      axios
        .get(`${url}${username}`, { headers })
        .then((res) => {
          this.profile = res.data[0];
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.infos_card {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: var(--white);
  backdrop-filter: blur(2px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.user-infos {
  background-color: var(--white);
  grid-area: 1 / 1 / 2 / 2;
  margin-top: 1rem;
  min-height: 73vh;
}
.user-activities {
  background-color: var(--white);
  padding: 4rem 3rem 0 1rem;
  grid-area: 1 / 2 / 2 / 3;
  margin-top: 1rem;
}
h1 {
  color: transparent;
  background: var(--gradient-2);
  background-clip: text;
  font-size: 2rem;
}
.fa-xmark {
  font-size: 1.5rem;
  position: absolute;
  z-index: 20;
  top: 0.2rem;
  right: 0.5rem;
  color: black;
  cursor: pointer;
  transition: 0.4s;
}
.fa-xmark:hover {
  opacity: 0.6;
  transform: scale(1.2);
}
.date {
  color: var(--black);
  font-weight: bolder;
  margin: 0.5rem 0 1rem;
}
.bio {
  font-size: 0.9rem;
  font-family: var(--font-2);
  line-height: 160%;
  font-style: italic;
}
img {
  width: 80%;
  height: 80%;
  border: 2px solid var(--light-gray);
  object-fit: cover;
}
.stats {
  margin-top: 1rem;
  border: 2px solid rgb(190, 190, 190);
  padding-left: 0.5rem;
}
.stats h2 {
  font-family: var(--font-3);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.stats span {
  font-weight: bolder;
  color: var(--ternary);
}

@media screen and (max-width: 1024px) {
  .infos_card {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    padding: 0;
  }
  .user-infos {
    grid-area: 1 / 1 / 2 / 2;
    margin-top: 0;
    min-height: 0;
    padding: 0 0.5rem;
  }
  .user-activities {
    padding: 0;
    grid-area: 2 / 1 / 3 / 2;
    margin-top: 0;
    padding: 0 0.5rem;
  }
  img {
    width: 100%;
    height: 100%;
    min-width: 150px;
    min-height: 150px;
    border: 2px solid var(--light-gray);
    object-fit: cover;
  }
}
@media screen and (max-width: 800px) {
  .infos_card {
    padding: 1rem 0;
    min-height: 80vh;
  }
}
</style>
