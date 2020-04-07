<template>
  <div class="page-container">
    <div class="content">
      <slot />
    </div>

    <navbar class="navbar" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: { Navbar },
})
export default class PageContainer extends Vue {}
</script>

<style scoped lang="scss">
@import "../variables";

.page-container {
  position: relative;

  margin: $page-container-margin;
  padding: $page-container-padding;

  width: $page-container-width;
  height: $page-container-height;

  .content {
    margin: $page-container-content-margin;
  }

  .navbar {
    position: fixed;

    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
