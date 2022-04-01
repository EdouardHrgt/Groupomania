<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-card">
        <!-- Profile infos -->
        <div class="profile-infos" v-if="user">
          <img
            v-if="user.image"
            :src="user.image"
            :alt="'profile picture of ' + user.username"
          />
          <div class="user">
            <h1>{{ user.username }}</h1>
            <!-- <strong @click="saveUser" >User depuis vueX : {{ getUser }}</strong>
            <br /><br />
            <strong>Double de l'id : {{ doubleId }}</strong> -->
            <h2 class="member" v-if="user.permission == 'member'">
              {{ user.permission }}
            </h2>
            <h2 class="admin" v-else-if="user.permission == 'admin'">
              {{ user.permission }}
            </h2>
            <h2 class="modo" v-else-if="user.permission == 'moderator'">
              {{ user.permission }}
            </h2>
          </div>
          <i class="fa-solid fa-xmark" @click="closeProfile"></i>
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
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label for="username">Username : </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter a new name"
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
                minlength="8"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <label for="confirmation">Confirmation : </label>
              <input
                type="password"
                name="confirmation"
                id="confirmation"
                placeholder="Confirm your password"
                required
                minlength="8"
                v-model="confirmation"
              />
            </div>
            <div class="form-group file-div">
              <label for="file-input">Profile-picture</label>
              <input
                type="file"
                name="image"
                accept="image/png, image/jpeg, image/jpg"
                id="file-input"
              />
            </div>
            <div class="form-group">
              <p class="infos-msg error-msg" v-if="error">{{ error }}</p>
              <p class="infos-msg success-msg" v-if="success">{{ success }}</p>
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
            <p class="delete-msg" v-if="deleteMsg">{{ deleteMsg }}</p>
            <p class="delete-msg" v-else-if="errDeleteMsg">
              {{ errDeleteMsg }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const url = 'http://localhost:3000/api/user/';
export default {
  name: 'Profile',
  props: ['toggleprofile', 'USER'],
  data: function () {
    return {
      user: null,
      updateProfileBox: false,
      deleteProfileBox: false,
      password: '',
      confirmation: '',
      error: false,
      success: false,
      bool: false,
      deleteMsg: '',
      errDeleteMsg: '',
    };
  },
  /*computed: {
    getUser() {
      return this.$store.state.storedUser;
    },
    doubleId() {
      const user = this.$store.state.storedUser;
      if (user.userId === 0) {
        return 'No user Id...';
      } else {
        return this.$store.getters.doTheMaths;
      }
    },
    saveUser() {
      //fonction commit prends 2 arguments : fonction mutation + data à prendre
      return this.$store.commit('saveStoredUser', this.user);
    },
  },
  */
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
        this.errDeleteMsg = '';
        this.deleteMsg = '';
      }
    },
    deleteAccount() {
      const userId = this.user.userId;
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.user.token,
      };
      axios
        .delete(`${url}delete/${userId}`, { headers })
        .then((res) => {
          console.log(res);
          this.errDeleteMsg = '';
          this.deleteMsg = 'Account deleted !';
          localStorage.removeItem('user');
          this.user = null;
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
        })
        .catch((err) => {
          this.deleteMsg = '';
          this.errDeleteMsg = 'An error occured, please try gain later !';
          console.log(err);
        });
    },
    closeProfile() {
      this.$emit('profileCloser', this.bool);
    },
    updateUser(event) {
      if (this.confirmation != this.password) {
        this.error = 'Password do not match !';
      } else {
        this.error = false;
        const userId = String(this.user.userId);
        let User = new FormData(event.target);
        const headers = {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + this.user.token,
        };
        axios
          .put(`${url}update/${userId}`, User, { headers })
          .then((res) => {
            this.user.username = res.data.username;
            this.user.image = res.data.image;
            this.error = false;
            this.success = 'Your profile is updated';
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(this.user));
          })
          .catch((err) => {
            console.log(err);
            this.success = false;
            this.error = 'An error occured, please try again later';
          });
      }
    },
  },
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push('/');
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  },
};
</script>

<style scoped>
.profile-page {
  position: fixed;
  inset: 0;
  z-index: 110;
  background-color: var(--transp2);
}
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
  font-size: 1.5rem;
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
}
img {
  width: 10rem;
  height: 10rem;
  margin-right: 2rem;
  outline: 1px solid var(--transp1);
  object-fit: cover;
  border-radius: 50%;
}
.user {
  text-align: left;
}
.user h1 {
  font-family: var(--font2);
  font-size: 2rem;
}
.user .member {
  color: var(--green);
  font-style: italic;
  font-size: 1rem;
}
.admin {
  color: var(--red);
}
.modo {
  color: rgb(0, 67, 251);
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
.infos-msg {
  color: var(--white);
  text-align: center;
  font-size: 0.9rem;
  margin-left: 8rem;
  width: 100%;
}
.error-msg {
  background-color: var(--red);
}
.success-msg,
.delete-msg {
  background-color: var(--green);
}
.delete-msg {
  width: 100%;
  margin-top: 1rem;
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
  color: var(--black);
}
.file-div label {
  background-color: var(--white);
  color: var(--primary);
  width: 8rem;
  text-align: center;
  padding: 0.3rem;
  margin-left: 8rem;
  cursor: pointer;
  outline: var(--black) 1px solid;
}
#file-input {
  display: none;
}
.file-div label:hover {
  opacity: 0.7;
}
.delete-profile {
  position: absolute;
  inset: 0;
  background-color: var(--transp6);
  backdrop-filter: blur(3px);
}
.confirmation-wrapper {
  width: 40%;
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
@media screen and (max-width: 1440px) {
  .profile-card {
    width: 75%;
  }
}
@media screen and (max-width: 1024px) {
  .profile-card {
    width: 90%;
  }
  form {
    width: 80%;
  }
  .form-group button {
    width: 50%;
    margin-left: 7.5rem;
  }
  .file-div label {
    margin-left: 7.5rem;
  }
}
@media screen and (max-width: 800px) {
  .profile-card {
    width: 95%;
    margin-top: 0rem;
    min-height: 100vh;
  }
  .profile-infos {
    margin-bottom: 2rem;
  }
  img {
    width: 8rem;
    height: 8rem;
  }
  form {
    width: 100%;
  }
  .form-group {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0.3rem 0rem;
  }
  .form-group label {
    font-size: 0.9rem;
  }
  .form-group input {
    width: 85%;
  }
  .form-group button {
    width: 50%;
    margin-left: 0rem;
  }
  .file-div label {
    margin-left: 0rem;
  }
}
</style>
