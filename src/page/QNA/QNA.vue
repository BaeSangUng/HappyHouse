<template>
  <div>
    <helpnavbar />
    <p>QNA 페이지임돠</p>
    <router-view />
  </div>
</template>

<script>
import helpnavbar from '@/components/helpnavbar.vue';
export default {
  components: {
    helpnavbar,
  },
  created() {
    this.$router.push('list');
  },
};
</script>

<style></style>
