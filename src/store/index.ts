import { createStore } from "vuex";
import { user } from "./user";
import { blog } from "./blog";
import { post } from "./post";

export default createStore({
  modules: { user, blog, post },
});
