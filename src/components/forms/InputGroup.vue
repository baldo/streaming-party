<template>
  <fieldset :class="{ 'has-error': error }">
    <label :for="inputId">{{ label }}:</label>
    <input
      :id="inputId"
      :name="name"
      :value="value"
      :title="title"
      :required="constraints.required"
      :type="constraints.type"
      :pattern="constraints.pattern && constraints.pattern.source"
      ref="input"
      @input="onInput($event)"
      @change="onChange($event)"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
      @invalid="onInvalid($event)"
    />
    <span v-if="error" class="error">{{ error }}</span>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getEventTarget } from "@/utils/dom";
import { InputConstraints } from "@/types";

let nextInputId = 1;

@Component
export default class InputGroup extends Vue {
  $refs!: {
    input: HTMLInputElement;
  };

  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) value!: string;
  @Prop({ required: true }) label!: string;
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) constraints!: InputConstraints;

  showError = false;
  error = "";
  inputId = "";

  mounted(): void {
    this.inputId = "sp-input-group-input-" + nextInputId;
    nextInputId += 1;
  }

  onInput(event: Event): void {
    this.$emit("input", getEventTarget(event, HTMLInputElement).value);
  }

  onChange(event: Event): void {
    this.$emit("change", getEventTarget(event, HTMLInputElement).value);
  }

  onFocus(event: Event): void {
    this.$emit("focus", getEventTarget(event, HTMLInputElement).value);
    this.updateErrorState();
  }

  onBlur(event: Event): void {
    this.$emit("blur", getEventTarget(event, HTMLInputElement).value);
    this.updateErrorState();
  }

  onInvalid(event: Event): void {
    this.$emit("invalid", getEventTarget(event, HTMLInputElement).value);
    this.showError = true; // show validation errors after submit
    this.updateErrorState();
  }

  updateErrorState(): void {
    this.error = this.showError ? this.$refs.input.validationMessage : "";
  }
}
</script>

<style scoped lang="scss">
@import "../../variables";

fieldset {
  margin: $input-group-fieldset-margin;
  padding: $input-group-fieldset-padding;

  width: $input-group-fieldset-width;

  border: none;

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

    width: $input-group-input-width;

    font-family: $input-group-input-font-family;
    font-size: $input-group-input-font-size;

    color: $input-group-input-color;
    background-color: $input-group-input-background-color;

    border: $input-group-input-border;
    border-radius: $input-group-input-border-radius;

    box-shadow: none;

    outline: none;
  }

  &.has-error input {
    box-shadow: none;

    color: $input-group-input-invalid-color;
    background-color: $input-group-input-invalid-background-color;
    border-color: $input-group-input-invalid-border-color;
  }

  input:focus {
    box-shadow: $input-group-input-focus-box-shadow;
    background-color: $input-group-input-background-color;
  }

  .error {
    display: block;

    margin: $input-group-error-margin;
    padding: $input-group-error-padding;

    width: $input-group-error-width;

    color: $input-group-error-color;
    text-transform: lowercase;
  }
}
</style>
