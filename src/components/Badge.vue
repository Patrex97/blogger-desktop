<template>
  <div class="badge">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Data } from "@/interfaces";

export default defineComponent({
  name: "Badge",
  setup(props: Data): Data {
    return { props: Data };
  },
});
</script>

<style lang="scss" scoped>
.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  border: 1px solid white;
  width: max-content;
}
</style>
