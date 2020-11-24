<template>
  <div>
    <table style="padding:5px; margin:10px;">
      <tr>
        <td colspan="3">지역선택</td>
      </tr>
      <tr>
        <td>
          <select
            v-model="sidocode"
            @change="onchange1()"
            class="browser-default custom-select"
          >
            <option selected disabled>시/도</option>
            <option
              v-for="(item, index) in sidos"
              :value="item.sido_code"
              :key="index"
              >{{ item.sido_name }}</option
            >
          </select>
        </td>
        <td>
          <select
            v-model="guguncode"
            @change="onchange2()"
            class="browser-default custom-select"
          >
            <option selected disabled>구/군</option>
            <option
              v-for="(item, index) in guguns"
              :value="item.gugun_code"
              :key="index"
              >{{ item.gugun_name }}</option
            >
          </select>
        </td>
        <td>
          <select
            v-model="dongcode"
            @change="onchange3()"
            class="browser-default custom-select"
          >
            <option selected disabled>동/읍</option>
            <option
              v-for="(item, index) in dongs"
              :value="item.dong_code"
              :key="index"
              >{{ item.dong_name }}</option
            >
          </select>
        </td>
      </tr>
    </table>
  </div>
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
      guguncode: '',
      dong: '',
      dongcode: '',
      aptname: '',
    };
  },
  methods: {
    onchange1() {
      console.log(this.sidocode);
      axios
        .post('http://localhost:8000/happyhouse/map/gugun', this.sidocode)
        .then((response) => {
          this.guguns = response.data;
        })
        .catch(() => {
          alert('gugun error');
        });
    },
    onchange2() {
      console.log(this.guguncode);
      axios
        .post('http://localhost:8000/happyhouse/map/dong', this.guguncode)
        .then((response) => {
          this.dongs = response.data;
          console.log(this.dongs);
        })
        .catch(() => {
          alert('dongs error');
        });
    },
    onchange3() {
      this.$emit('send-dong-code', this.dongcode);
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
