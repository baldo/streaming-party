<template>
  <sp-page-container>
    <sp-small-container>
      <sp-welcome-container>
        <h1>about streaming party</h1>

        <p>
          streaming party allows you watching or listening to a stream while
          video chatting with your friends. create a jitsi room<sup
            >(video conference)</sup
          >, embed the stream and share the party link with your friends and you
          are ready to go.
        </p>

        <div class="actions">
          <sp-button
            :variant="ButtonVariant.PRIMARY"
            icon="music"
            text="start a party"
            @click="onClick($event)"
          />
        </div>

        <h2>debug information for developers</h2>

        <dl>
          <dt>version:</dt>
          <dd>{{ version }}</dd>

          <dt>git hash:</dt>
          <dd>{{ gitHash }}</dd>
        </dl>
      </sp-welcome-container>
    </sp-small-container>
  </sp-page-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ButtonVariant } from "@/types";
import { createPartyPage } from "@/router";

@Component
export default class AboutPage extends Vue {
  $enums = {
    ButtonVariant,
  };

  version: string = process.env.VUE_APP_VERSION;
  gitHash: string = process.env.VUE_APP_GIT_HASH;

  onClick(): void {
    this.$router.push(createPartyPage());
  }
}
</script>

<style scoped lang="scss">
@import "../variables";

.actions {
  margin: $about-page-actions-margin;
  text-align: center;

  button {
    font-size: $error-page-actions-button-font-size;
  }
}
</style>
