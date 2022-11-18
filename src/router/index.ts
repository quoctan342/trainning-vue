import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AppVue from "@/App.vue";

Vue.use(VueRouter);
const DEFAULT_TITLE = "Some Default Title";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "books" */ "@/modules/article/views/layout.vue"
      ),
    children: [
      {
        path: "",
        name: "Articles",
        meta: {
          title: "Articles Page",
        },
        component: () =>
          import(
            /* webpackChunkName: "books" */ "@/modules/article/views/index.vue"
          ),
      },
      {
        path: "create",
        name: "CreateArticle",
        meta: {
          title: "Create Article Page",
        },
        component: () =>
          import(
            /* webpackChunkName: "books" */ "@/modules/article/views/create.vue"
          ),
      },
    ],
  },
  {
    path: "/book",
    name: "Book",
    meta: {
      title: "Books Page",
    },
    component: () => import("@/modules/book/views/index.vue"),
  },
  {
    path: "/joke",
    name: "Joke",
    meta: {
      title: "Joke Page",
    },
    component: () => import("@/modules/joke/views/index.vue"),
  },
  {
    path: "/bookwithvuex",
    name: "Book With Vuex",
    meta: {
      title: "Book Page",
    },
    component: () => import("@/modules/bookWithVuex/views/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to?.meta?.title || DEFAULT_TITLE;
  });
});

export default router;
