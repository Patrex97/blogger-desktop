import axios from "axios";

export const blog = {
  namespaced: true,
  state: {
    blog: {},
    posts: [],
  },
  mutations: {
    setBlog(state: any, payload: any): void {
      state.blog = payload;
    },
    setPosts(state: any, payload: any): void {
      state.posts = payload;
    },
  },
  getters: {
    blogData(state: any): any {
      return state.blog;
    },
    posts(state: any): any {
      return state.posts;
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
    fetchBlogPosts({ commit, state }: any) {
      axios
        .get(`http://localhost:3000/post/findAll/${state.blog.id}`)
        .then((response) => {
          commit("setPosts", response.data);
        })
        .catch((e) => console.error(e));
    },
    createPost({ state, dispatch }: any, newPostData: any) {
      const { title, featuredImage, parts } = newPostData;
      axios
        .post("http://localhost:3000/post/create", {
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
      const testData = new FormData();
      testData.append("test", "aaa");
      console.log("testData", testData);
      parts.forEach((part: any, index: number) => {
        const { type, content } = part;
        console.log("part", type, content.file);
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("type", type);
        if (content.file) {
          formData.append("content", content.file, content.fileName);
        } else {
          formData.append("content", content);
        }
        formData.append("order", (index + 1).toString());
        axios
          .post("http://localhost:3000/content/add", formData)
          .then(({ data }) => {
            console.log(data);
          })
          .catch((e) => console.error(e));
      });
    },
  },
};
