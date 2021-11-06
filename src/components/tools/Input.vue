<template>
  <label v-if="label" for="input">{{ label }}</label>
  <input id="input" :placeholder="placeholder" />
</template>

<script>
export default {
  name: "Input",
  props: {
    width: {
      type: String,
      default: "max-content",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
#input {
  padding: 14px;
  border-radius: 6px;
  border: 1px solid #d0d0d0;
  width: v-bind(width);
  font-size: 1.125rem;
  &::placeholder {
    color: #afafaf;
  }
  &:focus {
    outline: 1px solid rgba(#26489e, 40%);
  }
}
</style>
