<template>
  <div>
    <helpnavbar />
    <router-view />
  </div>
</template>

<script>
import helpnavbar from '@/components/helpnavbar.vue';
export default {
  components: {
    helpnavbar,
  },
};
</script>

<style></style>
