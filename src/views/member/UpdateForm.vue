<template>
  <div>
    <table>
      <tr>
        <td colspan="2">
        <h3 class="modal-title" style="text-align:right; width:100%;">개인정보 수정</h3>
        </td>
      </tr>
      <tr>
        <td style="text-align:right; width:40%;">ID :</td>
        <td><input type="text" disabled v-model="user.userid"/></td>
      </tr>
      <tr>
        <td style="text-align:right;">PW :</td>
        <td><input type="text" v-model="user.userpw"/></td>
      </tr>
      <tr>
        <td style="text-align:right;">NAME :</td>
        <td><input type="text" v-model="user.username"/></td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr>
        <td colspan="2" style="text-align:center;">
          <button @click="update" class="btn btn-primary">수정</button>
          <button @click="del" class="btn btn-danger">삭제</button>
          <button @click="$emit('close')" class="btn btn-secondary">취소</button>
        </td>
      </tr>
    </table>
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
    onClickLogout() {
      this.$store.dispatch('LOGOUT').then(() => this.$router.replace('/').catch(() => {}));
    },
  },
};
</script>

<style></style>
