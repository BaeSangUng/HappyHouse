<template>
  <div class="home">
    <div class="banner">
      <div class="emptyspace"></div>
      <div id="banner">
        <h2 id="bannerContent">당신이 원하는 집을 검색</h2>
        <p>ex) 서울특별시 / 중구 / 사직동 / etc..</p>

        <b-form-input
          id="searchinput"
          v-model="dongname"
          @keyup.enter="Search"
        ></b-form-input>
        <b-button id="searchbtn" variant="success" @click="Search"
          >Search</b-button
        >
      </div>
      <div id="searchresult" v-if="showresult">
        <div class="col">
          검색결과<span id="result">{{ dongcnt }}</span>
        </div>
        <div class="col">
          <b-button href="happyhouse/search" id="searchdetail"
            >상세검색 ></b-button
          >
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-7 ingichart">
        <ingichart />
      </div>
      <div class="col miniNotice">
        <miniNotice />
      </div>

      <!-- </div> -->

      <!-- 오른쪽 사이드 -->
      <!-- <div class="col"></div> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ingichart from '@/components/ingichart.vue';
import miniNotice from '@/components/miniNotice.vue';

export default {
  components: {
    ingichart,
    miniNotice,
  },

  data() {
    return {
      dongname: '',
      guguncode: '',
      apts: [],
      dongresult: [],
      dongs: [],
      dongcnt: 0,
      showresult: false,
      result: '',
    };
  },

  methods: {
    Search() {
      this.dongcnt = 0;
      console.log(this.dongname);
      //  우선 동이름으로 받아서 검색

      axios
        .post('http://localhost:8000/happyhouse/map/searchDong', this.dongname)
        .then((response) => {
          this.dongresult = response.data;
          console.log(this.dongresult);
        })
        .catch(() => {
          alert('sido error');
        });

      setTimeout(() => {
        // 위에서 나온 결과들(동이름 검색된 것)을 각각의 구군 코드로 돌림
        for (var i = 0; i < this.dongresult.length; i++) {
          this.guguncode = this.dongresult[i].dong_code.substring(0, 5);
          const API_KEY =
            '1MZ0TOc4Xr6XKhh%2BHxJrZHki%2FNIfZVcYNEolqWsmM3aByjhJbdjgHhmWeJUavM8wEjAZyMSoq3lZI9xYtHq3CQ%3D%3D';
          const API_URL =
            'http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=' +
            this.guguncode +
            '&DEAL_YMD=202010&serviceKey=' +
            API_KEY;
          // 구군코드로 돌리고 나온 아파트들을 위에서 받은 동이름으로 거름
          axios
            .get(API_URL)
            .then((response) => {
              this.apts = response.data.response.body.items.item;
            })
            .catch((error) => {
              console.log(error);
            });
          // 결과를 나타내는 div 보여줌
        }
        this.showresult = true;
      }, 200);

      setTimeout(() => {
        for (var k = 0; k < this.dongresult.length; k++) {
          for (var j = 0; j < this.apts.length; j++) {
            // 걸러져서 해당 동이 있으면 동카운트 올려줌

            if (
              this.apts[j].법정동.indexOf(this.dongresult[k].dong_name) != -1
            ) {
              this.dongcnt++;
              console.log(this.dongcnt);
            }
          }
        }
      }, 1000);
    },
  },
};
</script>

<style>
#bannerContent {
  color: cornsilk;
}
.banner {
  position: relative;
  z-index: 1;
  background-image: url('../assets/main직접.jpg');
}
#searchresult {
  border: 1px solid black;
  display: inline-block;
  position: absolute;
  border-radius: 10px;
  left: 27%;
  top: 75%;
  width: 40%;
  height: 100px;
  background-color: white;
}
#searchresult span {
  width: 60%;
}
#searchdetail {
  height: 100%;
  width: 100%;
}
#result {
  font-size: 30px;
}
</style>
