<template>
  <p>Podaj adres url bloga</p>
  <Input
    :value="modelValue"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="URL"
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
