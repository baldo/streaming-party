<template>
  <div
    :class="{
      'stream-container': true,
      collapsed: collapsed,
      transitioning: transitioning,
      dragging: dragState.active,
      resizing: resizeState.active,
    }"
    :style="{
      left: x + 'px',
      top: y + 'px',
      width: width + 'px',
    }"
    ref="stream-container"
  >
    <div
      class="stream-header"
      @mousedown="startDragging($event)"
      @mouseup="stopDragging($event)"
    >
      <div class="text">
        <i class="fa fa-music" aria-hidden="true"></i>
        streaming party
      </div>
      <div class="icon refresh-stream" @click="refreshStream($event)">
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </div>
      <div class="icon toggle-collapse" @click="toggleCollapsed($event)">
        <i v-if="collapsed" class="fa fa-window-restore" aria-hidden="true"></i>
        <i v-else class="fa fa-window-minimize" aria-hidden="true"></i>
      </div>
    </div>
    <transition
      name="fade-height"
      mode="in-out"
      @before-enter="updateTransitioning(true)"
      @before-leave="updateTransitioning(true)"
      @after-enter="updateTransitioning(false)"
      @after-leave="updateTransitioning(false)"
    >
      <div
        v-show="!collapsed"
        class="stream-iframe-container"
        ref="iframe-container"
      >
        <i class="spinner fa fa-refresh fa-spin fa-3x fa-fw"></i>

        <iframe
          class="stream-iframe"
          v-if="showIframe"
          :src="url"
          allowfullscreen
          webkitAllowFullScreen
          mozallowfullscreen
        ></iframe>

        <div class="resize-container">
          <div
            class="resize-area resize-w"
            @mousedown="startResizing($event, ResizeDirection.WEST)"
          ></div>
          <div
            class="resize-area resize-e"
            @mousedown="startResizing($event, ResizeDirection.EAST)"
          ></div>
          <div
            class="resize-area resize-s"
            @mousedown="startResizing($event, ResizeDirection.SOUTH)"
          ></div>
          <div
            class="resize-area resize-sw"
            @mousedown="startResizing($event, ResizeDirection.SOUTH_WEST)"
          ></div>
          <div
            class="resize-area resize-se"
            @mousedown="startResizing($event, ResizeDirection.SOUTH_EAST)"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const DRAGGING_MARGIN_X = 10;
const DRAGGING_MARGIN_Y = 10;

const ASPECT_RATIO = 16 / 10;
const MIN_WIDTH = 250;
const MIN_HEIGHT = MIN_WIDTH / ASPECT_RATIO;

type Listeners = { [key: string]: EventListener };

enum MouseActionType {
  DRAG = "drag",
  RESIZE = "resize",
}

type MouseActionState = {
  active: boolean;
  offset: { x: number; y: number };
  listeners: Listeners;
  type: MouseActionType;
};

enum ResizeDirection {
  WEST = "resize-w",
  EAST = "resize-e",
  SOUTH = "resize-s",
  SOUTH_WEST = "resize-sw",
  SOUTH_EAST = "resize-se",
}

@Component
export default class StreamIframe extends Vue {
  $enums = {
    ResizeDirection,
  };

  $refs!: {
    "stream-container": HTMLElement;
    "iframe-container": HTMLElement;
  };
  @Prop({ required: true }) url!: string;

  showIframe = true;

  x = DRAGGING_MARGIN_X;
  y = DRAGGING_MARGIN_Y;
  width = MIN_WIDTH;

  collapsed = false;
  transitioning = false;

  dragState: MouseActionState = {
    active: false,
    offset: { x: 0, y: 0 },
    listeners: {},
    type: MouseActionType.DRAG,
  };

  resizeState: MouseActionState = {
    active: false,
    offset: { x: 0, y: 0 },
    listeners: {},
    type: MouseActionType.RESIZE,
  };

  resizeDirection: ResizeDirection = ResizeDirection.SOUTH;

  mounted(): void {
    this.width = window.innerWidth * 0.33;

    window.addEventListener("resize", this.onWindowResize);
  }

  beforeDestroy(): void {
    window.removeEventListener("resize", this.onWindowResize);
    StreamIframe.removeAllMouseActionListeners(this.dragState);
    StreamIframe.removeAllMouseActionListeners(this.resizeState);
  }

  onWindowResize(): void {
    this.updatePosition(this.x, this.y, 0, 0);
    this.$nextTick(() =>
      this.updateSize(ResizeDirection.EAST, this.x + this.width, this.y)
    );
  }

  get height(): number {
    return this.width / ASPECT_RATIO;
  }

  refreshStream(event: Event): void {
    event.preventDefault();
    this.showIframe = false;
    this.$nextTick(() => this.showIframe = true);
  }

