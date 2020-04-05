import { PluginObject } from "vue";

/**
 * Allows usage of TypeScript enums in Vue.js templates:
 *
 * <pre><code>
 *   enum MyEnum = { ... }
 *
 *   class Component extens Vue {
 *     $enums = {
 *       MyEnum
 *     }
 *
 *     ...
 *   }
 * </code></pre>
 */
const EnumsPlugin: PluginObject<object> = {
  install(vue) {
    vue.mixin({
      created(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const $enums = this.$data?.$enums;
        if ($enums) {
          for (const key of Object.keys($enums)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this[key] = Object.freeze($enums[key]);
          }
        }
      }
    });
  }
};

export default EnumsPlugin;
