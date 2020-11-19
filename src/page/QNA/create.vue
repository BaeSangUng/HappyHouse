<template>
  <div>
    <table>
      <tr>
        <td>작성자</td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2">제목</td>
      </tr>
      <tr>
        <td colspan="2"><input type="text" v-model="BoardQNA.btitle" /></td>
      </tr>
      <tr>
        <td colspan="2">내용</td>
      </tr>
      <tr>
        <td>
          <textarea rows="10" cols="60" v-model="BoardQNA.bcontent"></textarea>
        </td>
      </tr>
      <tr>
        <td><input type="hidden" v-model="BoardQNA.regdate" /></td>
      </tr>
    </table>

    <button @click="send">작성</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      BoardQNA: {
        bwriter: 'ssafy',
        btitle: '',
        bcontent: '',
        regdate: '',
      },
    };
  },
  methods: {
    send() {
      console.log(this.BoardQNA.regdate);
      axios
        .post('http://localhost:8000/happyhouse/qna/create', this.BoardQNA)
        .then((response) => {
          alert(response);
          this.$router.push('/happyhouse/HelpDesk/QNA/list');
        })
        .catch((ex) => {
          console.log(ex);
        });
    },
  },
};
</script>

<style></style>
