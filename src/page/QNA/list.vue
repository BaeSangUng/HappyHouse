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

    <div v-show="getAccessToken">
      <router-link to="create" class="btn btn-primary">글쓰기</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      fields: ['번호', '제목', '작성자', '날짜'],
      items: [],
    };
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserPw', 'getUserName']),
  },
  created() {
    if (
      sessionStorage.getItem('accessToken') != null &&
      sessionStorage.getItem('accessToken') != ''
    ) {
      this.$store.state.accessToken = sessionStorage.getItem('accessToken');
      this.$store.state.userId = sessionStorage.getItem('userId');
      this.$store.state.userPw = sessionStorage.getItem('userPw');
      this.$store.state.userName = sessionStorage.getItem('userName');
    }
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
