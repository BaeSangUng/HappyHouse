<template>
  <div>
    <table>
      <tr>
        <td>ID :</td>
        <td><input type="text" v-model="userid" /></td>
      </tr>
      <tr>
        <td>PW :</td>
        <td><input type="password" v-model="userpw" /></td>
      </tr>
      <tr>
        <button @click="login">로그인</button>
        <button @click="$emit('close')">취소</button>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        userid: '',
        userpw: '',
        username: '',
      },
      message: '',
    };
  },
  computed: {
    nextRoute() {
      return this.$route.params.nextRoute ? this.$route.params.nextRoute : '';
    },
  },
  methods: {
    login() {
      this.$store
        .dispatch('LOGIN', this.user)
        .then(() => this.$router.replace(`/${this.nextRoute}`))
        .catch(({ message }) => (this.msg = message));
    },
  },
};
</script>

<style></style>
