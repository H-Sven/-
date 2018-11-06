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
    otc_url:document.domain.includes('www.xxx.com') ? 'https://otc.xxx.com/#' : document.domain.includes('p-www.xxx.cc') ? 'https://p-otc.xxx.cc/#' : 'https://otc.xxx.cc/#',
    trans_url: document.domain.includes('www.xxx.com') ? 'https://trans.xxx.com/#' : document.domain.includes('p-www.xxx.cc') ? 'https://p-trans.xxx.cc/#' : 'https://trans.xxx.cc/#',
    www_url: document.domain.includes('www.xxx.com') ? 'https://www.xxx.com/#' : document.domain.includes('p-www.xxx.cc') ? 'https://p-www.xxx.cc/#' : 'https://www.xxx.cc/#',
    link_url: document.domain.includes('www.xxx.com') ? 'https://www.xxx.com/' : document.domain.includes('p-www.xxx.cc') ? 'https://p-www.xxx.cc/' : 'https://www.xxx.cc/',
    api_url: !document.domain.includes('www.xxx.com') ? 'https://api1.xxx.com/w' : document.domain.includes('p-www.xxx.cc') ? 'https://p-api1.xxx.cc/w' : 'https://go-api.xxx.cc/w', //接口主地址
    wss_push: !document.domain.includes('www.xxx.com') ? 'wss://ws.xxx.com/push' : document.domain.includes('p-www.xxx.cc') ? 'wss://ws.xxx.com/push' : 'wss://api-ws.xxx.cc/push', //websocketPush地址
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
    white_paper(state){
      return `111`;//白皮书地址
    },
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
