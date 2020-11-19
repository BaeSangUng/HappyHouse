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
        <td colspan="2"><input type="text" v-model="board.btitle" /></td>
      </tr>
      <tr>
        <td colspan="2">내용</td>
      </tr>
      <tr>
        <td>
          <textarea rows="10" cols="60" v-model="board.bcontent"></textarea>
        </td>
      </tr>
    </table>

    <button @click="send">수정</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      board: {
        bno: '',
        btitle: '',
        bwriter: 'ssafy',
        bcontent: '',
        regdate: '',
      },
      bno: '',
    };
  },
  beforeCreate() {
    this.bno = this.$route.params.bno;
    axios
      .get('http://localhost:8000/happyhouse/qna/detail/' + this.bno)
      .then((response) => {
        console.log(response.data);
        this.board = response.data;
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
  methods: {
    send() {
      axios
        .put('http://localhost:8000/happyhouse/qna/update', this.board)
        .then((response) => {
          console.log(this.board);
          alert(response.data + '수정 성공');
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
