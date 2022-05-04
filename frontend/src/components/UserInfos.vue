<template>
  <div>
    <div class="infos_card">
      <i class="fa-solid fa-xmark"></i>
      <h1>User Infos</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfos',
  data() {
    return {
      user: {},
    };
  },
};
</script>

<style scoped>
.infos_card {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  background-color: var(--white);
  padding: 2rem;
}
h1 {
  color: rgb(0, 0, 0);
  font-size: 3rem;
}
.fa-xmark {
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: black;
  cursor: pointer;
}
</style>
