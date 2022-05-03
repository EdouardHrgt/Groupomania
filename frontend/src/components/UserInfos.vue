<template>
  <div>
    <div class="infos_card">
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
  z-index: 10;
  background-color: green;
}
</style>
