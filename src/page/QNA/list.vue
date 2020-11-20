<template>
  <div>
    <table class="table table-striped">

      <tr>
        <td>번호</td>
        <td>제목</td>
        <td>작성자</td>
        <td>날짜</td>
      </tr>
      <tr v-for="item in items" v-bind:key="item.no">
        <td>{{ item.bno }}</td>
        <td>
          <router-link :to="'/happyhouse/HelpDesk/QNA/read/' + item.bno">{{
            item.btitle
          }}</router-link>
        </td>
        <td>{{ item.bwriter }}</td>
        <td>{{ item.regdate }}</td>
      </tr>
    </table>
    <router-link to="create" class="btn btn-primary">글쓰기</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      fields:['번호', '제목', '작성자', '날짜'],
      items: [],
    };
  },
  created() {
    axios
      .get('http://localhost:8000/happyhouse/qna/read')
      .then((response) => {
        { 

          this.items = response.data;
          console.log(this.items);
        }
      })
      .catch((ex) => {
        alert(ex);
      });
  },
  methods: {
    detail(bno) {
      this.$router.push('/happyhouse/HelpDesk/QNA/read/' + bno);
    },
  },
};
</script>

<style></style>
