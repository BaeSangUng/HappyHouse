<template>
  <div v-if="apt">
    <h3>{{ apt.아파트 }}</h3>
    <img src="@/assets/건물.jpg" width="300px;" alt="행복 아파트" />
    <div style="margin: 10px"></div>
    <ul class="detailul">
      <li class="detailli">
        <div class="row">
          <div class="col detailname">
            일련번호
          </div>
          <div class="col-7 detailresult">
            {{ apt.일련번호 }}
          </div>
        </div>
      </li>
      <li class="detailli">
        <div class="row">
          <div class="col detailname">
            아파트 이름
          </div>
          <div class="col-7 detailresult">
            {{ apt.아파트 }}
          </div>
        </div>
      </li>
      <li class="detailli">
        <div class="row">
          <div class="col detailname">법정동</div>
          <div class="col-7 detailresult">{{ apt.법정동 }}</div>
        </div>
      </li>
      <li class="detailli">
        <div class="row">
          <div class="col detailname">층수</div>
          <div class="col-7 detailresult">{{ apt.층 }}층</div>
        </div>
      </li>
      <li class="detailli">
        <div class="row">
          <div class="col detailname">
            거래금액
          </div>
          <div class="col-7 detailresult">
            {{ (apt.거래금액.replace(',', '') * 10000) | price }}원
          </div>
        </div>
      </li>
    </ul>

    <b-button @click="jjim">{{ heart }}</b-button>
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
  data() {
    return {
      heart: '♡',
    };
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
      userid: this.$store.state.userId,
      hno: this.apt.일련번호,
    };
    console.log(temp);
    axios
      .post('http://localhost:8000/happyhouse/jjim/isJjim', temp)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          this.heart = '♥';
        } else {
          this.heart = '♡';
        }
      })
      .catch((ex) => {
        console.log(temp);
        console.log(ex);
      });
  },
  methods: {
    jjim() {
      if (
        sessionStorage.getItem('accessToken') == null &&
        sessionStorage.getItem('accessToken') == ''
      ) {
        this.$router.push('/happyhouse/loginModal');
      }
      var temp = {
        userid: this.$store.state.userId,
        hno: this.apt.일련번호,
      };
      var hinfo = {
        hno: this.apt.일련번호,
        hname: this.apt.아파트,
        hdong: this.apt.법정동,
        hwidth: this.apt.전용면적,
        hprice: parseInt(this.apt.거래금액.replace(',', '')),
      };
      if (this.heart == '♥') {
        axios
          .post('http://localhost:8000/happyhouse/jjim/delJjim', temp)
          .then(() => {
            this.heart = '♡';
          })
          .catch(() => {
            alert('delete error');
          });
      } else {
        axios
          .post('http://localhost:8000/happyhouse/jjim/insertJjim', {
            jjim: temp,
            hinfo: hinfo,
          })
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

<style>
ul {
  list-style: none;
}
.detailname {
  font-weight: bold;
}
.detailresult {
  font-size: 22px;
  text-align: left;
}
</style>
