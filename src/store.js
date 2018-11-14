import Vue from 'vue'
import Vuex from 'vuex'
console.log(`当前环境:  ${process.env.NODE_ENV} --- ${process.env.VUE_APP_API}`);
Vue.use(Vuex)
const navigatorlanguage = ['zh','ko'];
export default new Vuex.Store({
  // 定义状态
  state: {
    login: JSON.parse(localStorage.getItem("isLogin")) || false,
    lang: localStorage.getItem("changeLang") || (!navigatorlanguage.includes(navigator.language.substr(0, 2)) ? 'en' : navigator.language.substr(0, 2)), // 语言标识
    myInfo: JSON.parse(localStorage.getItem('myInfo')) || {},
    showHeader: false,
    showFooter: false,
    toPath:'',
    api_url: !document.domain.includes('www.xxx.com') ? 'https://api1.xxx.com/w' : document.domain.includes('p-www.xxx.cc') ? 'https://p-api1.xxx.cc/w' : 'https://go-api.xxx.cc/w', //接口主地址
  },
  //修改状态
  mutations:{
    isLogin(state,type){
      localStorage.setItem('isLogin', type);
      state.login = type;
    },
    setInfo(state, info) {
      localStorage.setItem('myInfo', JSON.stringify(info));
      state.myInfo = info;
    },
    // 国际化
    changeLangEvent(state, type) {
      localStorage.setItem('changeLang', type);
      state.lang = type;
    },
    // 改变headerfooter状态
    showHeaderAndfooter(state, status) {
      state.showHeader = status;
      state.showFooter = status;
    },
    setToPath(state, path) {
      state.toPath = path;
    },
  },
  getters: {
    filterLang(state){
      switch(state.lang){
        case 'zh': return 'zh-cn';
        break;
        case 'en': return 'en-us';
        break;
        case 'ko': return 'ko';
        break;
      }
    }
  },
})
