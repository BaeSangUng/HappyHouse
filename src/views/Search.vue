<template>
  <div>
    <div class="emptyspace" style="text-align:left;">
      <h1 style="padding-left:20%;">매물 상세 검색</h1>
    </div>
    <div class="row">
      <SearchBar @send-dong-code="sendDongCode" />
      <div style="padding:5px; margin:10px;">
        가격 :
        <input
          type="range"
          id="pricerange"
          min="0"
          max="3000000"
          step="10"
          v-model="limit_price"
          style="margin-right:5px; width:200px;"
        />
        <input
          type="text"
          v-model="limit_price"
          style="margin:5px;"
        />이하<br />
        면적 :
        <input
          type="range"
          id="widthrange"
          min="0"
          max="200"
          step="10"
          v-model="limit_width"
          style="margin-right:5px; width:200px;"
        />

        <input
          type="text"
          v-model="limit_width"
          style="margin:5px;"
        />이하<br />
      </div>

      <input
        type="text"
        v-if="sendDongCode != null || sendDongcode != ''"
        v-on:keyup.enter="searchByAptName"
        v-model="apt"
        style="height:45px; width:20%; margin-top:30px;"
      />
      <button
        @click="searchByAptName"
        style="height:45px; width:5%; margin-top:30px; margin-left:5px;"
      >
        Search
      </button>
    </div>
    <div class="row">
      <div class="col">
        <b-card
          v-for="(item, index) in showaptsList"
          :key="index"
          :title="item.hname"
          tag="article"
          style="width:300px; height:400px;display:inline-block; padding:0px;"
          class="mb-2"
          @click="selectApt(item)"
        >
          <b-card-text style="padding:0px; margin:0px;">
            <ul class="cardul">
              <li class="litop"></li>

              <li><img src="@/assets/건물.jpg" alt="건물사진" /></li>
              <li>
                <div class="row">
                  <div class="col">건축년도</div>
                  <div class="col-7">
                    {{ item.건축년도 }}
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col">거래금액</div>
                  <div class="col-7">
                    {{ item.거래금액 }}
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col">법정동</div>
                  <div class="col-7">
                    {{ item.법정동 }}
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col">전용면적</div>
                  <div class="col-7">
                    {{ item.전용면적 }}
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col">아파트명</div>
                  <div class="col-7">
                    {{ item.아파트 }}
                  </div>
                </div>
              </li>
            </ul>
          </b-card-text>
        </b-card>
        <div v-if="showaptsList.length < 1" style="margin-top:25%;">
          <h1>검색 결과 없음</h1>
        </div>
      </div>
      <div class="col">
        <div v-if="flag">
          <apt-detail :apt="selectedApt" />
        </div>
        <div>
          <gmap-map
            :center="center"
            :zoom="16"
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

      flag: false,
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
          console.log(this.apt);
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
      if (this.$store.state.userId == '' || this.$store.state.userId == null) {
        alert('로그인 필수 기능입니다.');
        this.$router.push('/happyhouse/loginModal');
      }
      this.$store.state.acc;
      if (this.flag) {
        this.flag = false;
        this.selectedApt;
      } else {
        this.flag = true;
      }
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
        var tmp1 = String(position.coords.latitude).substring(0, 10);
        var tmp2 = String(position.coords.longitude).substring(0, 10);
        this.center = {
          lat: parseFloat(tmp1),
          lng: parseFloat(tmp2),
        };
        this.markers.push({
          position: {
            lat: this.center.lat,
            lng: this.center.lng,
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
.litop {
  height: 20px;
}
</style>
