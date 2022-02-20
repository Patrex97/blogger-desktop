<template>
  <Dialog v-model:open="isPreviewOpen" width="700px" class="dialog--overflow">
    <PostContent v-if="isPreviewOpen" :post="post" />
  </Dialog>
</template>

<script>
import { defineComponent } from "vue";
import Dialog from "../Dialog.vue";
import PostContent from "../post/PostContent";

export default defineComponent({
  name: "PostPreview",
  components: {
    Dialog,
    PostContent,
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
  watch: {
    open(newValue) {
      this.isPreviewOpen = newValue;
    },
    isPreviewOpen(newValue) {
      this.$emit("update:open", newValue);
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
