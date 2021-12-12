import axios from "axios";
import router from "../router";

export const user = {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state: any, payload: any) {
      state.user = payload;
    },
    setToken(state: any, payload: string) {
      state.token = payload;
    },
  },
  getters: {
    userData(state: any) {
      return state.user;
    },
    userBlogs(state: any) {
      if (state.user) {
        return state.user?.blogs;
      }
      return [];
    },
    getToken(state: any) {
      return state.token;
    },
  },
  actions: {
    fetchUserData({ commit }: any): void {
      axios
        .get("http://localhost:3000/user/data")
        .then((response) => {
          commit("setUser", response.data);
        })
        .catch((e) => console.error(e));
    },
    login({ dispatch, commit }: any, loginData: any): void {
      const { email, password } = loginData;
      axios
        .post("http://localhost:3000/auth/login", {
          email,
          password,
        })
        .then((response) => {
          dispatch("fetchUserData");
          commit("setToken", response.data.token);
          router.push("/");
        })
        .catch((e) => console.error(e));
    },
    logout({ commit }: any) {
      axios
        .get("http://localhost:3000/auth/logout")
        .then((response) => {
          commit("setUser", null);
          commit("setToken", null);
          router.push("/login");
        })
        .catch((e) => console.error(e));
    },
    createUser(_: any, registerData: any) {
      const { email, password } = registerData;
      axios
        .post("http://localhost:3000/user/register", {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => console.error(e));
    },
  },
};
