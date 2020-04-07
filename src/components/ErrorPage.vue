import { ErrorType } from "../types";
<template>
  <sp-page-container>
    <sp-welcome-container>
      <h1>oops...</h1>
      <strong>{{ message }}</strong>
    </sp-welcome-container>

    <div class="actions">
      <sp-button
        :variant="ButtonVariant.PRIMARY"
        icon="music"
        text="start over"
        @click="onClick($event)"
      />
    </div>
  </sp-page-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ButtonVariant, ErrorType } from "@/types";
import { createPartyPage } from "@/router";

@Component
export default class ErrorPage extends Vue {
  $enums = {
    ButtonVariant,
  };

  @Prop({ required: true }) errorType!: ErrorType;

  get message(): string {
    switch (this.errorType) {
      case ErrorType.PARTY_VALIDATION:
        return "the link to the party is invalid";

      case ErrorType.NOT_FOUND:
        return "the page you are looking for does not seem to exist";

      case ErrorType.UNKNOWN:
        return "something went wrong, not sure what though...";
    }

    function checkExhaustive(errorType: never): string {
      throw new Error(
        "Unhandled error type (add to switch above): " + errorType
      );
    }

    return checkExhaustive(this.errorType);
  }

  onClick(): void {
    this.$router.push(createPartyPage());
  }
}
</script>

<style scoped lang="scss">
@import "../variables";

.actions {
  margin: $error-page-actions-margin;
  text-align: center;

  button {
    font-size: $error-page-actions-button-font-size;
  }
}
</style>
