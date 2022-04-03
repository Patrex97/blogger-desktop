<template>
  <div>
    <div class="form__header">
      <h2 class="form__title">
        {{ editForm ? "Edytuj post" : "Nowy post" }}
      </h2>
      <Dropdown v-model:open="templateDropdown">
        <template #activator>
          <button @click="templateDropdown = !templateDropdown">
            Szablony
          </button>
        </template>
        <template #content>
          <p
            v-for="template in templates"
            :key="template.id"
            class="dropdown__item"
          >
            {{ template.title }}
          </p>
        </template>
      </Dropdown>
    </div>
    <form
      id="create-post-form"
      class="form__form"
      @submit.prevent="handleSubmit"
    >
      <p class="form__subtitle">Tytuł posta</p>
      <Input v-model="newPost.title" width="100%" />
      <p class="form__subtitle">Zdjęcie tytułowe</p>
      <File v-model="newPost.featuredImage" />
      <p class="form__subtitle form__subtitle--between">Treść posta</p>
      <div
        class="content__item"
        v-for="(part, index) in newPost.content"
        :key="part.id"
      >
        <component
          :is="getComponentName(part.type)"
          v-model="part.content"
          v-bind="partFieldProps(part)"
        />
        <button
          type="button"
          class="content__remove"
          @click="removeContent(index)"
        >
          X
        </button>
        <div class="content__buttons">
          <button
            type="button"
            class="content__button content__button--up"
            :class="{ 'content__button--disabled': index === 0 }"
            @click="moveUp(index)"
          >
            <img :src="ARROW_URL" alt="arrow-up" />
          </button>
          <button
            type="button"
            class="content__button content__button--down"
            :class="{
              'content__button--disabled': index === newPost.content.length - 1,
            }"
            @click="moveDown(index)"
          >
            <img :src="ARROW_URL" alt="arrow-up" />
          </button>
        </div>
      </div>
      <Button @click="openNewPartDialog" width="100%" class="button--primary">
        Dodaj element
      </Button>
    </form>
    <div class="form__buttons">
      <Button @click="launchPreview" width="150px" class="button--primary">
        Podgląd
      </Button>
      <Button @click="saveTemplateDialog.isOpen = true" class="button--primary">
        Zapisz szablon posta
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
    <Dialog
      v-model:open="saveTemplateDialog.isOpen"
      title="Podaj nazwę szablonu"
    >
      <Input v-model="saveTemplateDialog.title" width="100%" />
      <template #buttons>
        <Button
          class="button--primary"
          width="100%"
          @click="saveTemplateDialog.isOpen = false"
        >
          Zamknij
        </Button>
        <Button class="button--primary" width="100%" @click="savePostTemplate">
          Zapisz
        </Button>
      </template>
    </Dialog>
    <Dialog v-model:open="newPartDialog.isOpen" title="Wybierz rodzaj treści">
      <Button
        class="button--primary"
        width="100%"
        @click="addNewPart('Editor')"
      >
        Tekst
      </Button>
      <Button
        class="button--primary"
        width="100%"
        @click="addNewPart(this.ContentType.Image)"
      >
        Zdjęcie
      </Button>
      <template #buttons>
        <Button
          class="button--primary button--expanded"
          width="100%"
          @click="newPartDialog.isOpen = false"
        >
          Zamknij
        </Button>
      </template>
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
import { mapActions, mapGetters } from "vuex";
import Dialog from "@/components/Dialog.vue";
import PostPreview from "../../../components/dialogs/PostPreview";
import { ContentType } from "@/interfaces/contentType";
import { getComponentName } from "@/helpers";
import { ARROW_URL } from "@/constants";
import Dropdown from "@/components/tools/Dropdown.vue";

