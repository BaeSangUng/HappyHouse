<template>
  <div>
    <table>
      <tr class="form-tr">
        <td class="input-group-text listname">작성자</td>
        <td class="inputname">
          <input
            type="text"
            v-model="BoardQNA.bwriter"
            id="nameform"
            disabled
          />
        </td>
      </tr>
      <tr class="form-tr">
        <td class="input-group-text listname">제목</td>
        <td>
          <input
            type="text"
            class="form-control inputname"
            v-model="BoardQNA.btitle"
          />
        </td>
      </tr>
      <tr class="form-tr">
        <td colspan="2" class="input-group-text listname">내용</td>
      </tr>
      <tr class="form-tr">
        <td colspan="2">
          <textarea
            rows="10"
            cols="60"
            class="form-control"
            v-model="BoardQNA.bcontent"
          ></textarea>
        </td>
      </tr>
      <tr class="form-tr">
        <td colspan="2"><input type="hidden" v-model="BoardQNA.regdate" /></td>
      </tr>
    </table>

    <button @click="send">작성</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
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
      this.BoardQNA.bwriter = this.$store.state.userId;
    }
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

<style>
.form-tr {
  margin-bottom: 10px;
}
.inputname {
  width: 100%;
}
#nameform {
  width: 100%;
}
</style>
