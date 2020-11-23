<template>
  <div>
    <div class="emptyspace"></div>
    <div class="row">
      <SearchBar @send-dong-code="sendDongCode" />
      <div>
        가격 :
        <input
          type="range"
          id="pricerange"
          min="0"
          max="3000000"
          step="10"
          v-model="limit_price"
        />
        <input type="text" v-model="limit_price" /> 이하<br />
        면적 :
        <input
          type="range"
          id="widthrange"
          min="0"
          max="200"
          step="10"
          v-model="limit_width"
        />
        <input type="text" v-model="limit_width" /> 이하<br />
      </div>

      <input
        type="text"
        v-if="sendDongCode != null"
        v-on:keyup.enter="searchByAptName"
      />
      <button @click="searchByAptName">검색</button>
    </div>
    <div class="row">
      <div class="col">
        <ul
          v-for="(item, index) in showaptsList"
          :key="index"
          @click="selectApt(item)"
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
          <apt-detail :apt="selectedApt" />
        </div>
        <div>
          <gmap-map
            :center="center"
            :zoom="12"
            style="width=100%;  height:600px;"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              @click="markerClicked(m)"
            ></gmap-marker>
          </gmap-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/Search/searchBar.vue';
import AptDetail from '@/components/Search/AptDetail.vue';

export default {
  name: 'Apt',
  components: {
    SearchBar,
    AptDetail,
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
      position: [],

      limit_price: '3000000',
      limit_width: '200',

      center: { lat: 37.5665734, lng: 126.978179 },
      zoom: '18',
      markers: [],
      places: [],
      currentPlace: null,
    };
  },
  mounted() {
    this.geolocate();
  },
  computed: {
    changedMarkers: function() {
      return this.markers;
    },
  },
  methods: {
    sendDongCode: function(dongCode) {
      this.gugunCode = dongCode.substring(0, 5);
      this.dongCode = dongCode;

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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchByAptName: function() {
      // console.log(this.apts);
      this.showaptsList = [];
      console.log(this.apts);
      for (var i = 0; i < this.aptsSize; i++) {
        if (this.apts[i].아파트.search(this.apt) != -1) {
          if (this.apts[i].법정동읍면동코드 == this.dongCode.substring(5, 10)) {
            console.log(parseInt(this.apts[i].거래금액.replace(',', '')));
            if (
              parseInt(this.apts[i].거래금액.replace(',', '')) <=
                this.limit_price &&
              this.apts[i].전용면적 <= this.limit_width
            ) {
              console.log(this.apts[i]);
              this.showaptsList.push(this.apts[i]);
            }
          }
        }
      }

      this.position = [];
      for (var j = 0; j < this.showaptsList.length; j++) {
        var val1 = this.showaptsList[j].도로명;
        var val2 = this.showaptsList[j].도로명건물본번호코드;
        val2 = val2.replace(/(^0+)/, '');

        axios
          .get(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
              val1 +
              '+' +
              val2 +
              '&key=AIzaSyCmBgay0wb9KagZHoyRCc5lbQ_PPdywdfE'
          )
          .then((response) => {
            var temp = {
              lat: response.data.results[0].geometry.location.lat,
              lng: response.data.results[0].geometry.location.lng,
            };
            this.position.push(temp);
            this.addMarker(temp);
            console.log(response.data);
          })
          .catch((ex) => {
            console.log('error : ' + ex);
          });
      }

      console.log(this.markers);
    },
    selectApt: function(apt) {
      this.selectedApt = apt;
    },

    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker(position) {
      if (position) {
        this.markers.push({ position: position });
        this.places.push(this.currentPlace);
        this.center = position;
        this.currentPlace = null;
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longritude,
        };
        this.markers.push({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    },
    markerClicked(m) {
      this.center = m.position;
      console.log(m.position);
    },
  },
};
</script>

<style>
.emptyspace {
  height: 100px;
}
</style>
