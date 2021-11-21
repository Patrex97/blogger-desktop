<template><div /></template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  name: "index",
  setup() {
    router.push("/login");
  },
});
</script>

<style scoped></style>
