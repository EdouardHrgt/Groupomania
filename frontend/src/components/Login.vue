<template>
  <div class="flex login-container">
    <header>
      <ul>
        <li><router-link to="/">HOME</router-link></li>
        <div class="bar"></div>
        <li><router-link to="/signup">SIGN UP</router-link></li>
      </ul>
    </header>
    <h1>Login In</h1>
    <div class="loader" v-if="loading">
      <loader />
    </div>
    <div class="form-container">
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="username">Username : </label>
          <input
            pattern=".*\S+.*"
            type="text"
            name="username"
            placeholder="Enter your Name"
            required
            minLength="3"
            maxlength="50"
          />
        </div>
        <div class="form-group">
          <label for="password">Password : </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            minlength="8"
            required
          />
        </div>
        <div class="message" v-if="error || valid">
          <p class="err-msg" v-if="error">{{ error }}</p>
          <p class="valid-msg" v-if="valid">{{ valid }}</p>
        </div>
        <div class="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    <div class="infos">
      <p>
        Already have an account ?
        <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue';
export default {
  name: 'Login',
  components: {
    loader: Loader,
  },
  data: function () {
    return {
      user: null,
      error: false,
      valid: false,
      loading: false,
    };
  },
  methods: {
    submitLogin(event) {
      this.loading = true;
      const { username, password } = Object.fromEntries(
        new FormData(event.target)
      );
      this.username = username;
      this.password = password;
      axios
        .post('http://localhost:3000/api/user/login', {
          username,
          password,
        })
        .then((res) => {
          this.user = res.data;
          console.log(res.data);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.valid = 'User logged successfully';
          this.error = false;
          this.loading = false;
          this.$router.push('posts');
        })
        .catch((err) => {
          this.valid = false;
          if (err.response === undefined) {
            this.error = 'Something went wrong... Please try again later !';
          } else {
            this.error = err.response.data.message;
          }
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 1440px;
  min-height: 100vh;
  margin: auto;
  flex-direction: column;
}

header {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 5rem;
}

header ul {
  display: flex;
}

.bar {
  background-color: var(--transp4);
  width: 2px;
  height: 1.1rem;
  align-self: center;
}

header li a {
  color: var(--white);
  opacity: 0.8;
  font-size: 1.2rem;
  font-family: var(--font-2);
  padding: 0.5rem;
  transition: 0.4s;
  letter-spacing: 1px;
}

header li a:hover {
  color: var(--secondary);
}

h1 {
  font-family: var(--font-2);
  color: var(--white);
  letter-spacing: 1px;
  padding: 0.7rem;
  margin: 1.5rem 0 0 0;
  text-align: center;
}

.form-container {
  background-color: var(--transp2);
  width: 40%;
  min-height: 18rem;
  overflow: hidden;
  padding: 0 3rem;
}

.form-group,
.message {
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0;
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
  padding: 0.6rem 0;
  text-align: center;
  outline: 1px solid --black;
  box-shadow: var(--primary) 0px 2px 5px;
}

.form-group input::placeholder {
  color: var(--primary);
}

.err-msg,
.valid-msg {
  color: var(--white);
  margin-top: 0.3rem;
  text-align: center;
  font-size: 0.9rem;
  width: 90%;
}

.err-msg {
  background-color: var(--red);
}

.valid-msg {
  background-color: var(--green);
}

.form-group button {
  width: 40%;
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

.infos p {
  font-family: var(--font-2);
  color: var(--white);
  padding: 0.3rem;
}

.infos p a {
  color: var(--secondary);
  font-weight: 700;
  margin-left: 0.4rem;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.infos p a:hover {
  opacity: 0.7;
}

@media screen and (max-width: 1440px) {
  .login-container {
    width: 100%;
  }
  .form-container {
    width: 550px;
  }
}

@media screen and (max-width: 1024px) {
  header {
    top: 2rem;
  }
  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  form {
    width: 100%;
  }
  .form-group label {
    margin-bottom: 1rem;
  }
  .form-image {
    display: none;
  }
  .form-group,
  .message {
    text-align: center;
    align-items: center;
  }
  .form-group input,
  .err-msg,
  .valid-msg {
    width: 70%;
  }
}

@media screen and (max-width: 800px) {
  .form-container {
    width: 90%;
    padding: 0;
  }
  h1 {
    margin: 0;
  }
}
</style>
