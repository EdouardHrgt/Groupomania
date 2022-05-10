<template>
  <div>
    <div class="infos_card">
      <i class="fa-solid fa-xmark"></i>
      <div class="user-infos">
        <h1>{{ profile[0].username }}</h1>
        <p class="permission">{{ profile[0].permission }}</p>
        <img
          :src="profile[0].image"
          :alt="'picture of ' + profile[0].username"
        />
      </div>
      <div class="user-activities">
        <p>{{ profile[0].title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const url = 'http://localhost:3000/api/user/';
export default {
  name: 'UserInfos',
  data() {
    return {
      user: {},
      profile: { username: '' },
      bool: false,
    };
  },
  methods: {},
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
          this.profile = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style scoped>
.infos_card {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: var(--white);
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.user-infos {
  background-color: red;
  grid-area: 1 / 1 / 2 / 2;
}

.user-activities {
  background-color: blue;
  grid-area: 1 / 2 / 2 / 3;
}
h1 {
  color: rgb(0, 0, 0);
  font-size: 2rem;
}
.fa-xmark {
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: black;
  cursor: pointer;
}
.permission {
  color: var(--secondary);
  font-weight: bolder;
}

img {
  width: 25rem;
  height: 25rem;
  border: 2px solid var(--light-gray);
}
</style>
