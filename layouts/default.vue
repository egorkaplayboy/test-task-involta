<template>
  <div class="conatiner">
    <TheHeader />
    <nuxt />
  </div>
</template>
<script>
import TheHeader from "../components/TheHeader.vue";

export default {
  components: { TheHeader },
};
</script>
<style scoped>
  .conatiner {
    max-width: 1060px;
    margin: 0 auto;
  }
</style>
