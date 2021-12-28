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
    posts(state: any): any {
      return state.blog.posts;
    },
  },
  actions: {
    createBlog({ dispatch }: any, newBlogData: any) {
      const { name, title, tags } = newBlogData;
      axios
        .post("http://localhost:3000/blog/create", {
          name,
          title,
          tags,
        })
        .then(() => {
          dispatch("user/fetchUserData", null, { root: true });
        })
        .catch((e) => console.error(e));
    },
    fetchBlogData({ commit }: any, id: any) {
      axios
        .get(`http://localhost:3000/blog/${id}`)
        .then((response) => {
          commit("setBlog", response.data);
        })
        .catch((e) => console.error(e));
    },
    createPost(_: any, newPostData: any) {
      const { title, content } = newPostData;
      console.log(title, content);
      // axios
      //   .post("http://localhost:3000/posts/create", {
      //     title,
      //     content,
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((e) => console.error(e));
    },
  },
};
