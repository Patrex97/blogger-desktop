import { createStore } from "vuex";
import { user } from "./user";
import { blog } from "./blog";
import { post } from "./post";
import { app } from "./app";

export default createStore({
  modules: { app, user, blog, post },
});
