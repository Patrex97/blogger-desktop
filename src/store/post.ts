import axios from "axios";

export const post = {
  namespaced: true,
  state: {
    posts: [],
    post: {},
  },
  mutations: {
    setPosts(state: any, payload: any): void {
      state.posts = payload;
    },
    setPost(state: any, payload: any): void {
      state.post = payload;
    },
  },
  getters: {
    posts(state: any): any {
      return state.posts;
    },
    post(state: any): any {
      return state.post;
    },
  },
  actions: {
    fetchPostData({ commit }: any, postId: string): void {
      axios
        .get(`http://localhost:3000/post/findOne/${postId}`)
        .then((response) => {
          commit("setPost", response.data);
          return response.data;
        })
        .catch((e) => console.error(e));
    },
    fetchBlogPosts({ commit }: any, blogId: string): void {
      axios
        .get(`http://localhost:3000/post/findAll/${blogId}`)
        .then((response) => {
          commit("setPosts", response.data);
        })
        .catch((e) => console.error(e));
    },
    createPost({ state, dispatch, rootState }: any, newPostData: any): void {
      const { title, featuredImage, content } = newPostData;
      const postData = new FormData();
      postData.append("title", title);
      postData.append("blogId", rootState.blog.blog.id);
      postData.append("featuredImage", featuredImage.file);
      axios
        .post("http://localhost:3000/post/create", postData)
        .then(({ data }) => {
          dispatch("addContent", {
            postId: data.id,
            content,
          });
        })
        .catch((e) => console.error(e));
    },
    addContent(_: any, postData: any): void {
      const { postId, content } = postData;
      content.forEach((part: any, index: number) => {
        const { type, content } = part;
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("type", type);
        if (content.file) {
          formData.append("image", content.file);
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
    deletePost({ rootState, dispatch }: any, postId: string): boolean {
      axios
        .delete(`http://localhost:3000/post/${postId}`)
        .then(({ data }) => {
          dispatch("fetchBlogPosts", rootState.blog.blog?.id);
          return data;
        })
        .catch((e) => console.error(e));
      return false;
    },
  },
};
