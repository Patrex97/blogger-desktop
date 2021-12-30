<template>
  <div>
    <h2 class="create-post__title">Nowy post</h2>
    <form
      id="create-post-form"
      class="create-post__form"
      @submit.prevent="addNewPost"
    >
      <p class="create-post__subtitle">Tytuł posta</p>
      <Input v-model="newPost.title" width="100%" />
      <p class="create-post__subtitle">Zdjęcie tytułowe</p>
      <File v-model="newPost.featuredImage" />
      <p class="create-post__subtitle create-post__subtitle--between">
        Treść posta
      </p>
      <component
        v-for="part in newPost.parts"
        :key="part.id"
        :is="part.component"
        v-model="part.content"
        v-bind="partFieldProps(part)"
      />
      <Button @click="openPartDialog" width="100%" class="button--primary">
        Dodaj element
      </Button>
    </form>
    <div class="create-post__buttons">
      <Button @click="launchPreview" width="150px" class="button--primary">
        Podgląd
      </Button>
      <Button
        type="submit"
        form="create-post-form"
        width="150px"
        class="button--primary"
      >
        Utwórz
      </Button>
    </div>
    <Dialog v-model:open="partDialog.isOpen" title="Wybierz rodzaj treści">
      <Button
        class="button--primary"
        width="100%"
        @click="addNewPart('Textarea')"
      >
        Tekst
      </Button>
      <Button class="button--primary" width="100%" @click="addNewPart('File')">
        Zdjęcie
      </Button>
    </Dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Input from "@/components/tools/Input.vue";
import Textarea from "@/components/tools/Textarea.vue";
import File from "@/components/tools/File.vue";
import Button from "@/components/tools/Button.vue";
import { mapActions } from "vuex";
import Dialog from "@/components/Dialog.vue";

export default defineComponent({
  name: "create",
  components: {
    Button,
    Input,
    File,
    Textarea,
    Dialog,
  },
  data() {
    return {
      newPost: {
        title: "",
        featuredImage: {
          externalName: "",
          tempName: "",
          file: null,
          isLoaded: false,
        },
        parts: [
          {
            id: 1,
            component: "Textarea",
            content: "",
          },
          {
            id: 2,
            component: "File",
            content: {
              externalName: "",
              tempName: "",
              file: null,
              isLoaded: false,
            },
          },
          {
            id: 3,
            component: "File",
            content: {
              externalName: "",
              tempName: "",
              file: null,
              isLoaded: false,
            },
          },
        ],
      },
      partDialog: {
        isOpen: false,
        type: "new",
        newPartId: 1000,
        target: {},
      },
      textareaProps: {
        rows: 10,
        width: "100%",
      },
    };
  },
  methods: {
    ...mapActions("blog", ["createPost"]),
    addNewPost() {
      this.createPost(this.newPost);
    },
    launchPreview() {
      console.log("Uruchomiono podglad posta");
    },
    partFieldProps(part) {
      return part.component === "Textarea"
        ? this.textareaProps
        : { label: part.id };
    },
    openPartDialog() {
      this.partDialog.isOpen = true;
    },
    addNewPart(type) {
      let newPartObject = {
        id: this.partDialog.newPartId++,
        component: type,
        content: "",
      };
      if (type === "File") {
        newPartObject.content = {
          externalName: "",
          tempName: "",
          file: null,
          isLoaded: false,
        };
      }
      this.newPost.parts.push(newPartObject);
    },
  },
});
</script>

<style lang="scss" scoped>
.create-post {
  &__title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  &__form {
    margin: 0 auto;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  &__subtitle {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: left;
    &--between {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
  }
  &__buttons {
    width: 600px;
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
