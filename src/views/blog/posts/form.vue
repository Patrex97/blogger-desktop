<template>
  <div>
    <div class="form__header">
      <h2 class="form__title">
        {{ editForm ? "Edytuj post" : "Nowy post" }}
      </h2>
      <Dropdown v-model:open="templateDropdown">
        <template #activator>
          <button
            @click="templateDropdown = !templateDropdown"
            class="dropdown__activator"
          >
            Szablony <span class="dropdown__arrow">V</span>
          </button>
        </template>
        <template #content>
          <p v-show="!templates.length" class="dropdown__placeholder">
            Nie masz żadnych szablonów
          </p>
          <p
            v-for="template in templates"
            :key="template.id"
            class="dropdown__item"
            @click="loadTemplate(template.contentList)"
          >
            <span>{{ template.title }}</span>
            <button
              class="dropdown__button"
              @click.stop="removeTemplate(template.id)"
            >
              X
            </button>
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
        Dodaj nową treść
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
  },
  mounted() {
    this.fetchTemplates();
  },
  methods: {
    ...mapActions("post", ["createPost", "updatePost"]),
    ...mapActions("template", [
      "saveTemplate",
      "removeTemplate",
      "fetchTemplates",
    ]),
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
      const { title, featuredImage, content } = this.post;
      this.newPost = {
        title,
        featuredImage: {
          externalName: featuredImage,
          isLoaded: !!featuredImage,
        },
        content: content.map((item) => {
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
      const { title, content } = this.newPost;
      if (!title) {
        this.$store.commit("setSnackbar", {
          message: "Post musi mieć tytuł",
          variant: "error",
        });
        return;
      }
      if (!content.length) {
        this.$store.commit("setSnackbar", {
          message: "Post musi mieć jakąś treść",
          variant: "error",
        });
        return;
      }
      if (this.editForm) {
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
      if (!this.saveTemplateDialog.title) {
        this.$store.commit("setSnackbar", {
          message: "Nazwa szablonu jest wymagana",
          variant: "error",
        });
        return;
      }
      const contentList = content.map((part) => part.type);
      this.saveTemplate({ title: this.saveTemplateDialog.title, contentList });
      this.saveTemplateDialog.isOpen = false;
    },
    loadTemplate(content) {
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
      this.templateDropdown = false;
      const componentList = content.split("-");
      if (componentList[0] !== "") {
        componentList.forEach((name) => this.addNewPart(name));
      }
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

.dropdown {
  &__item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    padding: 0.5rem;
    font-weight: 700;
    &:not(:last-of-type) {
      border-bottom: 1px solid rgb(117, 115, 126);
    }
    &:hover {
      background-color: rgb(224, 221, 238);
    }
  }
  &__placeholder {
    padding: 0.5rem;
    width: max-content;
  }
  &__button {
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 900;
    margin-left: 0.5rem;
    padding: 0.125rem 0.25rem;
    background-color: rgb(169, 156, 228);
    border: none;
    &:hover {
      background-color: rgb(113, 90, 216);
      color: white;
    }
  }
  &__activator {
    padding: 0.5rem 0.25rem;
    font-weight: bold;
    background-color: rgb(108, 135, 255);
    border: 1px solid rgb(36, 186, 255);
    border-radius: 6px;
    &:hover {
      background-color: rgb(5, 27, 155);
      color: white;
    }
  }
  &__arrow {
    font-weight: 900;
    margin-right: 0.25rem;
  }
}
</style>
