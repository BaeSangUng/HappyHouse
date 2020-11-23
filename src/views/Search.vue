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
        <div>
          <gmap-map :center="center" :zoom="12" style="width=100%;  height:600px;" >
           <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" @click="markerClicked(m)" ></gmap-marker>
          </gmap-map>
        </div>
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
      position:[],

      center: { lat: 37.5665734, lng: 126.978179 },
      zoom: "18",
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  mounted() {
    this.geolocate();
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
      } 
      else {
        for (var i = 0; i < this.aptsSize; i++) {
          if (this.apts[i].아파트.search(this.apt) != -1)
            this.showaptsList.push(this.apts[i]);
        }
      }


      this.position = [];
      for(var j = 0; j < this.showaptsList.length; j++){
        var val1 = this.showaptsList[j].도로명;
        var val2 = this.showaptsList[j].도로명건물본번호코드;
        val2 = val2.replace(/(^0+)/, "");

        axios
        .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + val1 + "+" + val2 + "&key=AIzaSyCmBgay0wb9KagZHoyRCc5lbQ_PPdywdfE")
        .then((response)=>{
          var temp = {lat : response.data.results[0].geometry.location.lat, lng : response.data.results[0].geometry.location.lng};
          this.position.push(temp);
        })
        .catch((ex)=>{
          console.log("error : " + ex);
        });
      }

      //포지션들을 모두 맵에 표현
      for(var l = 0; this.position.length; l++){
        console.log(this.position[l]);
        this.addMarker(this.position[l]);
      }

    },
    selectApt: function(apt) {
      this.selectedApt = apt;
    },

    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker(position) {
      if (position) {
        this.markers.push(position);
        this.places.push(this.currentPlace);
        this.center = position;
        this.currentPlace = null;
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.markers.push({
          position: { 
            lat: position.coords.latitude,
            lng: position.coords.longitude
         },
        });
      });
      
    },
    markerClicked(m){
      this.center=m.position;
      console.log(m.position);
    }
  },
};
</script>

<style>
.emptyspace {
  height: 100px;
}
</style>
