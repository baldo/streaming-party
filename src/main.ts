import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins";
import "./components/global";

Vue.config.productionTip = false;

console.log(`
*** welcome to the streaming party ***

version:\t${process.env.VUE_APP_VERSION}
git hash:\t${process.env.VUE_APP_GIT_HASH}
\n`);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
