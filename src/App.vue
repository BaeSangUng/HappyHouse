<template>
  <div id="app" class="container-fluid" style="font-family: 'Noto Sans KR', sans-serif; font-size:20px;">
    <div class="navbar">
      <img id="logo" src="@/assets/logo.jpg" />
      <b-nav tabs>
        <b-nav-item :active="tab == 1" @click="changetab(1)" href="/">
          Home
        </b-nav-item>
        <b-nav-item
          :active="tab == 2"
          @click="changetab(2)"
          href="/happyhouse/Search"
        >
          Search
        </b-nav-item>
        <b-nav-item
          :active="tab == 3"
          @click="changetab(3)"
          href="/happyhouse/HelpDesk"
        >
          HelpDesk
        </b-nav-item>
        <b-nav-item>
          <div v-if="getAccessToken">
            <b-avatar
              variant="primary"
              v-text="getUserId.charAt(0).toUpperCase()"
            ></b-avatar>
            {{ getUserName }}({{ getUserId }})님 환영합니다. |
            <router-link to="/happyhouse/updateModal">내 정보</router-link> |
            <a @click.prevent="onClickLogout">로그아웃</a> | 
            <router-link to="/happyhouse/jjim">찜목록 보기</router-link>
          </div>

          <div v-else>
            <router-link to="/happyhouse/loginModal">로그인</router-link> |
            <router-link to="/happyhouse/joinModal">회원가입</router-link> |

          </div>
        </b-nav-item>
      </b-nav>
    </div>
    <router-view />

    <div class="appfooter">
      <appfooter />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import appfooter from '@/views/AppFooter.vue';

export default {
  components: {
    appfooter,
  },
  data() {
    return {
      tab: '',
    };
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserPw', 'getUserName']),
  },
  methods: {
    changtab(num) {
      this.tab = num;
    },
    onClickLogout() {
      this.$store
        .dispatch('LOGOUT')
        .then(() => this.$router.replace('/').catch(() => {}));
    },
  },
  created() {
    if (
      sessionStorage.getItem('accessToken') != null &&
      sessionStorage.getItem('accessToken') != ''
    ) {
      this.$store.state.accessToken = sessionStorage.getItem('accessToken');
      this.$store.state.userId = sessionStorage.getItem('userId');
      this.$store.state.userPw = sessionStorage.getItem('userPw');
      this.$store.state.userName = sessionStorage.getItem('userName');
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container-fluid {
  padding: 0;
}
.navbar {
  width: 100%;
  position: fixed;
}
#logo {
  width: 80px;
  height: 80px;
}
.emptyspace {
  height: 200px;
}
#banner {
  height: 200px;
  position: relative;
  width: 100%;
}
#searchinput {
  position: relative;
  width: 40%;
  display: inline-block;
}
#searchbtn {
  position: relative;
  display: inline-block;
}
.col-8 {
  padding: 0;
}
</style>
