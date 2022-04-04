<template>
  <div v-if="post" class="post-preview text-left">
    <h2 v-if="!variant">Podgląd nowego posta</h2>
    <div class="post-preview__header">
      <img
        v-if="variant && post.featuredImage"
        class="post-preview__image"
        :src="getImage(post.featuredImage)"
        alt=""
      />
      <IMAGE
        v-if="!variant && post.featuredImage"
        :content="post.featuredImage"
      />
      <h2
        class="post-preview__title"
        :class="{ 'post-preview__title--simple': !post.featuredImage }"
      >
        {{ post.title }}
      </h2>
    </div>
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
  &__header {
    position: relative;
    margin-top: 2rem;
  }
  &__title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    font-size: 3rem;
    padding: 0.5rem 1rem;
    background-color: rgba(0, 0, 0, 0.4);
    &--simple {
      position: static;
      color: black !important;
      background: none !important;
    }
  }
  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
}
</style>
