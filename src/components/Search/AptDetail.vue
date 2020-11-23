<template>
  <div v-if="apt">
    <h3>{{ apt.아파트 }}</h3>
    <img src="@/assets/건물.jpg" alt="행복 아파트" />
    <div style="margin: 10px"></div>
    <ul align="left">
      <li>일련번호 : {{ apt.일련번호 }}</li>
      <li>아파트 이름 : {{ apt.아파트 }}</li>
      <li>법정동 : {{ apt.법정동 }}</li>
      <li>층수 : {{ apt.층 }}층</li>
      <li>
        거래금액 : {{ (apt.거래금액.replace(',', '') * 10000) | price }}원
      </li>
    </ul>

    <input type="text" v-model="heart" @click="jjim" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  name: 'AptDetail',
  props: {
    apt: [Object, String],
  },
  component: {
    heart: '♡',
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserPw', 'getUserName']),
  },
  filters: {
    price: function(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
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
    var temp = {
      num: this.apt.일련번호,
      userId: this.$store.state.userId,
    };
    axios.get('url', temp).then((response) => {
      if (response.data) {
        this.heart = '♥';
      } else {
        this.heart = '♡';
      }
    });
  },
  methods: {
    jjim() {
      if (
        sessionStorage.getItem('accessToken') != null &&
        sessionStorage.getItem('accessToken') != ''
      ) {
        this.$router.push('/happyhouse/loginModal');
      }
      var temp = {
        num: this.apt.일련번호,
        userId: this.$store.state.userId,
      };
      if (this.heart == '♥') {
        axios
          .delete('url', temp)
          .then(() => {
            this.heart = '♡';
          })
          .catch(() => {
            alert('delete error');
          });
      } else {
        axios
          .post('url', temp)
          .then(() => {
            this.heart = '♥';
          })
          .catch(() => {
            alert('post error');
          });
      }
    },
  },
};
</script>

<style></style>
