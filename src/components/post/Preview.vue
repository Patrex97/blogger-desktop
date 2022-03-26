<template>
  <div class="post" @click="goToPost(post.id)">
    <span class="post__title">{{ post.title }}</span>
    <button @click.stop="deletePost(post.id)">X</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "PostPreview",
  props: ["post"],
  methods: {
    ...mapActions("post", ["deletePost"]),
    goToPost(postId: string) {
      const path = this.$route.path;
      this.$router.push(`${path}/post/${postId}`);
    },
  },
});
</script>

<style lang="scss" scoped>
.post {
  border: 2px solid black;
  background-color: lightgray;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #001f87;
    .post__title {
      color: white;
    }
  }
  &__title {
    font-size: 2rem;
    font-weight: bold;
  }
}
</style>
