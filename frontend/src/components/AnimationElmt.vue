<template>
  <div class="animation"></div>
</template>

<script>
export default {
  name: 'AnimationElmt',
};
</script>

<style scoped>
.animation {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: var(--primary);
  width: 100%;
  z-index: 100;
  animation-name: translation;
  animation-duration: 0.9s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes translation {
0% {
  width: 100%;
}
100% {
  width: 0;
  visibility: hidden;
}
}
</style>
