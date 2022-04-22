import axios from "axios";

export const blog = {
  namespaced: true,
  state: {
    blog: {},
  },
  mutations: {
    setBlog(state: any, payload: any): void {
      state.blog = payload;
    },
  },
  getters: {
    blogData(state: any): any {
      return state.blog;
    },
  },
  actions: {
    createBlog({ dispatch }: any, newBlogData: any) {
      const { name, url } = newBlogData;
      axios
        .post("https://thesis-blogger-backend.herokuapp.com/blog/create", {
          name,
          url,
        })
        .then(() => {
          dispatch("user/fetchUserData", null, { root: true });
        })
        .catch((e) => console.error(e));
    },
    fetchBlogData({ commit }: any, id: any) {
      axios
        .get(`https://thesis-blogger-backend.herokuapp.com/blog/${id}`)
        .then((response) => {
          commit("setBlog", response.data);
        })
        .catch((e) => console.error(e));
    },
  },
};
