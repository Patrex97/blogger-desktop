<template>
  <p v-bind="$attrs">Twój blog zostanie utworzony z następującymi danymi</p>
  <div class="dialog__summary">
    <h3>{{ newBlog.name }}</h3>
    <p>{{ newBlog.url }}</p>
    <div class="dialog__badges">
      <Badge
        v-for="tag in newBlog.tags"
        :key="tag.id"
        class="dialog__badge secondary white--text"
      >
        {{ tag.name }}
      </Badge>
    </div>
  </div>
</template>

<script>
import Badge from "../../Badge.vue";
import axios from "axios";

export default {
  name: "Blog-step-4",
  components: {
    Badge,
  },
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
  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
  }
}
</style>
