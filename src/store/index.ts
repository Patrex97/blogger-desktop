import { createStore } from "vuex";
import { user } from "./user";
import { blog } from "./blog";
import { post } from "./post";
import { template } from "./template";

export default createStore({
  modules: { user, blog, post, template },
  state: {
    snackbar: { message: "", variant: "" },
  },
  getters: {
    snackbar(state) {
      return state.snackbar;
    },
  },
  mutations: {
    setSnackbar(state, payload) {
      console.log("payload", payload);

      state.snackbar = payload;
    },
  },
});
