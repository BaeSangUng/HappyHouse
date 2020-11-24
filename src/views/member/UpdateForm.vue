<template>
    <div class="modal-content" style="font-size:20px;" id="joinform">
      <div class="modal-header">
        <h3 class="modal-title" style="font:bold;">Join Member</h3>
      </div>
      <div class="modal-body">
        ID 
        <br>
        <input type="text" disabled v-model="user.userid"/>
        <br><br>
        PW
        <br>
        <input type="text" v-model="user.userpw"/>
        <br><br>
        Name
        <br>
        <input type="text" v-model="user.username"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="update">수정</button>
        <button type="button" class="btn btn-danger" @click="del">삭제</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancel">취소</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user : {
        userid : this.$store.state.userId,
        userpw : this.$store.state.userPw,
        username : this.$store.state.userName
      }
    }
  },
  methods: {
    update() {
      axios
        .put('http://localhost:8000/happyhouse/member/update', this.user)
        .then((response) => {
          console.log(response.data);
          if (response.data >= 1) {
            this.$store.state.userPw = this.user.userpw;
            this.$store.state.userName = this.user.username;
            alert('회원정보 수정에 성공했습니다!');
            this.$emit('close');
            this.$router.push('/');
          } else {
            alert('회원정보 수정에 실패했습니다..');
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    },
    del() {
      axios
        .post('http://localhost:8000/happyhouse/member/delete', this.user.userid)
        .then((response) => {
          console.log(response.data);
          if (response.data >= 1) {
            
            alert('회원정보 삭제에 성공했습니다!');
            this.$emit('close');
            this.onClickLogout();
           
          } else {
            alert('회원정보 삭제에 실패했습니다..');
          }
        })
        .catch((ex) => {
          console.log(ex);
        });

    },
    cancel() {
      this.$emit('close');
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
