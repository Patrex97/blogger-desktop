<template>
  <p class="dialog__description">Podaj nazwę bloga</p>
  <Input
    :value="modelValue"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Nazwa bloga"
  />
</template>

<script lang="ts">
import Input from "../../tools/Input.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Blog-step-1",
  components: {
    Input,
  },
  props: {
    modelValue: String,
  },
});
</script>

<style lang="scss" scoped></style>
