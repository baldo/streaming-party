<template>
  <div class="small-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SmallContainer extends Vue {}
</script>

<style lang="scss" scoped>
@import "../variables";

.small-container {
  margin: $small-container-margin;

  width: $small-container-width;
}
</style>
