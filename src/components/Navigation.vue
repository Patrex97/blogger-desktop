<template>
  <nav class="nav secondary">
    <div class="nav__links">
      <span class="nav__link" @click="handleLogout">Wyloguj</span>
      <router-link to="/blogs" name="Home"> Moje blogi </router-link>
    </div>
    <div class="nav__links">
      <router-link :to="`/${$route.params.id}`" name="Home">
        Moje posty
      </router-link>
      <router-link :to="`/${$route.params.id}/post/create`" name="Home">
        Dodaj nowy post
      </router-link>
      <h1 class="nav__title">{{ blogData?.name }}</h1>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import store from "../store";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useGetters } = createNamespacedHelpers("blog");

export default defineComponent({
  name: "Navigation",
  setup() {
    const { blogData } = useGetters(["blogData"]);
    function handleLogout() {
      store.dispatch("user/logout");
    }

    return { blogData, handleLogout };
  },
});
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  margin-bottom: 4rem;
  &__links {
    padding: 10px 0;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 40px;
    grid-auto-columns: max-content;
    gap: 0.75rem;
    & > * {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  a,
  &__link {
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    &:hover {
      background-color: #26489e;
      color: #edecf5;
    }
  }
  &__title {
    margin-left: 1rem;
    padding-left: 1rem;
    border-left: 1px solid gray;
  }
}
</style>
