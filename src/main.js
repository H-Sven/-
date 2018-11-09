import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { post, get} from "./assets/js/http";
import uTils from "./assets/js/utils";
import './plugins/element.js'

Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$utils = uTils;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
