<template>
  <div v-if="post" class="post-preview text-left">
    <!--      <h2 class="post-preview__title">Podgląd nowego posta</h2>-->
    <!--    <IMAGE :content="post.featuredImage" />-->
    <h2 class="post-preview__title">{{ post.title }}</h2>
    <component
      v-for="part in filteredPostParts"
      :key="part.id"
      :is="part.type"
      :content="part.content"
    />
  </div>
</template>

<script>
import IMAGE from "./IMAGE.vue";
import TEXT from "./TEXT.vue";

export default {
  name: "PostContent",
  components: {
    IMAGE,
    TEXT,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredPostParts() {
      return this.post?.content?.filter((part) => !!part.content);
    },
  },
};
</script>

<style lang="scss" scoped>
.post-preview {
  display: grid;
  gap: 1.5rem;
}
</style>
