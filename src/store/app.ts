export const app = {
  namespaced: true,
  state: {
    onlineStatus: true,
  },
  mutations: {
    setOnlineStatus(state: any, payload: unknown): void {
      console.log("onlineStatus", payload);
      state.onlineStatus = payload;
    },
  },
  getters: {},
  actions: {
    checkConnection({ commit }: any): void {
      window.addEventListener("online", () => commit("setOnlineStatus", true));
      window.addEventListener("offline", () =>
        commit("setOnlineStatus", false)
      );
    },
  },
};
