<template>
  <div :class="{ 'faq-question': true, expanded: expanded }">
    <h2>
      <a href="javascript:" @click="onClick($event)">
        <i v-if="expanded" class="fa fa-chevron-up" aria-hidden="true"></i>
        <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
        {{ question }}
      </a>
    </h2>

    <transition name="fade-height" mode="in-out">
      <div v-if="expanded" class="faq-answer">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FaqQuestion extends Vue {
  @Prop({ required: true }) question!: string;

  expanded = false;

  onClick(event: Event): void {
    event.preventDefault();
    this.expanded = !this.expanded;
  }
}
</script>

<style scoped lang="scss">
@import "../variables";

.faq-question {
  margin: $faq-question-margin;

  text-align: left;

  .faq-answer {
    margin:$faq-question-answer-margin;

    max-height: $faq-question-answer-max-height;
  }

  h2 {
    margin: $faq-question-headline-margin;

    text-align: left;

    a {
      display: inline-block;

      padding: $faq-question-headline-link-padding;

      color: $faq-question-headline-color;
      text-decoration: none;

      outline-color: $faq-question-headline-link-outline-color;

      &:hover,
      &:active {
        color: $faq-question-headline-link-hover-color;
      }

      i {
        margin: $faq-question-headline-icon-margin;

        vertical-align: middle;

        font-size: $faq-question-headline-icon-font-size;
      }
    }
  }
}

.fade-height-enter-active,
.fade-height-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-height-enter,
.fade-height-leave-to {
  overflow: hidden !important;
  max-height: 0 !important;
  height: 0 !important;
  opacity: 0 !important;
}
</style>
