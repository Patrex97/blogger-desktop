<template>
  <Snackbar />
  <Navigation />
  <router-view class="bottom-padding"></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";
import Snackbar from "@/components/Snackbar.vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "index",
  components: {
    Navigation,
    Snackbar,
  },
  mounted() {
    this.fetchBlogData(this.$route.params.id);
  },
  methods: {
    ...mapActions("blog", ["fetchBlogData"]),
  },
});
</script>

<style scoped>
.bottom-padding {
  padding-bottom: 20px;
}
</style>
