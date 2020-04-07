<template>
  <sp-page-container>
    <sp-small-container>
      <sp-welcome-container>
        <h1>frequently asked questions</h1>

        <strong>
          if you are having an issue or are just curious have a look at the
          questions below. or go ahead and...
        </strong>

        <div class="actions">
          <sp-button
            :variant="ButtonVariant.PRIMARY"
            icon="music"
            text="start a party"
            @click="onClick()"
          />
        </div>

        <faq-question question="what kind of streams can be embedded?">
          <p>
            the short and technical answer is: anything that works inside an
            iframe. make sure to provide public a stream url (e.g. not a
            localhost one) so the stream will work for your friends too.
          </p>
        </faq-question>

        <faq-question question="where can i get the stream url?">
          <p>
            some streams provide an embed button. try clicking it and copying
            the url from the embed code.
          </p>
        </faq-question>

        <faq-question question="the stream does work correctly.">
          <p>
            there are some sites that don't allow embeddeding into other sites.
            the same goes e.g. for some of the youtube streams. in such a case
            you will see an error message instead of the stream. if that happens
            there is not much that can be done. sorry.
          </p>
        </faq-question>

        <faq-question
          question="streaming party does not work or looks broken on my mobile device."
        >
          <p>
            streaming party has not yet been optimized for usage on mobile
            phones and tablets. using a different browser may help. otherwise
            please try using a laptop or desktop computer for the time being.
          </p>
        </faq-question>

        <faq-question question="i want to join a party on a mobile device.">
          <p>
            you can join the jitsi room via the jitsi mobile app. just copy the
            jitsi room url and open it in the app. beware though: you will be
            able to video chat with your friends, but you will not be able to
            watch or listen to the stream then.
          </p>
        </faq-question>

        <faq-question question="i am getting some weird accoustic feedback.">
          <p>
            most probably the stream audio is being picked up by your
            microphone. try using headphones or muting / stopping the stream.
          </p>
        </faq-question>

        <faq-question question="my webcam / microphone is not working.">
          <p>
            make sure you have given the browser the permission to access your
            microphone and webcam. you can also try using a different web
            browser. if you are not being asked for either permission this may
            as well be a setup issue with streaming party. make sure streaming
            party is served via https.
          </p>
        </faq-question>

        <faq-question question="the video performance is bad.">
          <p>
            try using a different web browser. firefox is known to perform
            poorly with jitsi.
          </p>
        </faq-question>

        <faq-question question="i am only getting black video from my friends.">
          <p>
            this may be a problem with your web browser or a setup issue with
            the jitsi server used for the party. try using a different web
            browser or starting a new party on a different jitsi server.
          </p>
        </faq-question>
      </sp-welcome-container>
    </sp-small-container>
  </sp-page-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FaqQuestion from "@/components/FaqQuestion.vue";
import { ButtonVariant } from "@/types";
import { createPartyPage } from "@/router";

@Component({
  components: { FaqQuestion },
})
export default class FaqPage extends Vue {
  $enums = {
    ButtonVariant,
  };

  onClick(): void {
    this.$router.push(createPartyPage());
  }
}
</script>

<style scoped lang="scss">
@import "../variables";

p {
  margin: $faq-page-paragraph-margin;
}
</style>
