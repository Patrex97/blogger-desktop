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
    createPost({ state, dispatch }: any, newPostData: any) {
      const { title, featuredImage, parts } = newPostData;
      console.log(state.blog);
      axios
        .post("http://localhost:3000/posts/create", {
          title,
          blogId: state.blog.id,
        })
        .then(({ data }) => {
          dispatch("addContent", {
            postId: data.id,
            parts,
          });
        })
        .catch((e) => console.error(e));
    },
    addContent(_: any, postData: any) {
      const { postId, parts } = postData;
      parts.forEach(({ content, type }: any, index: number) => {
        axios
          .post("http://localhost:3000/content/add", {
            postId,
            content,
            type,
            order: index + 1,
          })
          .then(({ data }) => {
            console.log(data);
          })
          .catch((e) => console.error(e));
      });
    },
  },
};
