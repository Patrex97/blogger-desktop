<template>
  <main class="wrapper">
    <div class="login">
      <h1 class="login__title primary--text">Zaloguj się</h1>
      <div class="login__form">
        <Input placeholder="Login" width="341px" />
        <Input placeholder="Login" width="341px" />
        <Button
          class="login__button button--primary primary white--text"
          width="341px"
        >
          Zaloguj się
        </Button>
      </div>
      <p class="login__register">
        <span class="login__text gray--text">Nie masz konta?</span>
        <router-link class="login__link primary--text" to="/">
          Zarejestruj się
        </router-link>
      </p>
    </div>
    <div class="wallpaper">test</div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/tools/Button.vue";
import Input from "@/components/tools/Input.vue";

export default defineComponent({
  name: "Login",
  components: {
    Button,
    Input,
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100vh;
}

.login,
.wallpaper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login {
  &__title {
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.4;
    border-bottom: 5px solid #091f57;
    margin-bottom: 70px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  &__register {
    margin-top: 100px;
  }
  &__text {
    margin-right: 0.5rem;
  }
  &__link {
    font-weight: bold;
  }
}

.wallpaper {
  background: linear-gradient(180deg, #091f57 0%, #7bb9fa 100%);
}
</style>
