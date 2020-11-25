<template>
  <div>
    <div class="row">
      <div class="col"></div>
      <div class="col-8">
        <h1>찜 목록</h1>

        <b-card
          no-body
          class="overflow-hidden"
          style="max-width: 540px; display:inline-block; margin : 10px;"
          v-for="j in myJjim"
          :key="j.hname"
        >
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                src="https://cdn.pixabay.com/photo/2015/02/24/13/23/city-647400_1280.jpg"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="j.hname">
                <b-card-text>
                  <ul class="cardul">
                    <li>
                      <div class="row">
                        <div class="col">
                          <span class="cardbodylist">일련번호</span>
                        </div>
                        <div class="col">
                          {{ j.hno }}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col">
                          <span class="cardbodylist">법정동</span>
                        </div>
                        <div class="col">
                          {{ j.hdong }}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col">
                          <span class="cardbodylist">거래가격</span>
                        </div>
                        <div class="col">
                          {{ j.hprice }}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col">
                          <span class="cardbodylist">전용면적</span>
                        </div>
                        <div class="col">
                          {{ j.hprice }}
                        </div>
                      </div>
                    </li>
                    <li
                      @click="deleteJjim(j.hno)"
                      style="text-align : right; margin-right: 30px;"
                    >
                      x
                    </li>
                  </ul>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    console.log(this.$store.state.userId);
    axios
      .post(
        'http://localhost:8000/happyhouse/jjim/list',
        this.$store.state.userId
      )
      .then((response) => {
        console.log(response.data);
        this.myJjim = response.data;
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
  data() {
    return {
      myJjim: [],
    };
  },
  methods: {
    deleteJjim(shno) {
      var temp = {
        userid: this.$store.state.userId,
        hno: shno,
      };
      axios
        .post('http://localhost:8000/happyhouse/jjim/delJjim', temp)
        .then(() => {
          alert('찜에서 삭제되었습니다');
          this.$router.go();
        })
        .catch(() => {
          alert('delete error');
        });
    },
  },
};
</script>
<style></style>
