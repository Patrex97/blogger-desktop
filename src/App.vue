<template>
  <router-view />
</template>

<script></script>

<style lang="scss">
$primary: #091f57;
$primary-light: #26489e;
$secondary: #63c4e2;
$white: #edecf5;
$gray: #afafaf;

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.primary {
  background-color: $primary;
  &--text {
    color: $primary;
  }
}
.primary-light {
  background-color: $primary-light;
  &--text {
    color: $primary-light;
  }
}
.secondary {
  background-color: $secondary;
  &--text {
    color: $secondary;
  }
}
.white {
  background-color: $white;
  &--text {
    color: $white;
  }
}
.gray {
  background-color: $gray;
  &--text {
    color: $gray;
  }
}

.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>
