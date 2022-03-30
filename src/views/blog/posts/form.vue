<template>
  <div>
    <h2 class="form__title">
      {{ editForm ? "Edytuj post" : "Nowy post" }}
    </h2>
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
      <Button
        class="button--primary"
        width="100%"
        @click="addNewPart(this.ContentType.Image)"
      >
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
import { mapActions, mapGetters } from "vuex";
import Dialog from "@/components/Dialog.vue";
import PostPreview from "../../../components/dialogs/PostPreview";
import { ContentType } from "@/interfaces/contentType";
import { getComponentName } from "@/helpers";
import { ARROW_URL } from "@/constants";

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
    };
  },
  computed: {
    ...mapGetters("post", ["post"]),
  },
  watch: {
    post(val) {
      if (val) {
        this.editPostInit();
      } else {
        this.createPostInit();
      }
    },
    newPost: {
      handler(val) {
        console.log("NEW POST VALUE: ", val);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("post", ["createPost", "updatePost"]),
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
  },
});
</script>

<style lang="scss" scoped>
.form {
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
}
</style>
