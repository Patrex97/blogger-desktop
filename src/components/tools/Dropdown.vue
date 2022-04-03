<template>
  <div class="dropdown">
    <div class="dropdown__activator"><slot name="activator" /></div>
    <div v-show="open" class="dropdown__content"><slot name="content" /></div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  &__content {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: rgb(206, 204, 214);
  }
  &__item {
    padding: 0.25rem 0.5rem;
  }
}
</style>
