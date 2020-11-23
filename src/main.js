import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from 'vue-js-modal';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAfpdYGfTEMy-VD6cAFgPDN9UTKopY48rc",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VModal, { dynamic: true });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
