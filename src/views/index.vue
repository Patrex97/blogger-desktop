<template>
  <Navigation />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";

export default defineComponent({
  name: "index",
  components: {
    Navigation,
  },
});
</script>

<style scoped></style>
