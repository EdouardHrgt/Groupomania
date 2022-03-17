<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-infos">
        <img src="../assets/default_user.jpg" alt="profile picture" />
        <h1>MyProfile</h1>
        <i class="fa-solid fa-xmark"></i>
      </div>

      <form>
        <div class="form-group">
          <label for="username">Username : </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your Name"
            required
            maxlength="50"
          />
        </div>
        <div class="form-group">
          <label for="email">Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            required
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
          <label for="file" id="file-btn">Profile-picture</label>
          <input id="file" type="file" />
        </div>
        <div class="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style scoped>
.profile-container {
  width: 80%;
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
  width: 80%;
  text-align: center;
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
  font-size: 1.1rem;
  color: var(--black);
  width: 6.5rem;
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
  width: 40%;
  padding: 0.6rem 0;
  cursor: pointer;
  color: var(--white);
  background-color: var(--secondary);
  font-size: 1.1rem;
  font-weight: 700;
  transition: 0.4s;
  margin-left: 7rem;
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
  margin-left: 7rem;
  cursor: pointer;
  outline: var(--black) 1px solid;
}
#file {
  display: none;
}
</style>
