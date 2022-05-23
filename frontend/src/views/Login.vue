<template>
  <div>
    <login />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
export default {
  name: 'Login',
  components: {
    login: Login,
  },
  created() {
    const html = document.documentElement;
    html.setAttribute('lang', 'en');
  },
};
</script>