export default defineComponent({
  name: "create",
  components: {
    PostPreview,
    Button,
    Input,
    Editor,
    File,
    Dialog,
    Dropdown,
  },
  data() {
    return {
      ARROW_URL,
      editForm: false,
      ContentType,
      newPost: {
        title: "",
        featuredImage: {
          externalName: "",
          tempName: "",
          file: null,
          isLoaded: false,
        },
        content: [],
      },
      showPreview: false,
      newPartDialog: {
        isOpen: false,
        newPartId: 1000,
      },
      saveTemplateDialog: {
        isOpen: false,
        title: "",
      },
      templateDropdown: false,
    };
  },
  computed: {
    ...mapGetters("post", ["post"]),
    ...mapGetters("template", ["templates"]),
  },
  watch: {
    post(val) {
      if (val) {
        this.editPostInit();
      } else {
        this.createPostInit();
      }
    },
    templates(val) {
      console.log("templates", val);
    },
    // newPost: {
    //   handler(val) {
    //     console.log("NEW POST VALUE: ", val);
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.fetchTemplates();
  },
  methods: {
    ...mapActions("post", ["createPost", "updatePost"]),
    ...mapActions("template", ["saveTemplate", "fetchTemplates"]),
    getComponentName,
    createPostInit() {
      this.newPost = {
        title: "",
        featuredImage: {
          externalName: "",
          tempName: "",
          file: null,
          isLoaded: false,
        },
        content: [],
      };
      this.editForm = false;
    },
    editPostInit() {
      console.log("post", this.post);
      const { title, featuredImage, content } = this.post;
      this.newPost = {
        title,
        featuredImage: {
          externalName: featuredImage,
          isLoaded: !!featuredImage,
        },
        content: content.map((item) => {
          console.log("content item", item);
          if (item.type === ContentType.Image) {
            return {
              ...item,
              content: {
                externalName: item.content,
                tempName: "",
                file: null,
                isLoaded: !!item.content,
              },
            };
          }
          return item;
        }),
      };
      this.editForm = true;
    },
    handleSubmit() {
      if (this.editForm) {
        console.log("this is edit post form");
        this.updatePost(this.newPost);
      } else {
        this.createPost(this.newPost);
      }
    },
    launchPreview() {
      this.showPreview = true;
    },
    partFieldProps(part) {
      return part.type === ContentType.Image ? { label: part.id } : {};
    },
    openNewPartDialog() {
      this.newPartDialog.isOpen = true;
    },
    addNewPart(type) {
      let newPartObject = {
        id: this.newPartDialog.newPartId++,
        content: "",
        type: ContentType.Text,
      };
      if (type === ContentType.Image) {
        newPartObject.content = {
          externalName: "",
          tempName: "",
          file: null,
          isLoaded: false,
        };
        newPartObject.type = ContentType.Image;
      }
      this.newPost.content.push(newPartObject);
    },
    moveUp(index) {
      const contentCopy = [...this.newPost.content];
      const itemCopy = { ...contentCopy[index - 1] };
      contentCopy[index - 1] = { ...contentCopy[index] };
      contentCopy[index] = { ...itemCopy };
      this.newPost.content = contentCopy;
    },
    moveDown(index) {
      const contentCopy = [...this.newPost.content];
      const itemCopy = { ...contentCopy[index + 1] };
      contentCopy[index + 1] = { ...contentCopy[index] };
      contentCopy[index] = { ...itemCopy };
      this.newPost.content = contentCopy;
    },
    removeContent(index) {
      this.newPost.content.splice(index, 1);
    },
    savePostTemplate() {
      const { content } = this.newPost;
      const contentList = content.map((part) => part.type);
      this.saveTemplate({ title: this.saveTemplateDialog.title, contentList });
      this.saveTemplateDialog.isOpen = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.form {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 600px;
    margin-bottom: 2rem;
  }
  &__title {
    font-size: 2.5rem;
  }
  &__form {
    margin: 0 auto;
    max-width: 600px;
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

.content {
  &__item {
    position: relative;
  }
  &__buttons {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -60px;
    display: grid;
    gap: 0.25rem;
  }
  &__button {
    cursor: pointer;
    padding: 0.25rem 0.4125rem;
    border-radius: 4px;
    border-color: #191f57 !important;
    &:hover {
      border-color: #3770ff !important;
      background-color: #698ee9;
    }
    & > img {
      width: 14px;
      height: 14px;
      margin-top: 2px;
    }
    &--down {
      transform: rotate(180deg);
    }
    &--disabled {
      pointer-events: none;
      opacity: 0.6;
    }
  }
  &__remove {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -60px;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    border-color: #191f57 !important;
    font-size: 1.25rem;
    font-weight: 900;
    &:hover {
      border-color: #3770ff !important;
      background-color: #698ee9;
    }
  }
}

.dropdown__item {
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  &:hover {
    background-color: rgb(224, 221, 238);
  }
}
</style>
