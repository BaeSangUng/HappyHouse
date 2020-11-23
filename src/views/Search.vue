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
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/Search/searchBar.vue';
// import AptList from '@/components/AptList.vue';
// import AptDetail from '@/components/AptDetail.vue';

export default {
  name: 'Apt',
  components: {
    SearchBar,
  },
  data() {
    return {
      dongCode: '',
      selectedApt: '',
      apts: [],
      showaptsList: [],
      apt: '',
    };
  },
  methods: {
    sendDongCode: function(dongCode) {
      console.log('>>>>>' + dongCode);
      this.dongCode = dongCode;
      const API_KEY =
        '1MZ0TOc4Xr6XKhh%2BHxJrZHki%2FNIfZVcYNEolqWsmM3aByjhJbdjgHhmWeJUavM8wEjAZyMSoq3lZI9xYtHq3CQ%3D%3D';
      const API_URL =
        'http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=' +
        dongCode +
        '&DEAL_YMD=202010&serviceKey=' +
        API_KEY;

      axios
        .get(API_URL)
        .then((response) => {
          console.log(response); //apt list
          this.apts = response.data.response.body.items.item;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchByAptName: function() {
      for (var i = 0; i < this.apts.length; i++) {
        this.showaptsList.push(this.apts[i].includes(this.apt));
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
