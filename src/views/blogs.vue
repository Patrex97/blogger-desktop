<template>
  <div class="blogs__nav">
    <Button class="nav__button button--primary" @click="logout">Wyloguj</Button>
    <h1 class="nav__title">Moje blogi</h1>
    <Button class="nav__button button--primary" @click="openDialog = true">
      Utwórz blog
    </Button>
  </div>
  <section class="blogs">
    <router-link
      v-for="blog in userBlogs"
      :key="blog.id"
      :to="`/${blog.id}`"
      class="blog primary white--text"
    >
      <h2 class="blog__name">{{ blog.name }}</h2>
      <div class="blog__tags">
        <Badge v-for="tag in blog.tags" :key="tag.id" class="blog__tag">
          {{ tag.name }}
        </Badge>
      </div>
    </router-link>
  </section>
  <Dialog :open="openDialog" @closeDialog="openDialog = false" />
</template>

<script lang="ts">
import Badge from "../components/Badge.vue";
import Button from "../components/tools/Button.vue";
import Dialog from "../components/Dialog.vue";
import { defineComponent, ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useGetters, useActions } = createNamespacedHelpers("user");

export default defineComponent({
  name: "Blogs",
  components: {
    Button,
    Badge,
    Dialog,
  },
  setup() {
    const { userBlogs } = useGetters(["userBlogs"]);
    const { logout } = useActions(["logout"]);
    const openDialog = ref(false);
    return { userBlogs, logout, openDialog };
  },
});
</script>

<style lang="scss" scoped>
.blogs {
  display: grid;
  grid-auto-rows: max-content;
  justify-items: center;
  gap: 1.5rem;
  &__nav {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: center;
    padding: 2rem 1.5rem;
  }
}
.nav {
}
.blog {
  width: 400px;
  padding: 1.5rem;
  border-radius: 8px;
  &__name {
    margin-bottom: 1rem;
  }
  &__tags {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
