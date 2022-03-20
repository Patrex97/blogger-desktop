<template>
  <img
    class="post-image"
    :src="variant ? getImage(content) : getImagePath(content)"
    alt=""
  />
</template>

<script>
import { getImagePath, getImage } from "@/helpers";

export default {
  name: "Image",
  props: {
    content: {
      type: Object,
      required: true,
    },
    variant: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getImagePath,
    getImage,
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
