<template>
  <nav class="nav secondary">
    <!--    <img src="/profile-placeholder.png" alt="" />-->
    <div class="nav__links">
      <router-link to="/" name="Home"> Strona główna </router-link>
      <router-link to="/posts" name="Home"> Posty </router-link>
      <router-link to="/stats" name="Home"> Statystyki </router-link>
      <span @click="handleLogout">Wyloguj</span>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "Navigation",
  setup() {
    function handleLogout() {
      store.dispatch("user/logout");
    }

    return { handleLogout };
  },
});
</script>

<style scoped lang="scss">
.nav {
  &__links {
    padding: 10px 0;
    display: grid;
    grid-template-rows: 40px;
    grid-template-columns: repeat(3, 1fr);
    & > a {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: red;
      }
    }
  }
}
</style>
