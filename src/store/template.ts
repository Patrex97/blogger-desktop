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
        .post("http://localhost:3000/template/save", templateData)
        .then(({ data }) => {
          if (data?.id) {
            dispatch("fetchTemplates");
          }
        })
        .catch((e) => console.error(e));
    },
    removeTemplate({ dispatch }: any, id: any) {
      axios
        .delete(`http://localhost:3000/template/${id}`)
        .then(({ data }) => {
          if (data) {
            dispatch("fetchTemplates");
          }
        })
        .catch((e) => console.error(e));
    },
    fetchTemplates({ commit }: any) {
      axios
        .get("http://localhost:3000/template")
        .then(({ data }) => {
          commit("settemplates", data);
        })
        .catch((e) => console.error(e));
    },
  },
};
