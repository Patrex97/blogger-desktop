<template>
  <div class="form-textarea__wrapper">
    <label class="form-textarea__label" v-if="label" :for="label">
      {{ label }}
    </label>
    <textarea
      :value="modelValue"
      :id="label"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      :placeholder="placeholder"
      class="form-textarea"
    />
  </div>
</template>

<script>
export default {
  name: "Textarea",
  props: {
    modelValue: {
      type: String,
    },
    width: {
      type: String,
      default: "max-content",
    },
    rows: {
      type: Number,
      default: 5,
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
.form-textarea {
  padding: 14px;
  border-radius: 6px;
  border: 1px solid #d0d0d0;
  width: v-bind(width);
  height: v-bind(height);
  font-size: 1.125rem;
  resize: none;
  &::placeholder {
    color: #afafaf;
  }
  &:focus {
    outline: 1px solid rgba(#26489e, 40%);
  }
  &__wrapper {
    display: grid;
    grid-template-columns: v-bind(width);
    justify-content: center;
    gap: 0.75rem;
  }
  &__label {
    justify-self: start;
  }
}
</style>
