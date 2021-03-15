<template>
  <div>
    작성자 : <input type="text" v-model="board.bwriter" /><br />
    제목 : <input type="text" v-model="board.btitle" /><br />
    내용 : <input type="text" v-model="board.bcontent" /><br />
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
        bwriter: '',
        bcontent: '',
        regdate: '',
      },
      bno: '',
    };
  },
  beforeCreate() {
    this.bno = this.$route.params.bno;
    axios
      .get('http://localhost:8000/happyhouse/rest/detail/' + this.bno)
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
        .put('http://localhost:8000/happyhouse/rest/update', this.board)
        .then((response) => {
          console.log(this.board);
          alert(response.data + '수정 성공');
          this.$router.push('/happyhouse/qna');
        })
        .catch((ex) => {
          console.log(ex);
        });
    },
  },
};
</script>

<style></style>
