<template>
  <div class="profile-container">
    <div class="profile-card">
      <!-- Profile infos -->
      <div class="profile-infos">
        <img :src="user.image" :alt="'profile picture of ' + user.username" />
        <div class="user">
          <h1>{{ user.username }}</h1>
          <h2 v-if="user.permission == 'member'">{{ user.permission }}</h2>
          <h2 class="admin" v-if="user.permission == 'admin'">
            {{ user.permission }}
          </h2>
          <h2 class="modo" v-if="user.permission == 'moderator'">
            {{ user.permission }}
          </h2>
        </div>
        <i class="fa-solid fa-xmark" @click="goToPosts"></i>
      </div>
      <!-- Profile btns -->
      <div class="profile-update-container flex">
        <div class="profile-update" @click="toggleUpdateProfile">
          <p>Update my profile</p>
        </div>
        <div class="profile-update" @click="toggleDeleteProfile">
          <p>Delete my profile</p>
        </div>
      </div>
      <!-- Update Profile -->
      <div class="updateprofile" v-if="updateProfileBox">
        <form>
          <div class="form-group">
            <label for="username">Username : </label>
            <input
              type="text"
              name="username"
              id="username"
              :value="user.username"
              required
              maxlength="50"
            />
          </div>
          <div class="form-group">
            <label for="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Confirmation : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div class="form-group">
            <label for="file" id="file-btn">Profile-picture</label>
            <input id="file" type="file" />
          </div>
          <div class="form-group">
            <button type="submit">Update my profile</button>
          </div>
        </form>
      </div>
      <!-- Delete Profile -->
      <div class="delete-profile flex" v-if="deleteProfileBox">
        <div class="confirmation-wrapper">
          <p>Do you want to delete your profile ?</p>
          <div class="icons">
            <i class="fa-solid fa-check" @click="deleteAccount"></i>
            <i class="fa-solid fa-xmark" @click="toggleDeleteProfile"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = 'http://localhost:3000/api/';
export default {
  name: 'Profile',
  data: function () {
    return {
      user: null,
      updateProfileBox: false,
      deleteProfileBox: false,
    };
  },
  methods: {
    toggleUpdateProfile() {
      if (this.updateProfileBox) {
        this.updateProfileBox = false;
      } else {
        this.updateProfileBox = true;
        this.deleteProfileBox = false;
      }
    },
    toggleDeleteProfile() {
      if (this.deleteProfileBox) {
        this.deleteProfileBox = false;
      } else {
        this.deleteProfileBox = true;
        this.updateProfileBox = false;
      }
    },
    deleteAccount() {
      alert('Account deleted');
      //this.$router.push('/');
    },
    goToPosts() {
      alert('ok');
      //  dire au parent : this.profile = false;
    },
  },
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push('/');
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(url);
    }
  },
};
</script>

<style scoped>
.profile-container {
  width: 100%;
  margin: auto;
  min-height: 100vh;
  background-color: var(--transp2);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--black);
}
.profile-card {
  background-color: var(--light-gray);
  margin-top: 10rem;
  padding: 2rem;
  width: 55%;
  min-height: 70vh;
  text-align: center;
  position: relative;
}
.profile-infos {
  display: flex;
  align-items: center;
  position: relative;
}
.profile-infos i {
  color: var(--black);
  font-size: 2rem;
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
}
img {
  width: 10rem;
  height: 10rem;
  margin-right: 2rem;
  outline: 1px solid var(--black);
}
.user {
  text-align: left;
}
.user h1 {
  font-family: var(--font2);
  font-size: 2.3rem;
}
.user h2 {
  color: var(--green);
  font-style: italic;
  font-size: 1.2rem;
}
.admin {
  color: var(--red);
}
.modo {
  color: blue;
}
.profile-update {
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: var(--white);
  font-weight: bolder;
  margin: 1rem 1rem 0;
  cursor: pointer;
  transition: 0.4s;
}
.profile-update:hover {
  opacity: 0.7;
}
form {
  width: 70%;
  margin: 2rem 0;
}
.form-group {
  width: 100%;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  padding: 0.3rem 0rem;
}
.form-group label {
  font-family: var(--font-2);
  font-size: 1rem;
  color: var(--black);
  width: 7.7rem;
  margin-bottom: 0.3rem;
  margin-right: 1rem;
}
.form-group input {
  width: 90%;
  padding: 0.6rem 0;
  text-align: center;
}
.form-group input::placeholder {
  color: var(--primary);
}
.form-group button {
  width: 30%;
  padding: 0.6rem 0;
  cursor: pointer;
  color: var(--white);
  background-color: var(--secondary);
  font-size: 1.1rem;
  font-weight: 700;
  transition: 0.4s;
  margin-left: 8rem;
}
.form-group button:hover {
  outline: var(--white) 1px solid;
  background-color: transparent;
}
#file-btn {
  background-color: var(--white);
  color: var(--primary);
  width: 8rem;
  text-align: center;
  padding: 0.3rem;
  margin-left: 8rem;
  cursor: pointer;
  outline: var(--black) 1px solid;
}
#file {
  display: none;
}
.delete-profile {
  position: absolute;
  inset: 0;
  background-color: var(--transp6);
  backdrop-filter: blur(3px);
}
.confirmation-wrapper i {
  margin: 0 0.5rem;
  font-size: 1.7rem;
  cursor: pointer;
  transition: 0.3s;
}
.confirmation-wrapper i:first-child {
  color: var(--green);
}
.confirmation-wrapper i:last-child {
  color: var(--red);
}
.confirmation-wrapper i:hover {
  opacity: 0.8;
  transform: scale(1.2);
}
</style>
