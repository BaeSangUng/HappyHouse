<template>
  <div>
    <table>
      <tr>
        <td>ID :</td>
        <td><input type="text" v-model="user.userid" /></td>
      </tr>
      <tr>
        <td>PW :</td>
        <td><input type="password" v-model="user.userpw" /></td>
      </tr>
      <tr>
        <button @click="login">로그인</button>
        <button @click="$emit('close')">취소</button>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserPw', 'getUserName']),
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
      console.log(this.$store.state.userId);
      if (this.$store.getAccessToken != null) {
        alert('Login Success');
        this.$router.push('/happyhouse');
      } else {
        alert('Login Failed');
      }
    },
    cancel() {
      this.$emit('close');
      this.$router.push('/happyhouse');
    },
  },
};
</script>

<style></style>
