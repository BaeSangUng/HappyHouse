<template>
  <div>
    <ul v-for="(item, index) in apts" :key="index">
      <li>{{ item.거래금액 }}</li>
      <li>{{ item.건축년도 }}</li>
      <li>{{ item.법정동 }}</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
