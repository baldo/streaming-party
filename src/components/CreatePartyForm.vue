<template>
  <form @submit="onSubmit($event)" ref="form">
    <sp-input-group
      name="jitsi_server_url"
      label="jitsi meet server url"
      title="Must be a valid URL to a Jitsi meet server"
      :constraints="constraints.jitsiServerUrl"
      v-model="party.jitsiServerUrl"
    />

    <sp-input-group
      name="jitsi_room"
      label="room name"
      title="May only contain letters, numbers, underscore or dash"
      :constraints="constraints.jitsiRoomName"
      v-model="party.jitsiRoomName"
    />

    <sp-input-group
      name="stream_url"
      label="stream url"
      title="Must be a valid URL to an embeddable stream"
      :constraints="constraints.streamUrl"
      v-model="party.streamUrl"
    />

    <sp-checkbox-group
      name="accept_terms"
      label="i have checked the jitsi meet servers usage rules to make sure they are
        fine with a streaming party."
      :constraints="constraints.acceptTerms"
      v-model="acceptedTerms"
    />

    <div class="actions">
      <sp-button
        :variant="ButtonVariant.PRIMARY"
        icon="music"
        text="create party"
        @click="onSubmit($event)"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ButtonVariant, CREATE_PARTY_CONSTRAINTS, Party } from "@/types";

@Component
export default class CreatePartyForm extends Vue {
  $refs!: {
    form: HTMLFormElement;
  };

  $enums = {
    ButtonVariant
  };

  @Prop({ required: true }) party!: Party;
  acceptedTerms = false;

  constraints = CREATE_PARTY_CONSTRAINTS;

  onSubmit(event: Event): void {
    event.preventDefault();

    const form = this.$refs.form;
    if (form.checkValidity()) {
      this.$emit("submit", this.party);
    }
  }
}
</script>

<style scoped lang="scss">
.actions {
  text-align: center;
}
</style>
