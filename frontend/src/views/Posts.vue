<template>
  <div>
  <posts />
  </div>
</template>

<script>
import Posts from "@/components/Posts.vue";
export default {
  name: "Posts",
  components: {
    posts: Posts,
  },
};
</script>