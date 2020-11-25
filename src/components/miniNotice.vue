<template>
  <div class="miniNotice" id="miniNotice">
    <div class="emptyspace"></div>
    <ul id="miniul">
      <li class="minili" id="minilihead">
        <span id="noticecontext">공지사항</span>
      </li>
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
    <div class="whitespace"></div>
    <ul id="miniul">
      <li class="minili" id="minilihead">
        <span id="videoText">How to Use</span>
      </li>
      <li class="minili">
        <iframe
          width="90%"
          height="400"
          src="https://www.youtube.com/embed/pwwXCvZYejM"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
.whitespace {
  width: 100%;
  height: 100px;
}
#miniNotice {
  border-left: 1px solid black;
}
.videopart {
  text-align: left;
}
#videoText {
  text-align: left;
  font-size: 30px;
  font-weight: bold;
}
#miniul {
  text-align: left;
  list-style: none;
}
#miniul li span {
  font-size: 30px;
  font-weight: bold;
}
#miniul li {
  font-size: 20px;
}
.minili a {
  text-decoration: none;
  color: black;
}
.minili a:link {
  text-decoration: none;
}
.minili a:hover {
  color: dodgerblue;
  font-size: 22px;
}
#minilihead {
  padding-bottom: 10px;
}
</style>
