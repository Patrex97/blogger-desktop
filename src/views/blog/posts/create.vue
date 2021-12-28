<template>
  <div>
    <h2 class="create-post__title">Nowy post</h2>
    <form
      id="create-post-form"
      class="create-post__form"
      @submit.prevent="addNewPost"
    >
      <Input v-model="newPost.title" label="Tytuł posta" width="100%" />
      <Textarea
        v-model="newPost.content"
        label="Treść posta"
        width="100%"
        :rows="10"
      />
      <File />
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
        content: "",
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
