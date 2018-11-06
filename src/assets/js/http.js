import axios from "axios";
import qs from "qs";
import store from '../../store';
import vueRouter from '../../router';
import utils from './utils';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;  //请求携带cookie
axios.defaults.crossDomain = true;  //请求携带额外数据(不包含cookie)
axios.defaults.baseURL = store.state.api_url;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method == 'post' && config.url.indexOf('uploadKYC') == -1 && config.url.indexOf('authPassport') == -1 ) {
      config.data = qs.stringify({
        ...config.data,
        lang: store.state.lang,
        uid: utils.generateUUID(),
      });
    }else if(config.method == 'get'){
      config.params = {
        ...config.params,
        lang: store.state.lang,
        uid: utils.generateUUID(),
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    let router = ['/appDownload/Android','/appDownload/iOS','/login','/register','/forgetlogin','/','/guess'];
    if (!response.data.success) {
      if (response.data.error.code == '8888') {
        vueRouter.push({ path: '/upgrade'})
      }else if (response.data.error.code == '2000') {
        // Message.destroy()
        // Message.warning(response.data.error.message)
        store.commit('isLogin', false)
        store.commit('setInfo', {})
        if (!router.includes(store.state.toPath)) {
          vueRouter.push({ path: '/'})
        }
      }else if (response.data.error.code == '2003') {
        store.commit('isLogin', false)
        store.commit('setInfo', {})
        if (!router.includes(store.state.toPath)) {
          vueRouter.push({ path: '/'})
        }
      }
    }
    return response;
  },
  error => {
    // Message.destroy()
    // Message.warning('Network Error')
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {},version = 'v1') {
  let api_url = `/${store.getters.filterLang}/${version}${url}`;
  return new Promise((resolve, reject) => {
    axios.get(api_url, {
      params: params
    }).then(response => {
      if (!response.data.success) {
      resolve(response.data.error);
      }else {
        resolve(response.data.payload);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {},version = 'v1') {
  let api_url = `/${store.getters.filterLang}/${version}${url}`;
  return new Promise((resolve, reject) => {
    axios.post(api_url, data).then(
      response => {
        if (!response.data.success) {
          resolve(response.data.error);
        } else {
          resolve(response.data.payload);
        }
      },
      err => {
        reject(err);
      }
    );
  });
}
