<template>
  <div class="post" @click="goToPost">
    <span class="post__title">{{ post.title }}</span>
    <div class="post__buttons">
      <button class="post__button" @click.stop="deletePost(post.id)">
        DELETE
      </button>
      <button class="post__button" @click.stop="goToEditPage">EDIT</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";

export default defineComponent({
  name: "PostPreview",
  props: ["post"],
  methods: {
    ...mapActions("post", ["deletePost", "fetchPostData"]),
    goToPost() {
      const path = this.$route.path;
      this.$router.push(`${path}/post/${this.post.id}`);
    },
    async goToEditPage() {
      await this.fetchPostData(this.post.id);
      const path = this.$route.path;
      await this.$router.push(`${path}/post/create`);
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
  justify-content: space-around;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(150, 146, 172);
  }
  &__title {
    flex-grow: 1;
    font-size: 2rem;
    font-weight: bold;
  }
  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
  &__button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: #012e3f;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    &:hover {
      background-color: #00668b;
    }
  }
}
</style>
