import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/index.vue";
import login from "../views/login.vue";
import Posts from "../views/posts/index.vue";
import Stats from "../views/stats/index.vue";
import blogs from "../views/blogs.vue";
import register from "../views/register.vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import auth from "./middleware/auth.ts";
// @ts-ignore
import guest from "./middleware/guest.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cookie from "js-cookie";
import store from "../store";

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
  {
    path: "/register",
    name: "Register",
    component: register,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: blogs,
    meta: {
      middleware: [auth],
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
  if (store.getters["user/getToken"] && !store.getters["user/userData"]) {
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
