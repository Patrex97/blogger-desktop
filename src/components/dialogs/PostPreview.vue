<template>
  <Dialog v-model:open="isPreviewOpen" width="700px" class="dialog--overflow">
    <div v-if="isPreviewOpen" class="post-preview text-left">
      <!--      <h2 class="post-preview__title">Podgląd nowego posta</h2>-->
      <Image :content="post.featuredImage" />
      <h2 class="post-preview__title">{{ post.title }}</h2>
      <component
        v-for="part in filteredPostParts"
        :key="part.id"
        :is="getComponentName(part.component)"
        :content="part.content"
      />
    </div>
  </Dialog>
</template>

<script>
import { defineComponent } from "vue";
import Dialog from "../Dialog.vue";
import Image from "../post/Image.vue";
import Text from "../post/Text.vue";

export default defineComponent({
  name: "PostPreview",
  components: {
    Dialog,
    Image,
    Text,
  },
  props: {
    open: Boolean,
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPreviewOpen: this.open,
    };
  },
  computed: {
    filteredPostParts() {
      return this.post.parts.filter((part) => !!part.content);
    },
  },
  watch: {
    open(newValue) {
      this.isPreviewOpen = newValue;
    },
    isPreviewOpen(newValue) {
      this.$emit("update:open", newValue);
    },
  },
  methods: {
    getComponentName(componentName) {
      if (componentName === "Editor") {
        return "Text";
      }
      if (componentName === "File") {
        return "Image";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.post-preview {
  display: grid;
  gap: 1.5rem;
  padding: 0 25px 2rem 25px;
  &__title {
    font-size: 3rem;
    letter-spacing: 1px;
    margin-bottom: 1rem;
  }
}
</style>
