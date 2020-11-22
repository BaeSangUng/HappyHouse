<template>
  <div class="home">
    <div class="banner">
      <div class="emptyspace"></div>
      <div id="banner">
        <h2 id="bannerContent">당신이 원하는 집을 검색</h2>
        <p>ex) 서울특별시 / 중구 / 사직동 / etc..</p>

        <b-form-input id="searchinput"></b-form-input>
        <b-button id="searchbtn" variant="success">Search</b-button>
      </div>
    </div>

    <div class="row">
      <!-- 왼쪽 사이드 -->
      <!-- <div class="col"></div> -->

      <!-- 중간 -->
      <!-- <div> -->
      <div class="ingichart">
        <ingichart />
      </div>
      <div class="miniNotice">
        <miniNotice />
      </div>
      <!-- </div> -->

      <!-- 오른쪽 사이드 -->
      <!-- <div class="col"></div> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ingichart from '@/components/ingichart.vue';
import miniNotice from '@/components/miniNotice.vue';
export default {
  components: {
    ingichart,
    miniNotice,
  },
};
</script>

<style>
#bannerContent {
  color: cornsilk;
}
#banner p {
  color: grey;
}
.banner {
  position: relative;
  z-index: 1;
  background-image: url('../assets/main직접.jpg');
}
</style>
