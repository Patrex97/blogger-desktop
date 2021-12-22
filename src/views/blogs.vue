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
  <Dialog v-model:open="openDialog" title="Nowy blog">
    <Step1 v-if="currentStep === 1" v-model="newBlog.name" />
    <Step2 v-if="currentStep === 2" v-model="newBlog.url" />
    <template v-slot:buttons>
      <Button class="button--primary" @click="openDialog = false">
        Zamknij
      </Button>
      <Button class="button--primary" @click="currentStep++">Dalej</Button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Badge from "../components/Badge.vue";
import Button from "../components/tools/Button.vue";
import Dialog from "../components/Dialog.vue";
import { defineComponent, ref, reactive } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import Step1 from "../components/dialogs/newBlog/Step1.vue";
import Step2 from "../components/dialogs/newBlog/Step2.vue";
const { useGetters, useActions } = createNamespacedHelpers("user");

export default defineComponent({
  name: "Blogs",
  components: {
    Step1,
    Step2,
    Button,
    Badge,
    Dialog,
  },
  setup() {
    let openDialog = ref(false);
    let currentStep = ref(1);
    let newBlog = reactive({
      name: "",
      url: "",
      tags: [],
    });

    const { userBlogs } = useGetters(["userBlogs"]);
    const { logout } = useActions(["logout"]);

    return {
      openDialog,
      currentStep,
      newBlog,
      userBlogs,
      logout,
    };
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
