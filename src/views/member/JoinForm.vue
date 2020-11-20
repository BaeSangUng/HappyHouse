<template>
  <div>
    <table>
      <tr>
        <td>ID :</td>
        <td><input type="text" v-model="member.userid" /></td>
      </tr>
      <tr>
        <td>PW :</td>
        <td><input type="password" v-model="member.userpw" /></td>
      </tr>
      <tr>
        <td>PW(Confirm) :</td>
        <td><input type="password" v-model="pw_c" /></td>
      </tr>
      <tr>
        <td>Name :</td>
        <td><input type="text" v-model="member.username" /></td>
      </tr>
      <tr>
        <button @click="join">가입</button>
        <button @click="$emit('close')">취소</button>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      member: {
        userid: '',
        userpw: '',
        username: '',
      },
      pw_c: '',
    };
  },

  methods: {
    join() {
      if (this.member.userpw != this.pw_c) {
        alert('비밀번호를 다시 확인해주세요!');
      } else {
        axios
          .post('http://localhost:8000/happyhouse/member/join', this.member)
          .then((response) => {
            alert('가입 결과 : ' + response.data);
            this.$router.push('/happyhouse/login');
          })
          .catch((except) => {
            alert(except);
          });
      }
    },
  },
};
</script>

<style></style>
