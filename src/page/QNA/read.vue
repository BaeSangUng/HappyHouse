<template>
  <div>
    <table class="table">
      <tr>
        <th>번호</th>
        <td>{{ board.bno }}</td>
        <th>작성자</th>
        <td>{{ board.bwriter }}</td>
      </tr>
      <tr>
        <th>제목</th>
        <td>{{ board.btitle }}</td>
        <th>작성시간</th>
        <td>{{ board.regdate }}</td>
      </tr>
      <tr>
        <th colspan="4">내용</th>
      </tr>
      <tr>
        <td colspan="4">{{ board.bcontent }}</td>
      </tr>
    </table>

    <button v-on:click="deleteQNA" class="btn btn-danger">삭제</button>
    <button @click="update" class="btn btn-info">수정></button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      board: {
        bno: 0,
        btitle: '',
        bwriter: '',
        bcontent: '',
        regdate: '',
      },
    };
  },
  created() {
    axios
      .get(
        'http://localhost:8000/happyhouse/qna/detail/' + this.$route.params.bno
      )
      .then((response) => {
        console.log(response.data);
        this.board = response.data;
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
  methods: {
    deleteQNA() {
      axios
        .delete('http://localhost:8000/happyhouse/qna/delete/' + this.board.bno)
        .then((response) => {
          console.log(response);
          // window.location.href = 'happyhouse/qna';
          this.$router.push('/happyhouse/HelpDesk/QNA/list');
        })
        .catch((ex) => {
          console.log(ex);
        });
    },
    update() {
      this.$router.push({
        path: '/happyhouse/HelpDesk/QNA/update/' + this.board.bno,
      });
    },
  },
};
</script>

<style></style>
