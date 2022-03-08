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
  width: 100%;
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
  opacity: 0.8;
  background-color: var(--primary);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 1000'%3E%3Cg %3E%3Ccircle fill='%23330055' cx='50' cy='0' r='50'/%3E%3Cg fill='%233a015d' %3E%3Ccircle cx='0' cy='50' r='50'/%3E%3Ccircle cx='100' cy='50' r='50'/%3E%3C/g%3E%3Ccircle fill='%23410165' cx='50' cy='100' r='50'/%3E%3Cg fill='%2348026e' %3E%3Ccircle cx='0' cy='150' r='50'/%3E%3Ccircle cx='100' cy='150' r='50'/%3E%3C/g%3E%3Ccircle fill='%23500376' cx='50' cy='200' r='50'/%3E%3Cg fill='%2357047e' %3E%3Ccircle cx='0' cy='250' r='50'/%3E%3Ccircle cx='100' cy='250' r='50'/%3E%3C/g%3E%3Ccircle fill='%235f0587' cx='50' cy='300' r='50'/%3E%3Cg fill='%2367068f' %3E%3Ccircle cx='0' cy='350' r='50'/%3E%3Ccircle cx='100' cy='350' r='50'/%3E%3C/g%3E%3Ccircle fill='%236f0798' cx='50' cy='400' r='50'/%3E%3Cg fill='%237707a0' %3E%3Ccircle cx='0' cy='450' r='50'/%3E%3Ccircle cx='100' cy='450' r='50'/%3E%3C/g%3E%3Ccircle fill='%238008a9' cx='50' cy='500' r='50'/%3E%3Cg fill='%238909b1' %3E%3Ccircle cx='0' cy='550' r='50'/%3E%3Ccircle cx='100' cy='550' r='50'/%3E%3C/g%3E%3Ccircle fill='%239109ba' cx='50' cy='600' r='50'/%3E%3Cg fill='%239a09c3' %3E%3Ccircle cx='0' cy='650' r='50'/%3E%3Ccircle cx='100' cy='650' r='50'/%3E%3C/g%3E%3Ccircle fill='%23a309cb' cx='50' cy='700' r='50'/%3E%3Cg fill='%23ad09d4' %3E%3Ccircle cx='0' cy='750' r='50'/%3E%3Ccircle cx='100' cy='750' r='50'/%3E%3C/g%3E%3Ccircle fill='%23b608dc' cx='50' cy='800' r='50'/%3E%3Cg fill='%23c007e5' %3E%3Ccircle cx='0' cy='850' r='50'/%3E%3Ccircle cx='100' cy='850' r='50'/%3E%3C/g%3E%3Ccircle fill='%23c905ee' cx='50' cy='900' r='50'/%3E%3Cg fill='%23d303f6' %3E%3Ccircle cx='0' cy='950' r='50'/%3E%3Ccircle cx='100' cy='950' r='50'/%3E%3C/g%3E%3Ccircle fill='%23D0F' cx='50' cy='1000' r='50'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: contain;
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
  background-color: var(--transp1);
  transition: 0.4s;
  padding: 0.3rem 1rem;
  width: 7rem;
  margin: 0 0.2rem;
}

.container button:nth-child(2) {
  background-color: var(--transp4);
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
  }
  .container ul {
    margin: 2rem 0 0 2rem;
  }
  .container button {
    margin: 0;
  }
}
</style>
