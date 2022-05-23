<template>
  <div>
    <homepage />
  </div>
</template>

<script>
import HomePage from '@/components/HomePage.vue';
export default {
  name: 'Home',
  components: {
    homepage: HomePage,
  },
  created() {
    const html = document.documentElement;
    html.setAttribute('lang', 'en');
  },
};
</script>
