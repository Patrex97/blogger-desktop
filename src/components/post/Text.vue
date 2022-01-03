<template>
  <p class="post-text" v-html="content" />
</template>

<script>
export default {
  name: "Text",
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.post-text {
  font-size: 1.15rem;
  white-space: pre-line;
  :deep(p):empty {
    padding-bottom: 16px;
  }
}
</style>
