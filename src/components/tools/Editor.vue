<template>
  <div v-if="editor" class="editor">
    <div class="editor__tools gray">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Pogrubienie
      </button>
    </div>
    <editor-content class="editor__textarea" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Bold],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
.editor {
  &__tools {
    display: flex;
    gap: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
  &__textarea {
    padding: 0.5rem;
    border: 1px solid #afafaf;
    &:focus-within {
      border-color: rgba(#26489e, 40%);
    }
    & :deep(.ProseMirror) {
      outline: none;
    }
    & :deep(p) {
      text-align: left;
    }
  }
}
</style>
