<template>
  <div>
      <table>
          <tr>
              <td>ID : </td>
              <td><input type="text" v-model="userid"></td>
          </tr>
          <tr>
              <td>PW : </td>
              <td><input type="password" v-model="userpw"></td>
          </tr>
          <tr>
              <button @click="login">로그인</button>
              <button @click="cancel">취소</button>
          </tr>
      </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            userid : '',
            userpw : '',
        }
    },
    methods : {
        login(){

            axios
            .get("http://localhost:8000/happyhouse/member/select/" + this.userid)
            .then((response) => {
                console.log(response.data);
                if(response.data == this.userpw && response.data != '' && response.data != null) {
                    alert('성공');
                }
                else {
                    alert('실패');
                }
            })
            .catch((except) => {
                alert(except);
            });
        },
        cancel(){
            this.$router.push("/happyhouse/login");
        }
    }
}
</script>

<style>

</style>