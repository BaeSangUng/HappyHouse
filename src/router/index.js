import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import HelpDesk from "@/views/HelpDesk.vue";

import QNA from "@/page/QNA/QNA.vue";
import QNAList from "@/page/QNA/list.vue";
import QNACreate from "@/page/QNA/create.vue";
import QNARead from '@/page/QNA/read.vue';
import QNAUpdate from '@/page/QNA/update.vue';
import QNADelete from '@/page/QNA/delete.vue';

import Notice from "@/page/Notice/Notice.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/HelpDesk",
    name: "HelpDesk",
    component: HelpDesk,
    redirect: '/HelpDesk/QNA',
    children: [
      {
        path: 'QNA',
        name: 'QNA',
        component: QNA,
        redirect: '/HelpDesk/QNA/list',
        children: [
          {
            path: 'list',
            name: 'list',
            component : QNAList,
          },
          {
            path: 'create',
            name: 'create',
            component: QNACreate,
          },
          {
            path: 'read',
            name: 'read',
            component: QNARead,
          },
          {
            path: 'update',
            name: 'update',
            component: QNAUpdate,
          },
          {
            path: 'delete',
            name: 'delete',
            component: QNADelete,
          },
        ]

      },
      {
        path: 'Notice',
        name: 'Notice',
        component : Notice,
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
