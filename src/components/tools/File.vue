<template>
  <div class="input__wrapper">
    <label class="input" for="file-input">
      <div class="input__content" :class="{ 'input__content--preview': file }">
        <span class="input__text">
          {{ file ? "" : "Wrzuć plik tutaj" }}
        </span>
      </div>
      <input
        @change="updateValue"
        id="file-input"
        type="file"
        accept="image/*"
      />
    </label>
    <img v-if="file" class="input__preview" :src="file.path" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "File",
  data() {
    return {
      file: null,
    };
  },
  methods: {
    updateValue(event: any) {
      this.file = event.target.files[0];
      this.$emit("update:modelValue", event.target.files[0]);
    },
  },
});
</script>

<style lang="scss" scoped>
#file-input {
  display: none;
}
.input {
  cursor: pointer;
  &__wrapper {
    position: relative;
  }
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    height: 300px;
    background-color: #edecf5;
    color: #26489e;
    &--preview {
      background-color: white;
      border: 1px solid #edecf5;
    }
  }
  &__text {
    font-size: 1.25rem;
    font-weight: bold;
  }
  &__preview {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>
