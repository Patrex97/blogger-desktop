<template>
  <div class="dashboard">
    <h2 class="dashboard__title">Posty</h2>
    <Preview v-for="post in posts" :key="post.id" :post="post" />
    <p v-show="!posts.length">Nie masz żadnych postów</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import Preview from "@/components/post/Preview.vue";

export default defineComponent({
  name: "create",
  components: {
    Preview,
  },
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
  &__title {
    font-size: 5rem;
  }
}
</style>
