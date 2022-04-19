<template>
  <div class="panel-container">
    <i class="fa-solid fa-xmark closer" @click="toPost"></i>
    <h1>PANEL ADMIN</h1>
    <div class="members__container">
      <div class="form-group">
        <label for="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i
        ></label>
        <input
          type="search"
          name="search-bar"
          id="search-bar"
          v-model="searchBarValue"
          placeholder="Username..."
          @change="searchUser"
        />
      </div>
      <h2>Members :</h2>
      <div class="members__grid">
        <div
          class="members__list"
          v-for="member in membersList"
          :key="member.id"
        >
          <div class="member__card" v-if="member">
            <div class="member__card__img flex">
              <img :src="member.image" :alt="'picture of ' + member.username" />
            </div>
            <div class="member__card__infos">
              <h3>{{ member.username }}</h3>
              <p v-if="member.permission == 'member'">
                Rank:
                <span class="member">{{ member.permission }}</span>
              </p>
              <p v-else-if="member.permission == 'moderator'">
                Rank: <span class="modo">{{ member.permission }}</span>
              </p>
              <p v-else-if="member.permission == 'admin'">
                Rank: <span class="admin">{{ member.permission }}</span>
              </p>
              <p class="user-id">userId: {{ member.id }}</p>
            </div>
            <div class="actions" v-if="member.permission != 'admin'">
              <i class="fa-solid fa-arrow-up" @click="promote(member.id)"></i>
              <i class="fa-solid fa-arrow-down" @click="demote(member.id)"></i>
              <i class="fa-solid fa-trash" @click="deleteMember(member.id)"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="error" v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const url = 'http://localhost:3000/api/';
export default {
  name: 'Panel',
  data() {
    return {
      user: null,
      membersList: null,
      searchBarValue: '',
      member: '',
      error: undefined,
    };
  },
  methods: {
    toPost() {
      this.$router.push('posts');
    },
    getAllUsers() {
      this.user = JSON.parse(localStorage.getItem('user'));
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.user.token,
      };
      axios
        .get(`${url}user`, { headers })
        .then((res) => {
          this.membersList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteMember(id) {
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.user.token,
      };
      const userId = id;
      axios
        .delete(`${url}user/delete/${userId}`, { headers })
        .then((res) => {
          console.log(res);
          this.getAllUsers();
        })
        .catch((err) => {
          console.log(err);
          this.error = err;
        });
    },
    promote(id) {
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.user.token,
      };

      const userId = id;
      this.error = null;
      axios
        .put(`${url}user/promote/${userId}`, { headers })
        .then((res) => {
          console.log(res);
          this.error = res;
          this.getAllUsers();
        })
        .catch((err) => {
          this.error = err;
        });
    },
    demote(id) {
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.user.token,
      };
      const userId = id;
      this.error = null;
      axios
        .put(`${url}user/demote/${userId}`, { headers })
        .then((res) => {
          console.log(res);
          alert('OK');
          this.getAllUsers();
        })
        .catch((err) => {
          this.error = err;
        });
    },
    searchUser() {
      return this.membersList.filter((member) => {
        return member.username
          .toLowerCase()
          .includes(this.searchBarValue.toLowerCase());
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
      axios
        .get(`${url}user`, { headers })
        .then((res) => {
          this.membersList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style scoped>
.panel-container {
  width: 90%;
  min-height: 100vh;
  margin: auto;
  background-color: var(--light-gray);
  position: relative;
}
.closer {
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 1rem;
}
h1 {
  color: var(--primary);
  text-align: center;
  padding: 2rem 0;
  letter-spacing: 1.5px;
  font-family: var(--font-2);
  margin: auto;
  width: 90%;
}
.members__container {
  background-color: var(--white);
  padding: 2rem;
  margin: auto;
  width: 90%;
  min-height: 75vh;
}
.form-group {
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 0;
}

.form-group label {
  font-family: var(--font-2);
  font-size: 1.1rem;
  color: var(--black);
  font-weight: bolder;
  margin-right: 1rem;
}

.form-group input {
  width: 90%;
  max-width: 20rem;
  padding: 0.6rem;
  border: 1px solid black;
}
.members__container h2 {
  color: var(--primary);
  font-family: var(--font-2);
  padding: 1rem 0;
}
.members__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}
.member__card {
  background-color: var(--white);
  border: 1px solid black;
  max-width: 20rem;
  padding: 1rem 0.5rem 1.8rem 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: 5px;
  position: relative;
}
.member__card__infos {
  background: var(--white);
  grid-area: 1 / 2 / 2 / 3;
  padding: 0.3rem;
}
.member__card__img {
  grid-area: 1 / 1 / 2 / 2;
}
.member__card__img img {
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  margin: auto;
  outline: 1px solid black;
}
.member__card__infos h3 {
  color: var(--primary);
  font-size: 1rem;
  font-family: var(--font-2);
  margin-bottom: 0.5rem;
}
.member__card__infos {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.member {
  color: var(--green);
}
.modo {
  color: blue;
}
.admin {
  color: var(--red);
}
.user-id {
  margin-top: 0.5rem;
}
.actions {
  background-color: var(--light-gray);
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.actions i {
  font-size: 1rem;
  margin: 0 0.5rem;
  color: var(--secondary);
  cursor: pointer;
}
.actions i:nth-child(2) {
  color: var(--red);
}
.actions i:nth-child(3) {
  color: black;
}
.actions i:hover {
  opacity: 0.7;
}
.error {
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 1.5rem;
  background-color: var(--red);
  color: var(--white);
}
@media screen and (max-width: 1440px) {
  .panel-container {
    width: 100%;
  }
}
@media screen and (max-width: 1024px) {
  .members__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 800px) {
  .members__list {
    margin: auto;
  }
  .members__grid {
    grid-template-columns: repeat(1, 1fr);
  }
  .member__card {
    width: 22rem;
  }
  .members__container h2 {
    text-align: center;
  }
}
</style>
