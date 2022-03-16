<template>
  <div class="profile-container">
    <i class="fa-solid fa-xmark"></i>
    <h1>Hello</h1>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style scoped>
.profile-container {
  position: fixed;
  inset: 1rem;
  z-index: 101;
  background-color: var(--white);
  text-align: center;
}
.profile-container i {
  position: absolute;
  font-size: 2rem;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: var(--primary);
}
h1 {
  margin-top: 5rem;
  color: var(--primary);
  background: var(--gray);
}
</style>
