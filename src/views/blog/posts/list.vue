<template>
  <router-link :to="`/${$route.params.id}/posts/create`">
    Dodaj nowy post
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "list",
});
</script>

<style scoped></style>
