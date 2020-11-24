<template>
  <div class="miniNotice" id="miniNotice">
    <ul id="miniul">
      <li class="minili" id="minilihead"><span>공지사항</span></li>
      <li class="minili">
        <router-link :to="'/happyhouse/HelpDesk/Notice/read'">
          채용 공고 안내</router-link
        >
      </li>
      <li class="minili">
        <router-link :to="'/happyhouse/HelpDesk/Notice/read'">
          투자 1000억대 돌파 되었습니다!.</router-link
        >
      </li>
      <li class="minili">
        <router-link :to="'/happyhouse/HelpDesk/Notice/read'">
          사용 방법은 about을 통해 확인 하여 주세요.</router-link
        >
      </li>
      <li class="minili">
        <router-link :to="'/happyhouse/HelpDesk/Notice/read'">
          반갑습니다 여러분, Ez Real estate입니다.</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
#miniNotice {
  border-left: 1px solid black;
}
#miniul {
  text-align: left;
  list-style: none;
}
#miniul li span {
  font-size: 20px;
  font-weight: bold;
}
#minilihead {
  padding-bottom: 10px;
}
</style>
