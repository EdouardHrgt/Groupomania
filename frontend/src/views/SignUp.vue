<template>
  <div>
    <signup />
  </div>
</template>

<script>
import SignUp from '@/components/SignUp.vue';
export default {
  name: 'SignUp',
  components: {
    signup: SignUp,
  },
  created() {
    const html = document.documentElement;
    html.setAttribute('lang', 'en');
  },
};
</script>