  toggleCollapsed(event: Event): void {
    event.preventDefault();
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      // Check if container height still fits.
    }
  }

  updateTransitioning(transitioning: boolean): void {
    this.transitioning = transitioning;
  }

  startDragging(event: MouseEvent): void {
    this.startMouseAction(this.dragState, event);
  }

  stopDragging(event: MouseEvent): void {
    this.stopMouseAction(this.dragState, event);
  }

  startResizing(event: MouseEvent, direction: ResizeDirection): void {
    this.resizeDirection = direction;
    this.startMouseAction(this.resizeState, event);
  }

  startMouseAction(state: MouseActionState, event: MouseEvent): void {
    event.preventDefault();

    state.offset.x = event.clientX - this.x;
    state.offset.y = event.clientY - this.y;

    state.active = true;

    this.updateIframesPointerEvents();

    StreamIframe.addMouseActionListener(state, "mouseup", (event: Event) => {
      this.stopMouseAction(state, event);
    });

    StreamIframe.addMouseActionListener(state, "mousemove", (event: Event) => {
      this.updateMouseAction(state, event);
    });
  }

  stopMouseAction(state: MouseActionState, event: Event): void {
    event.preventDefault();

    state.active = false;
    this.updateIframesPointerEvents();
    StreamIframe.removeAllMouseActionListeners(state);
  }

  updateMouseAction(state: MouseActionState, event: Event): void {
    event.preventDefault();
    if (!(event instanceof MouseEvent)) {
      throw new Error("Unexpected event: " + event);
    }

    const type = state.type;

    switch (type) {
      case MouseActionType.DRAG:
        return this.updatePosition(
          event.clientX,
          event.clientY,
          state.offset.x,
          state.offset.y
        );

      case MouseActionType.RESIZE:
        return this.updateSize(
          this.resizeDirection,
          event.clientX,
          event.clientY
        );
    }

    function checkExhaustive(type: never): void {
      throw new Error("Unhandled type (add to switch above): " + type);
    }

    return checkExhaustive(type);
  }

  static addMouseActionListener(
    state: MouseActionState,
    name: string,
    listener: EventListener
  ): void {
    if (state.listeners[name]) {
      StreamIframe.removeMouseActionListener(state, name);
    }
    document.addEventListener(name, listener);
    state.listeners[name] = listener;
  }

  static removeAllMouseActionListeners(state: MouseActionState): void {
    for (const name of Object.keys(state.listeners)) {
      StreamIframe.removeMouseActionListener(state, name);
    }
  }

  static removeMouseActionListener(
    state: MouseActionState,
    name: string
  ): void {
    const listener = state.listeners[name];
    document.removeEventListener(name, listener);
    delete state.listeners[name];
  }

  updateIframesPointerEvents(): void {
    const allow = !this.dragState.active && !this.resizeState.active;

    // TODO: Find a better way as this works on global state.
    for (const iframe of document.getElementsByTagName("iframe")) {
      iframe.style.pointerEvents = allow ? "auto" : "none";
    }
  }

  updatePosition(x: number, y: number, offsetX: number, offsetY: number): void {
    const iframeContainer = this.$refs["stream-container"];
    const rect = iframeContainer.getBoundingClientRect();

    const maxBottom = window.innerHeight - DRAGGING_MARGIN_Y;
    const maxRight = window.innerWidth - DRAGGING_MARGIN_X;

    const maxTop = maxBottom - rect.height;
    const maxLeft = maxRight - rect.width;

    this.x = Math.max(DRAGGING_MARGIN_X, Math.min(x - offsetX, maxLeft));
    this.y = Math.max(DRAGGING_MARGIN_Y, Math.min(y - offsetY, maxTop));
  }

  updateSize(direction: ResizeDirection, x: number, y: number): void {
    const iframeContainer = this.$refs["iframe-container"];
    const rect = iframeContainer.getBoundingClientRect();

    const minLeft = DRAGGING_MARGIN_X;
    const maxBottom = window.innerHeight - DRAGGING_MARGIN_Y;
    const maxRight = window.innerWidth - DRAGGING_MARGIN_X;

    const maxHeight = maxBottom - rect.top;
    const maxWidth = Math.min(maxRight - rect.left, maxHeight * ASPECT_RATIO);

    const calcResizeLeft = (): { width: number; x: number } => {
      const newX = Math.max(minLeft, x);
      const dx = this.x - newX;

      const newWidth = Math.max(MIN_WIDTH, this.width + dx);
      const dw = newWidth - this.width;

      return {
        width: newWidth,
        x: dw === dx ? newX : this.x - dw,
      };
    };

    const calcResizeRight = (): { width: number } => {
      return {
        width: Math.max(MIN_WIDTH, Math.min(x - this.x, maxWidth)),
      };
    };

    const calcResizeDown = (): { width: number; x: number } => {
      const height = Math.max(MIN_HEIGHT, Math.min(y - this.y, maxHeight));
      const width = Math.min(maxWidth, height * ASPECT_RATIO);
      const dw = width - this.width;
      return {
        width: width,
        x: Math.max(DRAGGING_MARGIN_X, this.x - dw / 2),
      };
    };

    switch (direction) {
      case ResizeDirection.WEST: {
        const { width, x } = calcResizeLeft();
        this.width = width;
        this.x = x;
        return;
      }

      case ResizeDirection.EAST: {
        this.width = calcResizeRight().width;
        return;
      }

      case ResizeDirection.SOUTH: {
        const { width, x } = calcResizeDown();
        this.width = width;
        this.x = x;
        return;
      }

      case ResizeDirection.SOUTH_WEST: {
        const { width: widthLeft, x: xLeft } = calcResizeLeft();
        const { width: widthDown } = calcResizeDown();

        if (widthLeft >= widthDown) {
          this.width = widthLeft;
          this.x = xLeft;
        } else {
          const dw = this.width - widthDown;
          if (this.x + dw < DRAGGING_MARGIN_X) {
            const dx = this.x - DRAGGING_MARGIN_X;
            this.width = this.width + dx;
            this.x = DRAGGING_MARGIN_X;
          } else {
            this.width = widthDown;
            this.x = this.x + dw;
          }
        }
        return;
      }

      case ResizeDirection.SOUTH_EAST: {
        const { width: widthRight } = calcResizeRight();
        const { width: widthDown } = calcResizeDown();

        this.width = Math.max(widthRight, widthDown);
        return;
      }
    }

    function checkExhaustive(direction: never): void {
      throw new Error(
        "Unhandled direction (add to switch above): " + direction
      );
    }

    checkExhaustive(direction);
  }
}
</script>

