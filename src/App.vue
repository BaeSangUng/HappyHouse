<template>
  <div id="app" class="container-fluid">
    <div class="navbar">
      <img id="logo" src="@/assets/logo.jpg">
      <b-nav tabs>
          <b-nav-item :active="tab===1" @click="tab=1, showbanner=true" class="navitem">
            <b-link to="/" class="navbutton">Home</b-link>
          </b-nav-item>
          <b-nav-item :active="tab===2" @click="tab=2, showbanner=false" class="navitem">
            <b-link to="/happyhouse/HelpDesk" class="navbutton">HelpDesk</b-link>
          </b-nav-item>
          <b-nav-item :active="tab===3" @click="tab=3, showbanner=false" class="navitem">
            <b-link to="/happyhouse/login" class="navbutton">login</b-link>
          </b-nav-item>
      </b-nav>
    </div>
    <div class="banner" v-show="showbanner">
      <div class="emptyspace"></div>
      <div id="banner">
        <h2>당신이 원하는 집을 검색</h2>
        <b-form-input id="searchinput"></b-form-input> <b-button id="searchbtn" variant="success">Success</b-button>
      </div>
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
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab : 1,
      showbanner : true,
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
.navbutton{
  width:100%;
  height:100%;
  padding:0;
}
#logo {
  width:80px;
  height: 80px;
}
.emptyspace{
  height:200px;
}
#banner{
  height:200px;
  position: relative;
  width:100%;
}
#searchinput{
  position :relative;
  width:40%;
  display:inline-block;
}
#searchbtn{
  position: relative;
  display : inline-block;
}
.col {
  background: grey;
}
.col-8 {
  padding: 0;
}
</style>
