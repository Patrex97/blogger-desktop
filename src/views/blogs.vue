<template>
  <div class="blogs__nav">
    <Button class="nav__button button--primary" @click="logout">Wyloguj</Button>
    <h1 class="nav__title">Moje blogi</h1>
    <Button
      class="nav__button button--primary"
      @click="newBlogDialog.isOpen = true"
    >
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
    </router-link>
    <template v-if="!userBlogs.length">
      <p>Nie masz żadnych blogów</p>
      <Button
        class="nav__button button--primary"
        @click="newBlogDialog.isOpen = true"
      >
        Utwórz pierwszy blog
      </Button>
    </template>
  </section>
  <Dialog v-model:open="newBlogDialog.isOpen" title="Nowy blog" width="250px">
    <Step1 v-if="newBlogDialog.currentStep === 1" v-model="newBlog.name" />
    <Step2 v-if="newBlogDialog.currentStep === 2" v-model="newBlog.url" />
    <Step3 v-if="newBlogDialog.currentStep === 3" :new-blog="newBlog" />
    <template v-slot:buttons>
      <Button
        v-if="newBlogDialog.currentStep === 1"
        class="button--primary"
        @click="newBlogDialog.isOpen = false"
      >
        Zamknij
      </Button>
      <Button
        v-if="newBlogDialog.currentStep > 1"
        class="button--primary"
        @click="newBlogDialog.currentStep--"
      >
        Wróć
      </Button>
      <Button
        v-if="newBlogDialog.currentStep < 3"
        class="button--primary"
        @click="newBlogDialog.currentStep++"
      >
        Dalej
      </Button>
      <Button
        v-if="newBlogDialog.currentStep === 3"
        class="button--primary"
        @click="createNewBlog"
      >
        Utwórz
      </Button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Button from "@/components/tools/Button.vue";
import Dialog from "@/components/Dialog.vue";
import { defineComponent, reactive, watch } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import Step1 from "@/components/dialogs/newBlog/Step1.vue";
import Step2 from "@/components/dialogs/newBlog/Step2.vue";
import Step3 from "@/components/dialogs/newBlog/Step3.vue";
const { useGetters: userGetters, useActions: userActions } =
  createNamespacedHelpers("user");
const { useActions: blogActions } = createNamespacedHelpers("blog");

export default defineComponent({
  name: "Blogs",
  components: {
    Step1,
    Step2,
    Step3,
    Button,
    Dialog,
  },
  setup() {
    const { userBlogs } = userGetters(["userBlogs"]);
    const { logout } = userActions(["logout"]);
    const { createBlog } = blogActions(["createBlog"]);
    let newBlogDialog = reactive({
      isOpen: false,
      currentStep: 1,
    });

    let newBlog = reactive({
      name: "",
      url: "",
    });

    watch(newBlogDialog, (newValue) => {
      if (!newValue.isOpen) {
        newBlogDialog.currentStep = 1;
      }
    });

    const createNewBlog = async function () {
      await createBlog(newBlog);
      newBlogDialog.isOpen = false;
    };

    return {
      newBlogDialog,
      newBlog,
      userBlogs,
      logout,
      createNewBlog,
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
}
</style>
