<template>
  <div>
    <h2>로그인 하시겠습니까?</h2>
    <br />
    <router-link to="/happyhouse/loginModal"><button>로그인</button></router-link>
    <router-link to="/happyhouse/joinModal"><button>회원가입</button></router-link>

    <h2>''님 환영합니다!</h2>
    <router-link to="/happyhouse/updateModal"><button>내 정보 수정</button></router-link>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {},
  },
};
</script>

<style></style>
