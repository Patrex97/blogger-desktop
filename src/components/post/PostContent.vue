<template>
  <div v-if="post" class="post-preview text-left">
    <h2 v-if="!variant" class="post-preview__title">Podgląd nowego posta</h2>
    <img
      v-if="variant"
      class="post-preview__image"
      :src="getImage(post.featuredImage)"
      alt=""
    />
    <Image v-else :content="post.featuredImage" />
    <h2 class="post-preview__title">{{ post.title }}</h2>
    <component
      v-for="part in filteredPostParts"
      :key="part.id"
      :is="part.type"
      :content="part.content"
      :variant="variant"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getImage } from "@/helpers";

import IMAGE from "./IMAGE.vue";
import TEXT from "./TEXT.vue";

export default defineComponent({
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
    variant: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filteredPostParts() {
      return this.post?.content?.filter((part) => !!part.content);
    },
  },
  methods: {
    getImage,
  },
});
</script>

<style lang="scss" scoped>
.post-preview {
  display: grid;
  gap: 1.5rem;
  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>
