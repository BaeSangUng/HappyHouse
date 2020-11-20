<template>
  <div id="app" class="container-fluid">
    <img id="main_banner" alt="Vue logo" src="@/assets/main후보5.jpg" />

    <div class="row">
      <!-- 왼쪽 사이드 -->
      <div class="col">
        <div v-show="!showNavbar" :class="{ 'navbar-hidden': !showNavbar }">
          배너광고
        </div>
      </div>

      <!-- 중간 -->
      <div class="col-8">
        <div v-show="showNavbar" :class="{ 'fixed-nav-bar': showNavbar }">
          <router-link to="/">Home</router-link>
          <router-link to="/happyhouse/HelpDesk">HelpDesk</router-link>>
        </div>
        <router-view />
      </div>

      <!-- 오른쪽 사이드 -->
      <div class="col">
        <router-link to="/happyhouse/login">login</router-link>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      this.showNavbar = currentScrollPosition < 400;
      console.log(currentScrollPosition);
      console.log(this.showNavbar);
      this.lastScrollPosition = currentScrollPosition;
    },
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

.fixed-nav-bar {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  min-height: 60px;
  box-sizing: border-box;
  background-color: #dfdfdf;
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.5);
  z-index: 100;
  backface-visibility: hidden;
  transition: 0.35s ease-out;
}
.navbar-hidden {
  position: fixed;
  padding: 0 25px;
  top: 0;
  width: 18%;
  text-align: center;
  z-index: 100;
  min-height: 50px;
  background-color: #fdfdfd;
  box-shadow: 0 0 30px 3px rgba(0, 0, 0, 0.6);
  transition: 0.35s ease-in;
}

#main_banner {
  position: relative;
  width: 100%;
  max-height: 400px;
  overflow: hidden;
}

.col {
  background: grey;
}
.col-8 {
  padding: 0;
}
</style>
