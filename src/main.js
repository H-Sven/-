import Vue from "vue";
import './plugins/element.js'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/commons.less";
import uTils from "./assets/js/utils";
import { post, get} from "./assets/js/http";
import VeLine from 'v-charts/lib/line.common';
import 'v-charts/lib/style.css'
Vue.component(VeLine.name, VeLine)
import countTo from 'vue-count-to';
Vue.component('countTo', countTo);

Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$utils = uTils;

Vue.filter('formatDate', function (v, format) {
  return uTils.formatDate(v, format);
});
// 禁止输入指令
Vue.directive('enterNumber', {//只能输入正整数
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
              e.preventDefault();
          }else{
              e.returnValue = false;
          }                            
      }
    });
  }
});
Vue.directive('enterNumber2', {//只能输入正数(包括小数)
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(charcode == 46){
        if(el.value.includes('.')){
          e.preventDefault();
        }
        return;
      }else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
            e.returnValue = false;
        }
      }
    });
  }
});
Vue.filter('comdify', function (num, format) {//数字千分位过滤
  return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
        return $1 + ",";
    });
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
