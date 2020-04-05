<template>
  <fieldset :class="{ 'has-error': error }">
    <div>
      <input
        :id="inputId"
        :name="name"
        :required="constraints.required"
        type="checkbox"
        ref="input"
        @input="onInput($event)"
        @change="onChange($event)"
        @focus="onFocus($event)"
        @blur="onBlur($event)"
        @invalid="onInvalid($event)"
      />
      <label :for="inputId">{{ label }}</label>
    </div>
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
  @Prop({ required: true }) value!: boolean;
  @Prop({ required: true }) label!: string;
  @Prop({ required: true }) constraints!: InputConstraints;

  showError = false;
  error = "";
  inputId = "";

  mounted(): void {
    this.inputId = "sp-checkbox-group-input-" + nextInputId;
    nextInputId += 1;
  }

  onInput(event: Event): void {
    this.$emit("input", getEventTarget(event, HTMLInputElement).checked);
    this.updateErrorState();
  }

  onChange(event: Event): void {
    this.$emit("change", getEventTarget(event, HTMLInputElement).checked);
    this.updateErrorState();
  }

  onFocus(event: Event): void {
    this.$emit("focus", getEventTarget(event, HTMLInputElement).value);
  }

  onBlur(event: Event): void {
    this.$emit("blur", getEventTarget(event, HTMLInputElement).value);
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
  margin: $checkbox-group-fieldset-margin;
  padding: $checkbox-group-fieldset-padding;

  width: $checkbox-group-fieldset-width;

  border: none;
}

input {
  // hide the default checkbox and then rebuild a new one via label::before
  z-index: -1;

  position: absolute;
  left: 0;
  top: 0;

  margin: 0;
  padding: 0;

  width: 0;
  height: 0;

  opacity: 0;

  border: none;
  box-shadow: none;
}

label {
  display: inline-block;

  margin: $checkbox-group-label-margin;
  padding: $checkbox-group-label-padding;

  width: $checkbox-group-label-width;

  &::before {
    display: inline-block;
    vertical-align: top;

    content: "";

    margin: $checkbox-group-input-margin;

    width: $checkbox-group-input-size;
    height: $checkbox-group-input-size;

    background-color: $checkbox-group-input-background-color;
    border: $checkbox-group-input-border;
    border-radius: $checkbox-group-input-border-radius;

    cursor: pointer;
  }
}

fieldset.has-error label::before {
  background-color: $checkbox-group-input-invalid-background-color;
}

input:focus ~ label::before {
  background-color: $checkbox-group-input-focus-background-color;
  box-shadow: $checkbox-group-input-focus-box-shadow;
}

input:checked ~ label::before {
  content: "\2713";

  text-align: center;
  line-height: $checkbox-group-input-line-height;

  color: $checkbox-group-input-color;
}

.error {
  display: block;

  margin: $checkbox-group-error-margin;
  padding: $checkbox-group-error-padding;

  width: $checkbox-group-error-width;

  color: $checkbox-group-error-color;
  text-transform: lowercase;
}
</style>
