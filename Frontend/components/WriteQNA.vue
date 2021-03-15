<template>
  <div>
    작성자 : <input type="text" v-model="BoardQNA.bwriter" /><br />
    제목 : <input type="text" v-model="BoardQNA.btitle" /><br />
    내용 : <input type="text" v-model="BoardQNA.bcontent" /><br />
    날짜 : <input type="date" v-model="BoardQNA.regdate" /><br />
    <button @click="send">작성</button>
  </div>
</template>

<script>
import axios from 'axios';
console.log('hihi');

export default {
  data() {
    return {
      BoardQNA: {
        bwriter: '',
        btitle: '',
        bcontent: '',
        regdate: '',
      },
    };
  },
  methods: {
    send() {
      axios
        .post('http://localhost:8000/happyhouse/rest/create', this.BoardQNA)
        .then((response) => {
          alert(response);
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
