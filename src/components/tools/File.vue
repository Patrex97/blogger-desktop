<template>
  <div class="input__wrapper">
    <label class="input" :for="label">
      <div class="input__content" :class="{ 'input__content--preview': file }">
        <span class="input__text">
          {{ file ? "" : "Dodaj zdjęcie" }}
        </span>
      </div>
      <input
        @change="updateValue"
        :id="label"
        class="input__hidden"
        type="file"
        accept="image/*"
      />
    </label>
    <img v-if="file" class="input__preview" :src="file.path" alt="" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getImage } from "@/helpers";

export default defineComponent({
  name: "File",
  props: {
    label: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      file: null,
    };
  },
  watch: {
    modelValue: {
      handler() {
        this.updateLocalStateObject();
      },
      deep: true,
    },
  },
  mounted() {
    this.updateLocalStateObject();
  },
  methods: {
    getImage,
    updateLocalStateObject() {
      if (this.modelValue.isLoaded) {
        if (this.modelValue.tempName) {
          this.file = {
            name: this.modelValue.file.name,
            path: this.modelValue.file.path,
          };
          return;
        }
        if (this.modelValue.externalName) {
          this.file = {
            name: this.modelValue.externalName,
            path: this.getImage(this.modelValue.externalName),
          };
          return;
        }
      }
      this.file = null;
    },
    updateValue(event) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        isLoaded: true,
        tempName: event.target.files[0].name,
        file: event.target.files[0],
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.input {
  cursor: pointer;
  &__wrapper {
    position: relative;
  }
  &__hidden {
    display: none;
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
    object-fit: contain;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>
