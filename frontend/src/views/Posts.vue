<template>
  <div>
    <posts />
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue';
export default {
  name: 'Posts',
  components: {
    posts: Posts,
  },
  created() {
    const html = document.documentElement;
    html.setAttribute('lang', 'en');
  },
};
</script>
