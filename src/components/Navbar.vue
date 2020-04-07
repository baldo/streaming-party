<template>
  <nav>
    <router-link :to="{ name: Page.CREATE_PARTY }"
      ><i class="fa fa-music" aria-hidden="true"></i>home</router-link
    >
    <router-link :to="{ name: Page.FAQ }" :target="helpTarget"
      ><i class="fa fa-question-circle" aria-hidden="true"></i>faq</router-link
    >
    <router-link :to="{ name: Page.ABOUT }" :target="helpTarget"
      ><i class="fa fa-info-circle" aria-hidden="true"></i>about</router-link
    >
    <a :href="sourceLink" target="_blank"
      ><i class="fa fa-code" aria-hidden="true"></i>source code</a
    >
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Page } from "@/router";

@Component
export default class Navbar extends Vue {
  $enums = {
    Page,
  };

  @Prop({ required: false }) helpTarget?: string;

  sourceLink: string = process.env.VUE_APP_SOURCE_URL;
}
</script>

<style scoped lang="scss">
@import "../variables";

nav {
  padding: $navbar-padding;

  text-align: center;

  font-size: $navbar-font-size;
  line-height: $navbar-line-height;

  border-top: $navbar-border;

  color: $navbar-color;
  background-color: $dark-grey;

  a {
    display: inline-block;

    margin: $navbar-link-margin;
    padding: $navbar-link-padding;

    color: $navbar-link-color;
    text-decoration: none;

    i {
      margin: $navbar-link-icon-margin;

      vertical-align: middle;

      font-size: $navbar-link-icon-font-size;
    }

    &:active,
    &:focus {
      outline-color: $navbar-link-outline-color;
      text-decoration: none;
    }

    &:hover,
    &:active {
      color: $navbar-link-hover-color;
    }
  }
}
</style>
