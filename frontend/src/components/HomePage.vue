<template>
  <div class="homepage">
    <div class="container">
      <img src="../assets/groupo-logo-white.png" alt="Logo de groupomania" />
      <ul>
        <li>
          <button><router-link to="/signup">Sign Up</router-link></button>
          <button><router-link to="/login">Login In</router-link></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  mounted() {
    if (localStorage.getItem('user')) {
      this.$router.push('posts');
    }
  },
};
</script>

<style scoped>
.homepage {
  width: 85%;
  margin: auto;
  background-image: url(../assets/home-bg.jpg);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: flex-end;
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
}

.homepage::after {
  content: '';
  position: absolute;
  z-index: 1;
  inset: 0;
  opacity: 0.7;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
}

.homepage .container {
  width: 75%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;
}

.homepage .container img {
  width: 25rem;
  height: 5rem;
  object-fit: cover;
  margin-left: 5rem;
}

.container ul {
  margin-right: 2rem;
}

.container button {
  outline: none;
  border: none;
  background-color: var(--transp5);
  transition: 0.4s;
  padding: 0.3rem 1rem;
  width: 7rem;
  margin: 0 0.2rem;
}

.container button:nth-child(2) {
  margin-left: 1.5rem;
}

.container button:hover {
  background-color: rgba(230, 230, 230, 0);
  outline: white 1px solid;
}

.container ul li a {
  color: var(--white);
  font-size: 1.3rem;
  font-family: var(--font-2);
}

@media screen and (max-width: 1024px) {
  .homepage {
    clip-path: none;
    align-items: center;
  }
  .homepage .container {
    width: 100%;
    flex-direction: column;
  }
  .container button {
    margin: 1rem 0 0 -2rem;
  }
}
@media screen and (max-width: 800px) {
  .homepage {
    align-items: flex-start;
  }
  .homepage .container {
    justify-content: baseline;
    align-items: flex-start;
    margin-top: 8rem;
  }
  .homepage .container img {
    margin-left: 2rem;
    width: 85%;
  }
  .container ul {
    margin: 2rem 0 0 2rem;
  }
  .container button {
    margin: 0;
  }
}
</style>
