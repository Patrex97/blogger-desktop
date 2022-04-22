import axios from "axios";
import router from "../router";

export const user = {
  namespaced: true,
  state: {
    user: null,
    token: null,
    loading: false,
  },
  mutations: {
    setUser(state: any, payload: any) {
      state.user = payload;
    },
    setToken(state: any, payload: string) {
      state.token = payload;
    },
    setLoading(state: any, payload: boolean) {
      state.loading = payload;
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
    loading(state: any) {
      return state.loading;
    },
  },
  actions: {
    fetchUserData({ commit }: any): void {
      axios
        .get("https://thesis-blogger-backend.herokuapp.com/user/data")
        .then((response) => {
          commit("setUser", response.data);
        })
        .catch((e) => console.error(e));
    },
    login({ dispatch, commit }: any, loginData: any): void {
      commit("setLoading", true);
      const { email, password } = loginData;
      axios
        .post("https://thesis-blogger-backend.herokuapp.com/auth/login", {
          email,
          password,
        })
        .then(({ data }) => {
          if (data.error) {
            commit(
              "setSnackbar",
              { message: data.error, variant: "error" },
              { root: true }
            );
          }
          dispatch("fetchUserData");
          commit("setToken", data.token);
          router.push("/blogs");
        })
        .catch((e) => console.error(e))
        .finally(() => {
          commit("setLoading", false);
        });
    },
    logout({ commit }: any) {
      axios
        .get("https://thesis-blogger-backend.herokuapp.com/auth/logout")
        .then((response) => {
          commit("setUser", null);
          commit("setToken", null);
          router.push("/login");
        })
        .catch((e) => console.error(e));
    },
    createUser({ commit }: any, registerData: any) {
      commit("setLoading", true);
      const { email, password } = registerData;
      axios
        .post("https://thesis-blogger-backend.herokuapp.com/user/register", {
          email,
          password,
        })
        .then(({ data }) => {
          commit(
            "setSnackbar",
            { message: "Konto zostało utworzone!", variant: "primary" },
            { root: true }
          );
        })
        .catch((e) => {
          console.log("error", e);
          commit(
            "setSnackbar",
            {
              message: "Konto z takim adresem email już istanieje",
              variant: "error",
            },
            { root: true }
          );
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
  },
};
