<template>
  <button class="button red" v-bind="$attrs" :type="type">
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
    type: {
      type: String,
      default: "button",
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
  cursor: pointer;
  &:focus {
    outline: 1px solid rgba(#26489e, 40%);
  }
  &--primary {
    background-color: #191f57;
    color: #edecf5;
    &:hover {
      background-color: #26489e;
    }
    &:active {
      background-color: #3770ff;
    }
    &--variant {
      background-color: #001f87;
    }
  }
  &--expanded {
    grid-column: 1 / -1;
  }
}
</style>
