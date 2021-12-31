<template>
  <Editor v-model="content" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@/components/tools/Editor.vue";

export default defineComponent({
  name: "create",
  components: {
    Editor,
  },
  data() {
    return {
      content: "",
    };
  },
});
</script>

<style scoped></style>
