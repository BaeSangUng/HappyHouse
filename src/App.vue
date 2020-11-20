<template>
  <div id="app" class="container-fluid">
    <div class="navbar">
      <img id="logo" src="@/assets/logo.jpg">
      <b-nav tabs>
          <b-nav-item :active="tab==1" @click="changetab(1)" href="/">
            Home
          </b-nav-item>
          <b-nav-item :active="tab==2" @click="changetab(2)" href="/happyhouse/HelpDesk">
           HelpDesk
          </b-nav-item>
          <b-nav-item :active="tab==3" @click="changetab(3)" href="/happyhouse/login">
          login
          </b-nav-item>
      </b-nav>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab : '',
    }
  },
  
  methods: {
    changtab(num){
      this.tab= num;
      
    }
  },
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
