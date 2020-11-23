import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import HelpDesk from "@/views/HelpDesk.vue";

import Search from "@/views/Search.vue";

import QNA from "@/page/QNA/QNA.vue";
import QNAList from "@/page/QNA/list.vue";
import QNACreate from "@/page/QNA/create.vue";
import QNARead from "@/page/QNA/read.vue";
import QNAUpdate from "@/page/QNA/update.vue";
import QNADelete from "@/page/QNA/delete.vue";

import Notice from "@/page/Notice/Notice.vue";
import NoticeList from "@/page/Notice/list.vue";
import NoticeRead from "@/page/Notice/read.vue";

import Login from "../views/member/Login.vue";
import JoinForm from "../views/member/JoinForm.vue";
import LoginForm from "../views/member/LoginForm.vue";
import UpdateForm from "../views/member/UpdateForm.vue";
import LoginModal from "../views/member/LoginModal.vue";
import JoinModal from "../views/member/JoinModal.vue";
import UpdateModal from "../views/member/UpdateModal.vue";

import Map from "../views/map/Map.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/happyhouse/HelpDesk",
    name: "HelpDesk",
    component: HelpDesk,
    children: [
      {
        path: "/happyhouse/HelpDesk/QNA",
        name: "QNA",
        component: QNA,
        redirect: "/happyhouse/HelpDesk/QNA/list",
        children: [
          {
            path: "list",
            name: "list",
            component: QNAList
          },
          {
            path: "create",
            name: "create",
            component: QNACreate
          },
          {
            path: "read/:bno",
            name: "read",
            component: QNARead
          },
          {
            path: "update/:bno",
            name: "update",
            component: QNAUpdate
          },
          {
            path: "delete",
            name: "delete",
            component: QNADelete
          }
        ]
      },
      {
        path: "/happyhouse/HelpDesk/Notice",
        name: "Notice",
        component: Notice,
        redirect: "/happyhouse/HelpDesk/Notice/list",
        children: [
          {
            path: "list",
            name: "nlist",
            component: NoticeList
          },
          {
            path: "read",
            name: "nread",
            component: NoticeRead
          },
        ]
      }
    ]
  },
  {
    path: "/happyhouse/login",
    name: "Login",
    component: Login
  },
  {
    path: "/happyhouse/loginForm",
    name: "LoginForm",
    component: LoginForm
  },
  {
    path: "/happyhouse/joinForm",
    name: "JoinForm",
    component: JoinForm
  },
  {
    path: "/happyhouse/updateForm",
    name: "UpdateForm",
    component: UpdateForm
  },
  {
    path: "/happyhouse/loginModal",
    name: "LoginModal",
    component: LoginModal
  },
  {
    path: "/happyhouse/joinModal",
    name: "JoinModal",
    component: JoinModal
  },
  {
    path: "/happyhouse/updateModal",
    name: "UpdateModal",
    component: UpdateModal
  },
  {
    path: "/happyhouse/Search",
    name: "Search",
    component: Search
  },
  {
    path: "/happyhouse/map",
    name: "Map",
    component: Map
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
