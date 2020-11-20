<template>
  <div>
    <b-nav vertical>
      <b-nav-item id="sidebar" href="/happyhouse/HelpDesk/QNA/list">QNA</b-nav-item>
      <b-nav-item id="sidebar" href="/happyhouse/HelpDesk/Notice">Notice</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {};
</script>
  
<style>
#sidebar {
  margin-top : 10px;
  border-right : 1px solid grey;
}
#sidebar a{
  color: black;
  text-decoration: none;
}
#sidebar a:hover{
  color: teal;
  text-decoration: none;
}
</style>
