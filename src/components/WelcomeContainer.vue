<template>
  <div class="welcome-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class WelcomeContainer extends Vue {}
</script>

<style lang="scss" scoped>
@import "../variables";

.welcome-container {
  margin: $welcome-container-margin;

  text-align: center;
  font-size: $welcome-container-font-size;

  h1 {
    font-size: $welcome-container-h1-font-size;
    font-weight: normal;
  }

  h2 {
    font-size: $welcome-container-h2-font-size;
    font-weight: normal;
  }

  strong {
    font-size: $welcome-container-strong-font-size;
    font-weight: normal;
  }

  ol,
  ul {
    margin: $welcome-container-list-margin;

    list-style-position: inside;

    font-size: $welcome-container-list-font-size;
  }

  ol > li,
  ul > li {
    margin: $welcome-container-list-element-margin;
  }

  dl {
    font-size: $welcome-container-dl-font-size;

    dt,
    dd {
      float: left;

      margin: $welcome-container-dl-field-margin;
      padding: $welcome-container-dl-field-padding;

      width: $welcome-container-dl-field-width;
      max-width: $welcome-container-dl-field-width;
    }

    dt {
      text-align: right;
    }

    dd {
      text-align: left;
    }
  }

  p {
    margin: $welcome-container-paragraph-margin;

    text-align: left;
  }
}
</style>
