<template>
  <div
    v-show="snackbarData.isOpen"
    class="snackbar"
    :class="`snackbar--${snackbarData.variant}`"
    @click="closeSnackbar"
  >
    <span class="snackbar__message">{{ snackbarData.message }}</span>
  </div>
</template>
<script>
export default {
  name: "Snackbar",
  data() {
    return {
      snackbarData: {
        isOpen: false,
        message: "",
        variant: "",
      },
    };
  },
  computed: {
    snackbar() {
      return this.$store.getters.snackbar;
    },
  },
  watch: {
    snackbar: {
      handler(value) {
        console.log(value);
        if (value.message) this.showSnackbar(value);
      },
      deep: true,
    },
  },
  methods: {
    showSnackbar(value) {
      this.snackbarData = {
        ...value,
        isOpen: true,
      };
      setTimeout(() => {
        this.closeSnackbar();
        this.$store.commit("setSnackbar", { variant: "", message: "" });
      }, 6000);
    },
    closeSnackbar() {
      this.snackbarData = {
        isOpen: false,
        message: "",
        variant: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.snackbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 1rem 0;
  cursor: pointer;
  z-index: 10;
  &--error {
    background-color: rgb(241, 54, 54);
  }
  &--primary {
    background-color: #26489e;
  }
  &__message {
    font-weight: 900;
    font-size: 1.5rem;
    color: black;
  }
}
</style>
