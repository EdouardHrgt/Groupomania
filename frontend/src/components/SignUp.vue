<template>
  <div class="flex signup-container">
    <header class="flex">
      <ul>
        <li><router-link to="/">HOME</router-link></li>
        <div class="bar"></div>
        <li><router-link to="/login">LOGIN</router-link></li>
      </ul>
    </header>
    <h1>Sign Up</h1>
    <div class="form-container flex">
      <form @submit.prevent="submitSignup">
        <div class="form-group">
          <label for="username">Username : </label>
          <input
            pattern=".*\S+.*"
            type="text"
            name="username"
            placeholder="Enter your Name"
            maxlength="50"
            minLength="3"
            required
            oninvalid="this.setCustomValidity('Please use a real username with no blanks')"
          />
        </div>
        <div class="form-group">
          <label for="email">Email : </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
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
        <div class="form-group">
          <label for="confirm">Confirmation : </label>
          <input
            type="password"
            name="confirm"
            placeholder="Confirm your password"
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
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignUp',
  data: function () {
    return {
      error: false,
      valid: false,
      user: null,
    };
  },

  methods: {
    submitSignup(event) {
      const { username, email, password, confirm } = Object.fromEntries(
        new FormData(event.target)
      );
      this.username = username;
      this.email = email;
      this.password = password;
      this.confirm = confirm;
      this.user = { username, email, password };

      if (this.confirm != this.password) {
        this.error = "Your password doesn't match !";
      }
      // Else If
      if (this.confirm == this.password) {
        this.error = false;
        axios
          .post('http://localhost:3000/api/user/signup', {
            username,
            email,
            password,
          })
          .then((res) => {
            console.log(res);
            this.valid = 'Your account is now created !';
            this.error = false;
            this.toLogin(1500);
          })
          .catch((err) => {
            this.valid = false;
            this.error = err.response.data.message;
          });
      }
    },
    toLogin(time) {
      setTimeout(() => {
        this.$router.push('login');
      }, time);
    },
  },
};
</script>

<style scoped>
.signup-container {
  width: 1440px;
  min-height: 100vh;
  margin: auto;
  flex-direction: column;
}

header {
  width: 50%;
  position: fixed;
  top: 5rem;
}

header ul {
  display: flex;
}

.bar {
  background-color: var(--transp4);
  width: 2px;
  height: 1rem;
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
  width: 50%;
  position: relative;
}

.form-container form {
  width: 70%;
}

.form-group,
.message {
  width: 100%;
  margin: 1rem 0;
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
  width: 90%;
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
  .signup-container {
    width: 100%;
  }
  .form-container {
    width: 700px;
  }
  .form-container form {
    width: 100%;
  }
}

@media screen and (max-width: 1024px) {
  header {
    top: 0.3rem;
  }
  .form-group,
  .message {
    text-align: center;
    align-items: center;
  }
  .form-group input,
  .err-msg,
  .valid-msg {
    width: 80%;
  }
}
@media screen and (max-width: 800px) {
  .form-container {
    width: 90%;
  }
  .form-group input,
  .err-msg,
  .valid-msg {
    width: 90%;
  }
}
</style>
