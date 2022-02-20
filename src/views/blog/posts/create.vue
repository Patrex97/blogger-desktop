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
      <Button @click="openNewPartDialog" width="100%" class="button--primary">
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
    <Dialog v-model:open="newPartDialog.isOpen" title="Wybierz rodzaj treści">
      <Button
        class="button--primary"
        width="100%"
        @click="addNewPart('Editor')"
      >
        Tekst
      </Button>
      <Button class="button--primary" width="100%" @click="addNewPart('File')">
        Zdjęcie
      </Button>
    </Dialog>
    <PostPreview v-model:open="showPreview" :post="newPost" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Input from "@/components/tools/Input.vue";
import Editor from "@/components/tools/Editor.vue";
import File from "@/components/tools/File.vue";
import Button from "@/components/tools/Button.vue";
import { mapActions } from "vuex";
import Dialog from "@/components/Dialog.vue";
import PostPreview from "../../../components/dialogs/PostPreview";
import { ContentTypes } from "@/interfaces/contentTypes";

export default defineComponent({
  name: "create",
  components: {
    PostPreview,
    Button,
    Input,
    Editor,
    File,
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
        parts: [],
      },
      showPreview: false,
      newPartDialog: {
        isOpen: false,
        newPartId: 1000,
      },
    };
  },
  methods: {
    ...mapActions("post", ["createPost"]),
    addNewPost() {
      this.createPost(this.newPost);
    },
    launchPreview() {
      this.showPreview = true;
    },
    partFieldProps(part) {
      return part.component === "File" ? { label: part.id } : {};
    },
    openNewPartDialog() {
      this.newPartDialog.isOpen = true;
    },
    addNewPart(type) {
      let newPartObject = {
        id: this.newPartDialog.newPartId++,
        component: type,
        content: "",
        type: ContentTypes.Text,
      };
      if (type === "File") {
        newPartObject.content = {
          externalName: "",
          tempName: "",
          file: null,
          isLoaded: false,
        };
        newPartObject.type = ContentTypes.Image;
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
