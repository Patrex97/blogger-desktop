<template>
  <main class="post"><PostContent :post="post" variant /></main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PostContent from "@/components/post/PostContent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "post",
  components: {
    PostContent,
  },
  computed: {
    ...mapGetters("post", ["post"]),
  },
  mounted() {
    this.fetchPostData(this.$route.params.postId.toString());
  },
  methods: {
    ...mapActions("post", ["fetchPostData"]),
  },
});
</script>

<style lang="scss" scoped>
.post {
  width: 750px;
  margin: auto;
}
</style>
