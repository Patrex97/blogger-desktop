<template>
  <pre>{{ post }}</pre>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "post",
  computed: {
    ...mapGetters("post", ["post"]),
  },
  mounted() {
    this.fetchPostData(this.$route.params.postId);
  },
  methods: {
    ...mapActions("post", ["fetchPostData"]),
  },
};
</script>

<style scoped></style>
