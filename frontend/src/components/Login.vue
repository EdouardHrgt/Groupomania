<template>
  <div class="login-container">
    <header>
      <ul>
        <li><router-link to="/">HOME</router-link></li>
        <div class="bar"></div>
        <li><router-link to="/signup">SIGN UP</router-link></li>
      </ul>
    </header>
    <h1>Login In</h1>
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
            oninvalid="this.setCustomValidity('Your password must be a least 8 caracters with caps and number')"
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
      <div class="form-image"></div>
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
import axios from "axios";
export default {
  name: "Login",
  data: function () {
    return {
      user: null,
      error: false,
      valid: false,
    };
  },
  methods: {
    submitLogin(event) {
      const { username, email, password } = Object.fromEntries(
        new FormData(event.target)
      );
      this.username = username;
      this.email = email;
      this.password = password;
      axios
        .post("http://localhost:3000/api/user/login", {
          username,
          email,
          password,
        })
        .then((res) => {
          this.user = res.data;
          this.valid = "User logged successfully";
          this.error = false;
          localStorage.setItem("user", JSON.stringify(this.user));
          //this.$router.push("posts");
        })
        .catch((err) => {
          this.valid = false;
          this.error = err.response.data.message;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 50%;
  min-height: 18rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  position: relative;
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

.form-image {
  width: 90%;
  height: 90%;
  background-image: url(../assets/groupo-logo.png);
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  align-self: center;
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
    width: 700px;
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
    min-height: 55vh;
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
    margin: 2rem 0;
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
  }
  h1 {
    margin: 0;
  }
}
</style>
