<template>
  <div>
    <div>{{ getUser }}</div>
    <button @click="updateUserData('Janek')">Set name</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "index",
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["updateUserData"]),
  },
};
</script>

<style scoped></style>
