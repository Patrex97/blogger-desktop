import { createStore } from "vuex";
import { user } from "./user";
import { blog } from "./blog";

export default createStore({
  modules: { user, blog },
});
