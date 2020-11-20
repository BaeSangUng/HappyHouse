<template>
  <div>
    <!-- <router-view /> -->
    
    <div class="row">
      <!-- 왼쪽 사이드 -->
      <div class="col">
        <helpnavbar />
      </div>

      <!-- 중간 -->
      <div class="col-8">
        <router-view />
      </div>

      <!-- 오른쪽 사이드 -->
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
import helpnavbar from '@/components/helpnavbar.vue';
export default {
  components: {
    helpnavbar
  },
};
</script>

<style></style>
