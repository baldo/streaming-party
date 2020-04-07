<template>
  <div class="join-party-page">
    <div class="iframe-container">
      <stream-iframe class="stream" :url="party.streamUrl" />

      <iframe
        class="jitsi-iframe"
        :src="jitsiRoomUrl"
        allow="microphone; camera;"
      ></iframe>
    </div>

    <navbar help-target="_blank" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Party } from "@/types";
import { jitsiRoomUrl } from "@/utils/url";
import StreamIframe from "@/components/StreamIframe.vue";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Navbar,
    StreamIframe,
  },
})
export default class JoinPartyPage extends Vue {
  @Prop({ required: true }) party!: Party;

  get jitsiRoomUrl(): string {
    return jitsiRoomUrl(this.party);
  }
}
</script>

<style scoped lang="scss">
@import "../variables";

.join-party-page {
  display: flex;
  flex-direction: column;

  margin: $join-party-page-margin;
  padding: $join-party-page-padding;

  width: $join-party-page-width;
  height: $join-party-page-height;

  .iframe-container {
    margin: $join-party-page-iframe-container-margin;
    padding: $join-party-page-iframe-container-padding;

    width: $join-party-page-iframe-container-width;
    height: $join-party-page-iframe-container-height;

    overflow: hidden;
  }
}

.stream {
  z-index: $join-party-page-stream-z-index;
}

.jitsi-iframe {
  z-index: $join-party-page-jitsi-z-index;

  margin: $join-party-page-jitsi-margin;
  padding: $join-party-page-jitsi-padding;

  width: $join-party-page-jitsi-width;
  height: $join-party-page-jitsi-height;

  border: $join-party-page-jitsi-border;
  background-color: $join-party-page-jitsi-background-color;
}
</style>
