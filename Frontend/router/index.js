import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import QNA from "@/views/QNA.vue";
import WriteQNA from "@/components/WriteQNA.vue";
import Detail from "@/components/Detail.vue";
import UpdateQNA from "@/components/UpdateQNA.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/happyhouse/qna",
    name: "QNA",
    component: QNA
  },
  {
    path: "/happyhouse/write-qna",
    name: "WriteQNA",
    component: WriteQNA
  },
  {
    path: "/happyhouse/detail/:bno",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/happyhouse/update/:bno",
    name: "UpdateQNA",
    component: UpdateQNA
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
