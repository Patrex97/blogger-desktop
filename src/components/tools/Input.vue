<template>
  <label v-if="label" :for="label">{{ label }}</label>
  <input
    :value="modelValue"
    :id="label"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    class="form-input"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    modelValue: {
      type: String,
    },
    width: {
      type: String,
      default: "max-content",
    },
    height: {
      type: String,
      default: "50px",
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
.form-input {
  padding: 14px;
  border-radius: 6px;
  border: 1px solid #d0d0d0;
  width: v-bind(width);
  height: v-bind(height);
  font-size: 1.125rem;
  &::placeholder {
    color: #afafaf;
  }
  &:focus {
    outline: 1px solid rgba(#26489e, 40%);
  }
}
</style>
