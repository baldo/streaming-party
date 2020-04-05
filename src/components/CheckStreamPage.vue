<template>
  <sp-page-container>
    <sp-welcome-container>
      <h1>checking the stream...</h1>
    </sp-welcome-container>

    <check-embedding-preview
      :url="party.streamUrl"
      @confirm="onConfirmStream()"
      @reject="onRejectStream()"
    />
  </sp-page-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { createPartyPage, partyLinkPage } from "@/router";
import CheckEmbeddingPreview from "@/components/CheckEmbeddingPreview.vue";
import { Party } from "@/types";

@Component({
  components: {
    CheckEmbeddingPreview
  }
})
export default class CheckStreamPage extends Vue {
  @Prop({ required: true }) party!: Party;

  onConfirmStream(): void {
    this.$router.push(partyLinkPage(this.party));
  }

  onRejectStream(): void {
    this.$router.push(createPartyPage(this.party));
  }
}
</script>

<style scoped lang="scss"></style>
