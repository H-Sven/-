import Vue from "vue";
import './plugins/element.js'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import uTils from "./assets/js/utils";
import { post, get} from "./assets/js/http";

Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$utils = uTils;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
