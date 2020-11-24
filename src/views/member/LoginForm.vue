<template>
    <div class="modal-content" style="font-size:20px;">
      <div class="modal-header">
        <h3 class="modal-title" style="font:bold;">Log-in</h3>
      </div>
      <div class="modal-body">
        ID 
        <br>
        <input type="text" v-model="user.userid" />
        <br><br>
        PW
        <br>
        <input type="password" v-model="user.userpw" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="login">로그인</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancel">취소</button>
      </div>
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
      }, 150);
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
      this.$emit('close');
      this.$router.push('/');
    },
  },
};
</script>

<style>
 button {
   width:20%;
   height:10%;
 }
 input {
   width:80%;
   height:45px;
 }
</style>
