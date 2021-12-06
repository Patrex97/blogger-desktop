import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/index.vue";
import login from "@/views/login.vue";
import Posts from "@/views/posts/index.vue";
import Stats from "@/views/stats/index.vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import auth from "@/router/middleware/auth.ts";
import guest from "@/router/middleware/guest.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cookie from "js-cookie";
import store from "@/store";
import axios from "axios";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "posts",
        name: "Posts",
        component: Posts,
      },
      {
        path: "stats",
        name: "Stats",
        component: Stats,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: login,
    meta: {
      middleware: [guest],
    },
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (Cookie.get("jwt") && !store.getters.user) {
    store.dispatch("fetchUserData");
  }
  if (!to.meta.middleware) {
    return next();
  }
  const middleware: any = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    store,
  };

  return middleware[0]({
    ...context,
  });
});

export default router;
