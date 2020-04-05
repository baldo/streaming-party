<template>
  <page-container>
    <sp-welcome-container>
      <h1>welcome to the streaming party!</h1>

      <strong>grab your headphones and</strong>
    </sp-welcome-container>

    <div class="actions">
      <sp-button
        :variant="ButtonVariant.PRIMARY"
        icon="music"
        text="join the party"
        @click="joinParty()"
      />
      or
      <sp-button
        :variant="ButtonVariant.SECONDARY"
        icon="edit"
        text="have your own party"
        @click="goToCreatePage()"
      />
    </div>

    <div class="room-details">
      <div>jitsi room: {{ jitsiRoomUrl }}</div>
    </div>

    <div class="direct-link">
      <label>
        invite others by sharing this link:
        <sp-copy-field :value="shareLink" />
      </label>
    </div>
  </page-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ButtonVariant, Party } from "@/types";
import PageContainer from "@/components/PageContainer.vue";
import { createPartyPage, joinPartyPage, partyLinkPage } from "@/router";
import SmallContainer from "@/components/SmallContainer.vue";
import { jitsiRoomUrl } from "@/utils/url";

@Component({
  components: { SmallContainer, PageContainer }
})
export default class PartyLinkPage extends Vue {
  $enums = {
    ButtonVariant
  };

  @Prop({ required: true }) party!: Party;

  get jitsiRoomUrl(): string {
    return jitsiRoomUrl(this.party);
  }

  get shareLink(): string {
    return (
      window.location.origin +
      this.$router.resolve(partyLinkPage(this.party)).href
    );
  }

  joinParty(): void {
    this.$router.push(joinPartyPage(this.party));
  }

  goToCreatePage(): void {
    this.$router.push(createPartyPage());
  }
}
</script>

<style scoped lang="scss">
@import "../variables";

.actions {
  font-size: $party-link-page-actions-font-size;
  text-align: center;

  button {
    font-size: $party-link-page-actions-button-font-size;
  }
}

.room-details {
  text-align: center;
}

.direct-link {
  margin: $party-link-page-direct-link-margin;

  text-align: center;
  font-size: $party-link-page-direct-link-font-size;

  label {
    display: block;
    text-align: center;

    input {
      margin: $party-link-page-direct-link-input-margin;

      font-size: $party-link-page-direct-link-input-font-size;
    }
  }
}
</style>
