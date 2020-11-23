<template>
  <div id="main-content">
    <h1>집찾기 화면입니다.</h1>
    <section id="section-input">
      <div>

        시, 도 :
        <select v-model="sidoCode" @change="getGugunList()" class="form-control option-control" >
          <option value="0" selected disabled>선택해주세요.</option>
          <option  v-for="(sido, index) in sidoList" :value="sido.sidoCode" :key="index" >
            {{ sido.sidoName }}
          </option>
        </select>

        구, 군 :
        <select v-model="gugunCode" @change="getDongList()" class="form-control option-control" >
          <option value="0" selected disabled>선택해주세요.</option>
          <option v-for="(gugun, index) in gugunList" :value="gugun.gugunCode" :key="index" >
            {{ gugun.gugunName }}
          </option>
        </select>

        읍, 면, 동 :
        <select v-model="dongName" id="dong" class="form-control option-control" >
          <option value="0" selected disabled>선택해주세요.</option>
          <option v-for="(dong, index) in dongList" :value="dong.dong" :key="index" >
            {{ dong.dong }}
          </option>
        </select>

        <button @click="getHouseList" id="btnSubmit" class="btn btn-primary btn-lg" >
          검색
        </button>

        <button  @click="getHospitalList" id="btnHospital" class="btn btn-primary btn-lg" >
          안전병원
        </button>

        <button @click="getCoronaList" id="btnCorona" class="btn btn-primary btn-lg" >
          코로나진료소
        </button>

      </div>
    </section>

    <!-- <aside id="result-map"> -->
    <!-- <googlemap :maplist="resultBody" :key="mapComponentKey" /> -->

<GmapMap
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
    <!-- </aside> -->

    <div id="tableResult" class="table">
      <table class="tbList paginated">
        <!-- <thead>
                <tr id="columnName"></tr>
              </thead>
              <tbody id="searchResult"></tbody> -->
        <thead>
          <tr
            v-for="(head, index) in resultHead"
            :key="index"
            id="columnName"
          ></tr>
          <tr>
            <th>번호</th>
            <th>법정동</th>
            <th>아파트 이름</th>
            <th>매매 가격</th>
            <th>지번</th>
            <!-- <th>병원이름</th>
            <th>시/도</th>
            <th>군/구</th>
            <th>도</th>
            <th>외래/입원</th>
            <th>대표 번호</th> -->
          </tr>
        </thead>

        <tbody
          v-for="(body, index) in resultBody"
          :key="index"
          id="searchResult"
        >
          <td>{{ body.houseId }}</td>
          <td>{{ body.dong }}</td>
          <td>{{ body.aptName }}</td>
          <td>{{ body.dealAmount }}</td>
          <td>{{ body.jibun }}</td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { gmapApi } from 'vue2-google-maps';
// import googlemap from '@/components/House/Map.vue';

export default {
  // components: {
  //   googlemap,
  // },

  props: {
    mapConfig: Object,
    apiKey: String,
  },

  data() {
    // let colorArr = ['table-primary','table-success','table-danger'];
    return {
      resultHead: [],
      resultBody: [],
      sidoList: [],
      gugunList: [],
      dongList: [],
      sidoCode: '',
      gugunCode: '',
      dongCode: '',
      sidoName: '',
      gugunName: '',
      dongName: '',

      // map data
      mapComponentKey: 0,
      tmpLat: '',
      tmpLng: '',
      lat: '',
      lng: '',
      // multi: { lat: 37.5665734, lng: 126.978179 },
      // map: null,
      // google: null,
      // marker: null,
      markers: [],
      center: {
        lat: 37.5665734,
        lng: 126.978179,
        zoom: 12,
      },
    };
  },

  created() {
    console.log('create.....................................');
    // 페이지 시작과 동시에 sido 코드/이름 리스트 받기
    axios
      .get('http://localhost:7777/happyhouse/house/sido')
      .then((response) => {
        this.sidoList = response.data;
        this.resultList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({ lat: 1.38, lng: 103.8 });
    });
  },

  computed: {
    google: gmapApi,
  },

  methods: {
    getGugunList: function() {
      axios
        .get('http://localhost:7777/happyhouse/house/gugun', {
          params: { sidoCode: this.sidoCode },
        })
        .then((response) => {
          // console.log(response);
          // console.log(`${response.data[0]['gugunName']}`);
          this.gugunList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDongList: function() {
      axios
        .get('http://localhost:7777/happyhouse/house/dong', {
          params: { gugunCode: this.gugunCode },
        })
        .then((response) => {
          // console.log(response);
          this.dongList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHouseList: function() {
      axios
        .get('http://localhost:7777/happyhouse/house/apt', {
          params: { dongName: this.dongName },
        })
        .then((response) => {
          this.resultHead = [
            {
              0: '번호',
              1: '법정동',
              2: '아파트 이름',
              3: '매매 가격',
              4: '지번',
            },
          ];
          this.resultBody = response.data;
          this.geocode();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHospitalList: function() {
      axios
        .get('http://localhost:7777/happyhouse/house2/hospital', {
          params: { gugunName: this.gugunName, gugunCode: this.gugunCode },
        })
        .then((response) => {
          this.resultHead = [
            {
              0: '병원이름',
              1: '시/도',
              2: '군/구',
              3: '도',
              4: '외래/입원',
              5: '대표 번호',
            },
          ];
          this.resultBody = response.data;
          // geocode(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCoronaList: function() {
      axios
        .get('http://localhost:7777/happyhouse/house2/corona', {
          params: { gugunName: this.gugunName, gugunCode: this.gugunCode },
        })
        .then((response) => {
          this.resultHead = [
            {
              0: '검사가능여뷰',
              1: '진료소 이름',
              2: '시/도',
              3: '군/구',
              4: '도',
              5: '월-금 이용시간',
              6: '토요일 이용시간',
              7: '일요일 이용시간',
              8: '대표 번호',
            },
          ];
          this.resultBody = response.data;
          // this.geocode();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    geocode() {
      this.markers = [];

      this.resultBody.forEach((element) => {
        console.log(element);
        this.markers.push({
          position: { lat: Number(element.lat), lng: Number(element.lng) },
        });
      });
    },
    clickMarker(event) {
      // 마커 위치 주고 zoom
      this.center.lat = event.lat;
      this.center.lng = event.lng;
      this.center.zoom = 17;
    },
  },
};
</script>

<style></style>