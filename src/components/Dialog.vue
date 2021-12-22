<template>
  <div
    class="overlay"
    :class="{ 'overlay--active': open }"
    @click="$emit('update:open', false)"
  />
  <div class="dialog" :class="{ 'dialog--active': open }">
    <h2>{{ title }}</h2>
    <div class="dialog__content">
      <slot />
    </div>
    <div class="dialog__buttons">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Data } from "../interfaces";

export default defineComponent({
  name: "Dialog",
  props: {
    open: Boolean,
    title: String,
  },
  emits: ["closeDialog"],
  setup(props: Data) {
    console.log(props.open);
  },
});
</script>

<style lang="scss" scoped>
.dialog {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10;
  min-width: 400px;
  min-height: 300px;
  width: max-content;
  height: max-content;
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  background-color: #fff;
  padding: 20px;
  &--active {
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    gap: 1.5rem;
  }
  &__content {
    width: 100%;
  }
  &__buttons {
    display: grid;
    grid-template-rows: max-content;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    ::v-deep {
      .button {
        width: 100% !important;
      }
    }
  }
}
.overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black !important;
  transition: opacity 0.3s ease-out;
  pointer-events: none;
  opacity: 0;
  z-index: 10;
  &--active {
    cursor: pointer;
    opacity: 0.46;
    pointer-events: auto;
  }
}
</style>
