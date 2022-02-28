<template>
  <div class="signup-container">
      <header>
        <ul>
            <li><router-link to="/">HOME</router-link></li>
            <div class="bar"></div>
            <li><router-link to="/login">LOGIN</router-link></li>
        </ul>
    </header>
    <h1>Sign Up</h1>
    <div class="form-container">
        <form action="" method="post">  
            <div class="form-group">
                <label for="username">Username : </label>
                <input type="text" name="username" id="username" placeholder="Enter your Name" required maxlength="50">
                <p class="err-msg">This is an error message</p>
            </div>
            <div class="form-group">
                <label for="email">Email : </label>
                <input type="email" name="email" id="email" placeholder="Enter your Email" required>
                <p class="err-msg">This is an error message</p>
            </div>
            <div class="form-group">
                <label for="password">Password : </label>
                <input type="password" name="password" id="password" placeholder="Enter your password" required>
                <p class="err-msg">This is an error message</p>
            </div>
            <div class="form-group">
                <button type="submit">Submit</button>
            </div>
        </form>
        <div class="form-image"></div>
    </div>
    <div class="infos">
        <p>Already have an account ? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
};
</script>

<style scoped>
.signup-container {
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
  padding: .7rem;
  margin: 1.5rem 0 0 0;
  text-align: center;
}

.form-container {
  background-color: var(--transp2);
  width: 50%;
  border-radius: 15px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
}

.form-group {
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
  border-radius: 15px;
  padding: 0.6rem 0;
  text-align: center;
  outline: 1px solid --black;
  box-shadow: var(--primary) 0px 2px 5px;
}

.form-group input::placeholder {
  color: var(--primary);
}

.form-group input:focus {
  background-color: var(--transp2);
}

.form-group input:valid {
  outline: 2px solid green;
}

.form-group .err-msg {
  color: #DD4124;
  margin-top: 0.3rem;
  text-align: center;
  font-size: 0.9rem;
  width: 90%;
  /* display: none; */
}

.form-group button {
  width: 40%;
  align-self: center;
  padding: 0.6rem 0;
  border-radius: 20px;
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
  width: 100%;
  height: 100%;
  background-image: url(../assets/groupo-logo.png);
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
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
}

@media screen and (max-width: 1024px) {
  header {
    top: 0.3rem;
  }
  .form-container {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr;
  }
  .form-image {
    background-size: 50%;
  }
  .form-group {
    text-align: center;
    align-items: center;
  }
  .form-group input {
    width: 70%;
  }
}

@media screen and (max-width: 800px) {
  .form-container {
    width: 90%;
  }
}
</style>