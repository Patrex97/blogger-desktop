<template>
  <div>
    <h2 class="create-post__title">Nowy post</h2>
    <form
      id="create-post-form"
      class="create-post__form"
      @submit.prevent="addNewPost"
    >
      <Input v-model="newPost.title" label="Tytuł posta" width="100%" />
      <!--      <Textarea-->
      <!--        v-model="newPost.content"-->
      <!--        label="Treść posta"-->
      <!--        width="100%"-->
      <!--        :rows="10"-->
      <!--      />-->
      <component
        v-for="part in newPost.parts"
        :key="part.id"
        :is="part.component"
        v-model="part.content"
        v-bind="partFieldProps(part.component)"
      />
      <Button @click="addNextPart" width="100%" class="button--primary">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "@/components/tools/Input.vue";
import Textarea from "@/components/tools/Textarea.vue";
import File from "@/components/tools/File.vue";
import Button from "@/components/tools/Button.vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "create",
  components: {
    Button,
    Input,
    File,
    Textarea,
  },
  data() {
    return {
      newPost: {
        title: "",
        parts: [
          {
            id: 1,
            component: "Textarea",
            content: "",
          },
          {
            id: 1,
            component: "File",
            content: "",
          },
        ],
      },
      textareaProps: {
        rows: "10",
        width: "100%",
        label: "Treśc posta",
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
    partFieldProps(partName: any) {
      return partName === "Textarea" ? this.textareaProps : "";
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
    gap: 1.5rem;
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
