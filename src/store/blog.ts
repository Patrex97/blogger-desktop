import axios from "axios";
import router from "../router";

export const blog = {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {
    createBlog({ dispatch }: any, newBlogData: any) {
      const { name, title, tags } = newBlogData;
      axios
        .post("http://localhost:3000/blog/create", {
          name,
          title,
          tags,
        })
        .then((response) => {
          dispatch("user/fetchUserData", null, { root: true });
        })
        .catch((e) => console.error(e));
    },
  },
};
