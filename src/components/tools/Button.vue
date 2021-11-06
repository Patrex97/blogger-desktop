<template>
  <button class="button red" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    width: {
      type: String,
      default: "max-content",
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  border: none;
  border-radius: 6px;
  padding: 14px;
  width: v-bind(width);
  &:focus {
    outline: 1px solid rgba(#26489e, 40%);
  }
  &--primary {
    &:hover {
      background-color: #26489e;
    }
    &:active {
      background-color: #3770ff;
    }
  }
}
</style>