<style scoped lang="scss">
@import "../variables";
@import "../mixins";

.stream-container {
  position: absolute;

  .stream-header {
    padding: $stream-iframe-header-padding;

    border: $stream-iframe-border;
    border-top-left-radius: $stream-iframe-header-border-radius;
    border-top-right-radius: $stream-iframe-header-border-radius;

    background-color: $stream-iframe-background-color;

    text-align: right;

    cursor: grab;
    user-select: none;

    & > * {
      display: inline-block;

      margin: $stream-iframe-header-item-margin;

      font-size: $stream-iframe-header-item-font-size;
      line-height: $stream-iframe-header-item-line-height;

      color: $stream-iframe-header-item-color;
    }

    .text {
      float: left;
    }

    .icon {
      cursor: pointer;
    }
  }

  .stream-iframe-container {
    @include apsect-ratio(
      $stream-iframe-aspect-ratio-w,
      $stream-iframe-aspect-ratio-h
    );

    background-color: $stream-iframe-background-color;
    border: $stream-iframe-border;
    border-top: none;

    iframe {
      border: none;
    }
  }

  &.dragging *,
  &.resizing *,
  &.transitioning * {
    border-color: $stream-iframe-active-border-color;
  }

  .fade-height-enter-active,
  .fade-height-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .fade-height-enter,
  .fade-height-leave-to {
    overflow: hidden !important;
    padding-top: 0 !important;
  }

  .spinner {
    position: absolute;
    top: 50%;
    width: 100%;

    font-size: 7.5em;

    height: 0;
    line-height: 0;
  }

  .resize-container {
    pointer-events: none;

    .resize-area {
      pointer-events: all;

      position: absolute;

      &.resize-w,
      &.resize-e {
        top: 0;
        bottom: $stream-iframe-resize-area-overlap;
        width: $stream-iframe-resize-area-size;
      }

      &.resize-w {
        left: -$stream-iframe-resize-area-overlap;
        cursor: w-resize;
      }

      &.resize-e {
        right: -$stream-iframe-resize-area-overlap;
        cursor: e-resize;
      }

      &.resize-s {
        left: $stream-iframe-resize-area-overlap;
        right: $stream-iframe-resize-area-overlap;
        bottom: -$stream-iframe-resize-area-overlap;
        height: $stream-iframe-resize-area-size;
        cursor: s-resize;
      }

      &.resize-sw,
      &.resize-se {
        bottom: -$stream-iframe-resize-area-overlap;

        width: $stream-iframe-resize-area-size;
        height: $stream-iframe-resize-area-size;
      }

      &.resize-sw {
        left: -$stream-iframe-resize-area-overlap;
        cursor: sw-resize;
      }

      &.resize-se {
        right: -$stream-iframe-resize-area-overlap;
        cursor: se-resize;
      }
    }
  }
}
</style>
