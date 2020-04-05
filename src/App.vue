<template>
  <transition appear name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<style lang="scss">
@import "fonts";
@import "variables";

@import "assets/fork-awesome/scss/fork-awesome";

html,
body {
  margin: $body-margin;
  padding: $body-padding;

  width: $body-width;
  height: $body-height;

  font-family: $body-font-family;

  background-color: $body-background-color;
  color: $body-color;
}

* {
  box-sizing: border-box;
}

::selection {
  color: $selection-color;
  background-color: $selection-background-color;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
