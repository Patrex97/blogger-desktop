import axios from "axios";
import { ContentType } from "../interfaces/contentType";

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
        .get(`https://thesis-blogger-backend.herokuapp.com/post/findOne/${postId}`)
        .then(({ data }) => {
          const resultPost = {
            ...data,
            content: data.content?.sort((partOne: any, partTwo: any) => {
              return partOne.order - partTwo.order;
            }),
          };
          commit("setPost", resultPost);
          return resultPost;
        })
        .catch((e) => console.error(e));
    },
    fetchBlogPosts({ commit }: any, blogId: string): void {
      axios
        .get(`https://thesis-blogger-backend.herokuapp.com/post/findAll/${blogId}`)
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
        .post("https://thesis-blogger-backend.herokuapp.com/post/create", postData)
        .then(({ data }) => {
          dispatch("addContent", {
            postId: data.id,
            content,
          });
        })
        .catch((e) => console.error(e));
    },
    addContent({ commit }: any, postData: any): void {
      const { postId, content } = postData;
      content.forEach((part: any, index: number) => {
        const { type, content } = part;
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("type", type);
        if (content.file) {
          formData.append("image", content.file);
        } else {
          if (content.externalName) {
            formData.append("content", content.externalName);
          } else {
            formData.append("content", content);
          }
        }
        formData.append("order", (index + 1).toString());
        axios
          .post("https://thesis-blogger-backend.herokuapp.com/content/add", formData)
          .catch((e) => console.error(e));
      });
      commit(
        "setSnackbar",
        {
          message: "Post został utworzony",
          variant: "primary",
        },
        { root: true }
      );
    },
    updatePost({ state, dispatch, rootState }: any, updatePostData: any): void {
      const { title, featuredImage } = updatePostData;
      const postData = new FormData();
      postData.append("title", title);
      postData.append("blogId", rootState.blog.blog.id);
      postData.append("featuredImage", featuredImage.file);
      axios
        .patch(`https://thesis-blogger-backend.herokuapp.com/post/${state.post?.id}`, postData)
        .then(({ data }) => {
          if (data) {
            dispatch("replacePostContent", updatePostData);
          }
        })
        .catch((e) => console.error(e));
    },
    replacePostContent({ state, commit, dispatch }: any, updatePostData: any) {
      const { content } = updatePostData;
      axios
        .delete(`https://thesis-blogger-backend.herokuapp.com/content/${state.post?.id}`)
        .then(({ data }) => {
          if (data) {
            commit(
              "setSnackbar",
              {
                message: "Post został zaktualizowany",
                variant: "primary",
              },
              { root: true }
            );
            dispatch("addContent", {
              postId: state.post?.id,
              content,
            });
          }
        })
        .catch((e) => console.error(e));
    },
    deletePost({ rootState, dispatch }: any, postId: string): boolean {
      axios
        .delete(`https://thesis-blogger-backend.herokuapp.com/post/${postId}`)
        .then(({ data }) => {
          dispatch("fetchBlogPosts", rootState.blog.blog?.id);
          return data;
        })
        .catch((e) => console.error(e));
      return false;
    },
  },
};
