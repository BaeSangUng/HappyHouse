<template>
    <div class="modal-content" style="font-size:20px;">
      <div class="modal-header">
        <h3 class="modal-title" style="font:bold;">Join Member</h3>
      </div>
      <div class="modal-body">
        ID 
        <br>
        <input type="text" v-model="member.userid" />
        <br><br>
        PW
        <br>
        <input type="password" v-model="member.userpw" />
        <br><br>
        PW(Confirm) :
        <br>
        <input type="password" v-model="pw_c" />
        <br><br>
        Name :
        <br>
        <input type="text" v-model="member.username" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="join">가입</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancel">취소</button>
      </div>
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
