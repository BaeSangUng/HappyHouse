<template>
  <div>
    <div class="emptyspace"></div>
    <span id="ingitext">인기차트</span>

    <div class="cards">
      <b-card
        v-for="(item, index) in popHouse"
        :key="index"
        v-if="index < 6"
        :title="item.hname"
        :img-src="
          'https://cdn.pixabay.com/photo/2015/02/24/13/23/city-647400_1280.jpg'
        "
        img-alt="건물"
        img-top
        tag="article"
        style="width:300px; height:400px;display:inline-block; padding:0px;"
        class="mb-2"
      >
        <b-card-text style="padding:0px; margin:0px;">
          <ul class="cardul">
            <li>
              <div class="row">
                <div class="col">
                  <span class="cardbodylist">동</span>
                </div>
                <div class="col">
                  {{ item.hdong }}
                </div>
              </div>
            </li>
            <li>
              <div class="row">
                <div class="col">
                  <span class="cardbodylist">가격</span>
                </div>
                <div class="col">
                  {{ item.hprice }}
                </div>
              </div>
            </li>
            <li>
              <div class="row">
                <div class="col">
                  <span class="cardbodylist">면적</span>
                </div>

                <div class="col">
                  {{ item.hwidth }}
                </div>
              </div>
            </li>
            <li>
              <div class="row">
                <div class="col">
                  <span class="cardbodylist">좋아요수</span>
                </div>

                <div class="col">
                  {{ item.count }}
                </div>
              </div>
            </li>
          </ul>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      popHouse: [],
    };
  },

  created() {
    axios
      .get('http://localhost:8000/happyhouse/jjim/rank')
      .then((response) => {
        this.popHouse = response.data;
        console.log(response.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
};
</script>

<style>
#ingitext {
  font-size: 30px;
  font-weight: bold;
}
.cardul {
  list-style: none;
}
.cardul li {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cardbodylist {
  width: 100px;
  text-align: center;
  font-size: 20px;
  color: darkslategray;
}
div .card-body {
  padding: 0px;
}
.card-body {
  padding: 0px;
  margin: 0;
}
</style>
