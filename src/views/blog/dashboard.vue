<template>
  <div class="dashboard">
    <div
      class="post"
      v-for="post in posts"
      :key="post.id"
      @click="goToPost(post.id)"
    >
      <span class="post__title">{{ post.title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "create",
  data() {
    return {
      content: "",
    };
  },
  computed: {
    ...mapGetters("post", ["posts"]),
  },
  created() {
    this.fetchBlogPosts(this.$route.params.id);
  },
  methods: {
    ...mapActions("post", ["fetchBlogPosts"]),
    goToPost(postId: string) {
      const path = this.$route.path;
      this.$router.push(`${path}/post/${postId}`);
    },
  },
});
</script>

<style lang="scss" scoped>
.dashboard {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  grid-auto-rows: minmax(64px, max-content);
  gap: 1.5rem;
}

.post {
  border: 2px solid black;
  background-color: lightgray;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
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
