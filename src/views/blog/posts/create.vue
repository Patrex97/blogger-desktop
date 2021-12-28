<template>
  <div>
    <h2 class="create-post__title">Nowy post</h2>
    <form class="create-post__form" @submit.prevent="addNewPost">
      <Input v-model="newPost.title" label="Tytuł posta" width="100%" />
      <Textarea
        v-model="newPost.content"
        label="Treść posta"
        width="100%"
        :rows="10"
      />
      <File />
      <Button type="submit" class="button--primary">Utwórz post</Button>
    </form>
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
}
</style>
