<template>
  <sp-page-container>
    <sp-welcome-container>
      <h1>start your own streaming party</h1>

      <ol>
        <li>
          create a jitsi room<sup>(video conference)</sup> with an embedded
          concert / party / whatever stream.
        </li>
        <li>share the url with your friends.</li>
        <li>have an awesome streaming party!</li>
      </ol>
    </sp-welcome-container>

    <sp-small-container>
      <create-party-form :party="editableParty" @submit="onSubmit($event)" />
    </sp-small-container>
  </sp-page-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CreatePartyForm from "./CreatePartyForm.vue";
import { Party } from "@/types";
import { checkStreamPage } from "@/router";

@Component({
  components: {
    CreatePartyForm
  }
})
export default class CreatePartyPage extends Vue {
  @Prop({ required: false }) party?: Party;

  get editableParty(): Party {
    return (
      this.party || {
        jitsiServerUrl: "http://localhost:1234",
        jitsiRoomName: "test",
        streamUrl: "https://invidio.us/embed/0Cvzbh70m7M"
      }
    );
  }

  onSubmit(party: Party): void {
    this.$router.push(checkStreamPage(party));
  }
}
</script>

<style scoped lang="scss"></style>
