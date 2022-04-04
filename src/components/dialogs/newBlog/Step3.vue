<template>
  <p v-bind="$attrs">Twój blog zostanie utworzony z następującymi danymi</p>
  <div class="dialog__summary">
    <h3>{{ newBlog.name }}</h3>
    <p>{{ `https:/theBestBlog.test/${newBlog.url.replace(" ", "-")}` }}</p>
  </div>
</template>

<script>
export default {
  name: "Blog-step-3",
  props: {
    newBlog: Object,
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  &__summary {
    display: grid;
    gap: 1.5rem;
    font-size: 1.25rem;
  }
}
</style>
