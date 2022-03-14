<template>
  <div class="flex profile-container">
    <h1>Hello {{ user }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data: function () {
    return {
      user: null,
    };
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
.profile-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--white);
}
h1 {
  color: var(--primary);
}
</style>
