<template>
  <input
    :value="value"
    ref="input"
    @focus="onEvent($event)"
    @click="onEvent($event)"
    @change="onEvent($event)"
    @mousedown="onEvent($event)"
    @select="onEvent($event)"
    @keypress="onEvent($event)"
    @paste="onEvent($event)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// TODO: Look into web sharing API.
@Component
export default class CopyField extends Vue {
  $refs!: {
    input: HTMLInputElement;
  };

  @Prop({ required: true }) value!: string;

  fieldValue = "";

  mounted(): void {
    this.fieldValue = this.value;
  }

  onEvent(event: Event): void {
    // Disabling the input field prevents selecting the text so we override a set of event handlers to
    // make sure the value can be easily selected and copied but not be modified.
    event.preventDefault();
    this.fieldValue = this.value;
    this.$refs.input.select();
  }
}
</script>

<style scoped lang="scss">
@import "../../variables";

label {
  display: block;

  margin: $input-group-label-margin;
  padding: $input-group-label-padding;

  width: $input-group-label-width;
}

input {
  display: block;

  margin: $input-group-input-margin;
  padding: $input-group-input-padding;

  color: white;
  background-color: #333;

  border: $input-group-input-border;
  border-radius: $input-group-input-border-radius;
  border-color: white;

  font-family: $input-group-input-font-family;

  box-shadow: none;

  outline: none;

  &:focus {
    border-color: #333;
    background-color: white;
    color: #333;
    box-shadow: $input-group-input-focus-box-shadow;
  }
}
</style>
