import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  actions: {
    async fetchUserData({ commit }) {
      await axios.get("http://localhost:3000/user/").then((response) => {
        commit("setUser", response.data);
      });
    },
  },
  modules: {},
});
