<template>
  <div>
    <div class="emptyspace"></div>
    <div class="row">
      <SearchBar @send-dong-code="sendDongCode" />
      <input
        type="text"
        v-if="sendDongCode != null"
        v-model="apt"
        v-on:keyup.enter="searchByAptName"
      />
      <button @click="searchByAptName">검색</button>
    </div>
    <div class="row">
      <div class="col">
        <ul
          v-for="(item, index) in showaptsList"
          :key="index"
          @select-apt="selectApt"
        >
          <li><img src="@/assets/건물.jpg" alt="건물사진" /></li>
          <li>
            {{ item.건축년도 }}
          </li>
          <li>
            {{ item.거래금액 }}
          </li>
          <li>
            {{ item.법정동 }}
          </li>
          <li>
            {{ item.전용면적 }}
          </li>
          <li>
            {{ item.아파트 }}
          </li>
        </ul>
      </div>
      <div class="col">
        맵/ 상세정보부분
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/Search/searchBar.vue';
// import AptDetail from '@/components/AptDetail.vue';

export default {
  name: 'Apt',
  components: {
    SearchBar,
  },
  data() {
    return {
      dongCode: '',
      gugunCode: '',
      selectedApt: '',
      apts: [],
      aptsSize: '',
      showaptsList: [],
      apt: '',
    };
  },
  methods: {
    sendDongCode: function(dongCode) {
      this.gugunCode = dongCode.substring(0, 5);

      const API_KEY =
        '1MZ0TOc4Xr6XKhh%2BHxJrZHki%2FNIfZVcYNEolqWsmM3aByjhJbdjgHhmWeJUavM8wEjAZyMSoq3lZI9xYtHq3CQ%3D%3D';
      const API_URL =
        'http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=' +
        this.gugunCode +
        '&DEAL_YMD=202010&serviceKey=' +
        API_KEY;

      axios
        .get(API_URL)
        .then((response) => {
          this.apts = response.data.response.body.items.item;
          console.log(this.apts); //apt list
          this.aptsSize = response.data.response.body.numOfRows;
          console.log(this.aptsSize);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchByAptName: function() {
      // console.log(this.apts);
      this.showaptsList = [];
      if (this.apt == '') {
        this.showaptsList = this.apts;

        console.log('아파트검색없음');
        console.log(this.showaptsList);
      } else {
        console.log('검색한거 있다');
        for (var i = 0; i < this.aptsSize; i++) {
          if (this.apts[i].아파트.search(this.apt) != -1)
            this.showaptsList.push(this.apts[i]);
        }
        console.log(this.showaptsList);
      }
    },
    selectApt: function(apt) {
      this.selectedApt = apt;
    },
  },
};
</script>

<style>
.emptyspace {
  height: 100px;
}
</style>
