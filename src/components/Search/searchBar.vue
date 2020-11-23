<template>
  <b-row>
    <b-col align="left">
      <select class="browser-default custom-select">
        <option selected></option>
        <option value="1">One</option>
      </select>
      <b-form-select v-model="sido" :options="sidos"></b-form-select>
      <div class="mt-3">Selected: {{ sido.sido_name }}</div>
      <b-form-select v-model="gugun" :options="guguns"></b-form-select>
      <div class="mt-3">Selected: {{ gugun }}</div>
      <b-form-select v-model="dong" :options="dongs"></b-form-select>
      <div class="mt-3">Selected: {{ dong }}</div>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SearchBar',
  data() {
    return {
      sidos: [],
      guguns: [],
      dongs: [],
      aptInfos: [],
      sido: '',
      sidocode: '',
      gugun: '',
      dong: '',
      dongcode: '',
      aptname: '',
    };
  },
  watch: {
    sidocode: function() {
      console.log(this.sido);
      axios
        .post('http://localhost:8000/happyhouse/map/gugun', this.sidocode)
        .then((response) => {
          this.guguns = response.data;
        })
        .catch(() => {
          alert('gugun error');
        });
    },
    gugun: function() {
      axios
        .post('http://localhost:8000/happyhouse/map/dong')
        .then((response) => {
          this.dongs = response.data;
        })
        .catch(() => {
          alert('dongs error');
        });
    },
    dong: function() {
      axios
        .get('url')
        .then((response) => {
          this.dongcode = response.data;
          this.$emit('send-dong-code', this.dongCode);
        })
        .catch(() => {
          alert('dongcode error');
        });
    },
  },
  created() {
    axios
      .post('http://localhost:8000/happyhouse/map/sido')
      .then((response) => {
        this.sidos = response.data;
        console.log(this.sidos);
      })
      .catch(() => {
        alert('sido error');
      });
  },
};
</script>

<style></style>
