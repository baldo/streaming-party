<template>
  <sp-page-container :prevent-scrolling="true">
    <stream-iframe class="stream" :url="party.streamUrl" />

    <iframe class="jitsi-iframe" :src="jitsiRoomUrl" allow="microphone; camera;"></iframe>
  </sp-page-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Party } from "@/types";
import { jitsiRoomUrl } from "@/utils/url";
import StreamIframe from "@/components/StreamIframe.vue";

@Component({
  components: {
    StreamIframe
  }
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

.stream {
  z-index: $join-party-stream-z-index;
}

.jitsi-iframe {
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  z-index: $join-party-jitsi-z-index;

  border: none;
  background-color: #333333;
}
</style>
