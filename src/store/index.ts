import { createStore } from "vuex";
import { user } from "./user";
import { blog } from "./blog";
import { post } from "./post";
import { template } from "./template";

export default createStore({
  modules: { user, blog, post, template },
});
