<template>
  <p v-bind="$attrs">Przypisz tagi do bloga (minimum 1)</p>
  <div class="dialog__badges">
    <Badge
      v-for="tag in tags"
      :key="tag.id"
      class="dialog__badge white--text"
      :class="{ primary: !tag.selected, secondary: tag.selected }"
      @click="selectTag(tag)"
    >
      {{ tag.name }}
    </Badge>
  </div>
</template>

<script>
import Badge from "../../Badge.vue";
import axios from "axios";

export default {
  name: "Blog-step-1",
  components: {
    Badge,
  },
  props: {
    modelValue: Array,
  },
  data() {
    return {
      tags: [],
    };
  },
  computed: {
    selectedTags() {
      return this.tags.filter((tag) => tag.selected);
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/tag/all")
      .then((response) => {
        this.tags = response.data;
      })
      .catch((e) => console.error(e));
  },
  methods: {
    selectTag(tag) {
      const tagIndex = this.tags.indexOf(tag);
      console.log(tagIndex);
      if (tag.selected) {
        this.tags[tagIndex] = {
          ...tag,
          selected: false,
        };
      } else {
        this.tags[tagIndex] = {
          ...tag,
          selected: true,
        };
      }
      this.$emit("update:modelValue", this.selectedTags);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  &__badge {
  }
}
</style>
