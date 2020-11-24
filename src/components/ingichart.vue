<template>
  <div>
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
        style="max-width: 20rem; max-height:5rem; display:inline-block; "
        class="mb-2"
      >
        <b-card-text>
          <ul class="cardul">
            <li>
              동
              {{ item.hdong }}
            </li>
            <li>
              가격
              {{ item.hprice }}
            </li>
            <li>
              면적
              {{ item.hwidth }}
            </li>
            <li>
              좋아요수
              {{ item.count }}
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
  font-size: 15px;
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
}
.cards {
  float: left;
}
.card {
  display: inline-block;
}
</style>
