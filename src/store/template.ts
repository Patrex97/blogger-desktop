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
    saveTemplate({ dispatch }: any, contentList: string[]) {
      axios
        .post("http://localhost:3000/template/save", { contentList })
        .then(({ data }) => {
          console.log(data);
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
          console.log(data);
        })
        .catch((e) => console.error(e));
    },
  },
};
