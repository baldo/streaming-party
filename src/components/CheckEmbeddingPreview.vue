<template>
  <div :class="['check-embedding-preview', state]">
    <sp-small-container class="preview-container">
      <div class="iframe-container">
        <iframe ref="iframe" :src="url" @load="onLoad()"></iframe>
      </div>
      <i class="spinner fa fa-refresh fa-spin fa-3x fa-fw" v-if="loading"></i>
    </sp-small-container>

    <div class="timer">
      <div class="seconds">{{ elapsedTimeSeconds }}</div>
      seconds
    </div>

    <div v-if="state === State.FAILED">
      <div class="message">the stream does not seem to load correctly.</div>

      <div class="actions">
        <sp-button
          :variant="ButtonVariant.PRIMARY"
          icon="check"
          text="continue anyways"
          @click="confirm()"
        />
        or
        <sp-button
          :variant="ButtonVariant.SECONDARY"
          icon="times"
          text="change the url"
          @click="reject()"
        />
      </div>
    </div>

    <div v-else-if="state === State.SUCCESSFUL">
      <div class="message">
        the stream seems to load correctly. what do you think?
      </div>

      <div class="actions">
        <sp-button
          :variant="ButtonVariant.PRIMARY"
          icon="check"
          text="continue"
          @click="confirm()"
        />
        or
        <sp-button
          :variant="ButtonVariant.SECONDARY"
          icon="times"
          text="change the url"
          @click="reject()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ButtonVariant } from "@/types";

const LOADING_TIMEOUT_SECONDS = 5;

enum State {
  CHECKING = "checking",
  SUCCESSFUL = "successful",
  FAILED = "failed"
}

@Component
export default class CheckEmbeddingPreview extends Vue {
  $refs!: {
    iframe: HTMLFrameElement;
  };

  $enums = {
    ButtonVariant,
    State
  };

  @Prop({ required: true }) url!: string;

  loading = false;
  state = State.CHECKING;
  interval: number | null = null;
  startTime = 0;
  elapsedTimeSeconds = "";

  mounted(): void {
    this.startCheck();
  }

  startCheck(): void {
    this.stopTimer();

    this.startTime = new Date().getTime();
    this.elapsedTimeSeconds = "0.0";
    this.loading = true;

    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const millis = Math.max(0, now - this.startTime);
      const seconds = Math.floor(millis / 1000);
      const tenths = Math.floor((millis - seconds * 1000) / 100);

      this.elapsedTimeSeconds = seconds + "." + tenths;

      if (millis >= LOADING_TIMEOUT_SECONDS * 1000) {
        this.setResult(State.FAILED);
      }
    }, 100);
  }

  onLoad(): void {
    this.stopTimer();
    this.loading = false;
    if (this.state === State.CHECKING) {
      this.setResult(State.SUCCESSFUL);
    }
  }

  stopTimer(): void {
    if (this.interval) {
      clearTimeout(this.interval);
      this.interval = null;
    }
  }

  setResult(state: State): void {
    this.state = state;
  }

  confirm(): void {
    this.$emit("confirm", this.url);
  }

  reject(): void {
    this.$emit("reject", this.url);
  }
}
</script>

<style scoped lang="scss">
@import "../variables";
@import "../mixins";

.check-embedding-preview {
  text-align: center;
}

.preview-container {
  position: relative;
}

.iframe-container {
  @include apsect-ratio(
    $check-embedding-preview-iframe-aspect-ratio-w,
    $check-embedding-preview-iframe-aspect-ratio-h
  );

  border: $check-embedding-preview-iframe-border;
  border-radius: $check-embedding-preview-iframe-border-radius;
  box-shadow: $check-embedding-preview-iframe-checking-box-shadow;

  .failed & {
    box-shadow: $check-embedding-preview-iframe-failed-box-shadow;
  }

  iframe {
    border: none;
  }

  z-index: 1;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;

  font-size: 7.5em;

  margin-top: -0.5em;
  z-index: 2;
}

.timer {
  margin: $check-embedding-preview-timer-margin;

  font-size: $check-embedding-preview-timer-font-size;

  .seconds {
    font-size: $check-embedding-preview-timer-seconds-font-size;
  }

  .failed & {
    color: $check-embedding-preview-timer-failed-color;
  }
}

.message {
  margin: $check-embedding-preview-message-margin;

  font-size: $check-embedding-preview-message-font-size;
}

.actions {
  font-size: $check-embedding-preview-actions-font-size;
  text-align: center;

  button {
    font-size: $check-embedding-preview-actions-button-font-size;
  }
}
</style>
