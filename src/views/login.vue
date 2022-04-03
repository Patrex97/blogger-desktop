<template>
  <main class="wrapper">
    <Snackbar />
    <div class="login">
      <h1 class="login__title primary--text">Zaloguj się</h1>
      <div class="login__form">
        <Input placeholder="Email" type="email" width="341px" v-model="email" />
        <Input
          placeholder="Hasło"
          type="password"
          width="341px"
          v-model="password"
        />
        <Button
          class="login__button button--primary"
          width="341px"
          @click="handleLogin"
        >
          Zaloguj się
        </Button>
      </div>
      <p class="login__register">
        <span class="login__text gray--text">Nie masz konta?</span>
        <span
          class="login__link primary--text"
          @click="$router.push('/register')"
        >
          Zarejestruj się
        </span>
      </p>
    </div>
    <div class="wallpaper">
      <div class="white--text">
        <h2 class="wallpaper__title">Blogger</h2>
        <p class="wallpaper__description">
          Twój uniwersalny program do tworzenia własnego bloga
        </p>
      </div>
      <img src="../assets/login-image.png" alt="" class="wallpaper__image" />
    </div>
  </main>
</template>

<script lang="ts">
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers("user");
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Button from "@/components/tools/Button.vue";
import Input from "@/components/tools/Input.vue";
import Snackbar from "@/components/Snackbar.vue";
import { EMAIL_REGEX } from "../constants";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");
    const { login } = useActions(["login"]);
    function handleLogin(): void {
      if (!email.value.match(EMAIL_REGEX)) {
        console.log("to nie jest email");
        store.commit("setSnackbar", {
          message: "Niewłaściwy adres email",
          variant: "error",
        });
      } else {
        login({
          email: email.value,
          password: password.value,
        });
      }
    }

    return { email, password, handleLogin };
  },
  components: {
    Button,
    Input,
    Snackbar,
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
    cursor: pointer;
  }
}

.wallpaper {
  background: linear-gradient(180deg, #091f57 0%, #7bb9fa 100%);
  display: grid;
  grid-template-rows: 1fr max-content;
  &__title {
    font-size: 4rem;
    line-height: 1.2;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  &__description {
    margin: 0 auto;
    max-width: 400px;
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 500;
  }
  &__image {
    width: 100%;
    max-width: 700px;
  }
}
</style>
