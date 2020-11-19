<template>
  <div>
    <table>
      <tr>
        <td>번호</td>
        <td>제목</td>
        <td>작성자</td>
        <td>날짜</td>
      </tr>
      <tr v-for="item in items" v-bind:key="item.no">
        <td>{{ item.bno }}</td>
        <td>
          <router-link :to="'/happyhouse/QNA/qna/read' + item.bno">{{
            item.btitle
          }}</router-link>
        </td>
        <td>{{ item.bwriter }}</td>
        <td>{{ item.regdate }}</td>
      </tr>
    </table>

    <router-link to="write-qna">글쓰기</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      boards: [],
    };
  },
  created() {
    axios
      .get('http://localhost:8000/happyhouse/rest/read')
      .then((response) => {
        {
          this.boards = response.data;
        }
      })
      .catch((ex) => {
        alert(ex);
      });
  },
  methods: {
    detail(bno) {
      this.$router.push('/happyhouse/QNA/qna/read/' + bno);
    },
  },
};
</script>

<style></style>
