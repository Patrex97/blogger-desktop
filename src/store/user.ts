import axios from "axios";
import router from "@/router";

export const user = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state: any, payload: any) {
      state.user = payload;
    },
  },
  getters: {
    user(state: any) {
      return state.user;
    },
  },
  actions: {
    fetchUserData({ commit }: any): void {
      console.log("test");
      axios
        .get("http://localhost:3000/user/")
        .then((response) => {
          commit("setUser", response.data);
        })
        .catch((e) => console.error(e));
    },
    login({ dispatch }: any, loginData: any): void {
      const { email, password } = loginData;
      axios
        .post("http://localhost:3000/auth/login", {
          email,
          password,
        })
        .then((response) => {
          dispatch("fetchUserData");
          router.push("/");
        })
        .catch((e) => console.error(e));
    },
    logout({ commit }: any) {
      axios
        .get("http://localhost:3000/auth/logout")
        .then((response) => {
          commit("setUser", null);
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
          console.log(response);
        })
        .catch((e) => console.error(e));
    },
  },
};
