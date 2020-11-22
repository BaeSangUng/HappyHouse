<template>
  <div>
    <table>
      <tr>
        <td>ID :</td>
        <td><input type="text" disabled v-model="user.userid"/></td>
      </tr>
      <tr>
        <td>PW :</td>
        <td><input type="text" v-model="user.userpw"/></td>
      </tr>
      <tr>
        <td>NAME :</td>
        <td><input type="text" v-model="user.username"/></td>
      </tr>
      <tr>
        <td colspan="2">
          <button @click="update">수정</button>
          <button @click="del">삭제</button>
          <button @click="$emit('close')">취소</button>
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
        })
        .catch((ex) => {
          console.log(ex);
        });
    },
    del() {
      axios
        .delete('http://localhost:8000/happyhouse/member/delete', this.user.userid)
        .then((response) => {
          console.log(response.data);
        })
        .catch((ex) => {
          console.log(ex);
        });
    },
  },
};
</script>

<style></style>
