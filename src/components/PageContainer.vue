<template>
  <div
    :class="{ 'page-container': true, 'prevent-scrolling': preventScrolling }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PageContainer extends Vue {
  @Prop({ required: false, default: false }) preventScrolling!: boolean;
}
</script>

<style scoped lang="scss">
@import "../variables";

.page-container {
  position: relative;

  margin: $page-container-margin;
  padding: $page-container-padding;

  width: $page-container-width;
  height: $page-container-height;

  &.prevent-scrolling {
    overflow: hidden;
  }
}
</style>
