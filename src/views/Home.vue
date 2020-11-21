<template>
  <div class="home">
    <div class="banner">
      <div class="emptyspace"></div>
      <div id="banner">
        <h2>당신이 원하는 집을 검색</h2>
        <b-form-input id="searchinput"></b-form-input>
        <b-button id="searchbtn" variant="success">Success</b-button>
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
