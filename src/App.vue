<template>
  <div id="app" class="container-fluid">
    <div class="navbar">
      <img id="logo" src="@/assets/logo.jpg">
      <b-nav tabs>
          <b-nav-item :active="tab===1" @click="tab=1">
            <router-link to="/">Home</router-link></b-nav-item>
          <b-nav-item :active="tab===2" @click="tab=2">
            <router-link to="/happyhouse/HelpDesk">HelpDesk</router-link></b-nav-item>
          <b-nav-item :active="tab===3" @click="tab=3">
            <router-link to="/happyhouse/login">login</router-link></b-nav-item>
      </b-nav>
  </div>
    <div class="row">
      <!-- 왼쪽 사이드 -->
      <div class="col">
      </div>

      <!-- 중간 -->
      <div class="col-8">
        <router-view />
      </div>

      <!-- 오른쪽 사이드 -->
      <div class="col">
        
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab : 1,      
    }
  }
}
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
  width:100%;
  position: fixed;

}
#logo {
  width:80px;
  height: 80px;
}

.col {
  background: grey;
}
.col-8 {
  padding: 0;
}
</style>
