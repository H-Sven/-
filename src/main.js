import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeLine from 'v-charts/lib/line.common';
import { post, get} from "./assets/js/http";
import uTils from "./assets/js/utils";
Vue.component(VeLine.name, VeLine)

Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$utils = uTils;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
