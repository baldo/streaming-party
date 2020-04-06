<template>
  <button :class="variant" @click="$emit('click', $event)">
    <i v-if="icon" :class="['fa', 'fa-' + icon]" aria-hidden="true"></i>
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ButtonVariant } from "@/types";

@Component
export default class Button extends Vue {
  @Prop({ required: true }) text!: string;
  @Prop({ required: true }) variant!: ButtonVariant;
  @Prop({ required: false }) icon?: string;
}
</script>

<style scoped lang="scss">
@import "../../variables";

button {
  &::-moz-focus-inner {
    border: none; // get rid of ugly dotted line when focused in firefox
  }

  margin: $button-margin;
  padding: $button-padding;

  cursor: pointer;

  font-family: $button-font-family;
  font-size: $button-font-size;

  background-color: $button-background-color;

  border-width: $button-border-width;
  border-style: $button-border-style;
  border-radius: $button-border-radius;

  outline: none;

  @each $variant, $variant-color in $button-variants {
    &.#{$variant} {
      color: $variant-color;
      border-color: $variant-color;
    }

    &.#{$variant}:hover {
      color: $button-background-color;
      background-color: $variant-color;
    }

    &.#{$variant}:focus {
      color: $button-background-color;
      background-color: $variant-color;
      border-color: $button-background-color;
      box-shadow: 0 0 0 $button-box-shadow-size $variant-color;
    }
  }
}
</style>
