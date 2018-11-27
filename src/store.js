import Vue from 'vue'
import Vuex from 'vuex'
console.log(`当前环境:  ${process.env.NODE_ENV} --- ${process.env.VUE_APP_API}`);
Vue.use(Vuex)
export default new Vuex.Store({
  // 定义状态
  state: {
    login: JSON.parse(localStorage.getItem("isLogin")) || false,
    myInfo: JSON.parse(localStorage.getItem('myInfo')) || {},
    showHeader: false,
    showFooter: false,
    toPath:localStorage.getItem('toPath') || '',
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
    // 改变headerfooter状态
    showHeaderAndfooter(state, status) {
      state.showHeader = status;
      state.showFooter = status;
    },
    setToPath(state, path) {
      localStorage.setItem('toPath', path);
      state.toPath = path;
    },
  },
  getters: {
    
  },
})
