import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      loggedIn: false,
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    getUser(state) {
      return `User: ${state.user}`;
    },
    isAuth(state) {
      return state.user.loggedIn;
    },
  },
  actions: {
    updateUserData({ commit }, data) {
      commit("setUser", data);
    },
  },
  modules: {},
});
