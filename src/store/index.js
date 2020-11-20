import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const SERVER_URL = "http://localhost:8000/happyhouse";

export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: "",
    userPw: "",
    userName: ""
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getUserId(state) {
      return state.userId;
    },
    getUserPw(state) {
      return state.userPw;
    },
    getUserName(state) {
      return state.userName;
    }
  },
  mutations: {
    LOGIN(state, payload) {
      state.accessToken = payload["auth-token"];
      state.userId = payload["user-id"];
      state.userPw = payload["user-pw"];
      state.userName = payload["user-name"];
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.userId = "";
      state.userPw = "";
      state.userName = "";
    }
  },
  actions: {
    LOGIN(context, user) {
      console.log(user);
      return axios
        .post(`${SERVER_URL}/member/select/`, user)
        .then((response) => {
          context.commit("LOGIN", response.data);
          axios.defaults.headers.common["auth-token"] = `${response.data["auth-token"]}`;
          console.log(response);
        });
    },
    LOGOUT(context) {
      context.commit("LOGOUT");
      axios.defaults.headers.common["auth-token"] = undefined;
    }
  },
  modules: {}
});
