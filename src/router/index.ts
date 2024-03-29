import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/home.vue";
import login from "@/views/login.vue";
import BlogDashboard from "@/views/blog/dashboard.vue";
import BlogPostForm from "@/views/blog/posts/form.vue";
import SinglePost from "@/views/blog/posts/post.vue";
import blogs from "@/views/blogs.vue";
import register from "@/views/register.vue";
import auth from "./middleware/auth";
import guest from "./middleware/guest";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:id",
    name: "Home",
    component: Home,
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: BlogDashboard,
      },
      {
        path: "/:id/post/form",
        name: "PostCreate",
        component: BlogPostForm,
      },
      {
        path: "/:id/post/:postId",
        name: "PostDetails",
        component: SinglePost,
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
  {
    path: "/",
    redirect: { name: "Login" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.getters["user/getToken"] && !store.getters["user/userData"]) {
    store.dispatch("user/fetchUserData");
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
