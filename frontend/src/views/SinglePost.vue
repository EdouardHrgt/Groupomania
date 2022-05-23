<template>
  <singlepost />
</template>

<script>
import SinglePost from '@/components/SinglePost.vue';
export default {
  name: 'SinglePost',
  components: {
    singlepost: SinglePost,
  },
  created() {
    const html = document.documentElement;
    html.setAttribute('lang', 'en');
  },
};
</script>
