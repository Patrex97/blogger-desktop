<template>
  <img class="post-image" :src="getImagePath(content)" alt="" />
</template>

<script>
import { getImagePath } from "@/helpers";

export default {
  name: "Text",
  props: {
    content: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: "default",
    },
  },
  methods: {
    getImagePath,
  },
};
</script>

<style class="scss" scoped>
.post-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
