import axios from "axios";

export const template = {
  namespaced: true,
  state: {
    templates: [],
  },
  mutations: {
    settemplates(state: any, payload: any): void {
      state.templates = payload;
    },
  },
  getters: {
    templates(state: any): any {
      return state.templates;
    },
  },
  actions: {
    saveTemplate({ dispatch }: any, templateData: any) {
      axios
        .post("https://thesis-blogger-backend.herokuapp.com/template/save", templateData)
        .then(({ data }) => {
          if (data?.id) {
            dispatch("fetchTemplates");
          }
        })
        .catch((e) => console.error(e));
    },
    removeTemplate({ dispatch }: any, id: any) {
      axios
        .delete(`https://thesis-blogger-backend.herokuapp.com/template/${id}`)
        .then(({ data }) => {
          if (data) {
            dispatch("fetchTemplates");
          }
        })
        .catch((e) => console.error(e));
    },
    fetchTemplates({ commit }: any) {
      axios
        .get("https://thesis-blogger-backend.herokuapp.com/template")
        .then(({ data }) => {
          commit("settemplates", data);
        })
        .catch((e) => console.error(e));
    },
  },
};
