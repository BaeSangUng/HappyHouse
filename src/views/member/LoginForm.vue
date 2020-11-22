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
        <button @click="cancel">취소</button>
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
      flag: false,
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

      setTimeout(() => {
        this.check();
      }, 50);
    },
    check() {
      if (this.$store.state.accessToken != null) {
        alert('로그인에 성공했습니다!');
        this.$emit('close');
        this.$router.push('/');
      } else {
        alert('로그인에 실패했습니다..');
      }
    },
    cancel() {
      console.log(this.$store.state.accessToken);
      this.$emit('close');
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
