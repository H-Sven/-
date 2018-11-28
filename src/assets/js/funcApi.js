import { post, get } from "./http";
import utils from './utils';
import store from '../../store'
export default {
  /**
   * 并行请求时，需要一个状态为resolve的函数
   */
  isResolve(){
    return new Promise((resolve,reject)=>{
      resolve(true)
    })
  },
  /**
   * 未登录时获取验证码
   * myAccount:账号  type:获取类型
   */
  publicGetCode(type,myAccount){
    let url = utils.isPhone(myAccount) ? '/common/sendSMSCode' :'/common/sendEmailCode';
    let accountKey = utils.isPhone(myAccount) ? {codeType:type,phone : myAccount} : {codeType:type,email : myAccount};
    return new Promise((resolve,reject)=>{
      post(url,accountKey).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 登录之后获取验证码
   * regType:注册类型  type:获取类型
   */
  isLoginPublicGetCode(regType,type){
    let url = regType == 1  ? '/common/sendSMSCode' :'/common/sendEmailCode';
    return new Promise((resolve,reject)=>{
      post(url,{
        codeType:type
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 验证验证码
   *  myCode:验证码 type:验证类型 myAccount:账号
   */
  publicCheckCode(myCode,type,myAccount){
    return new Promise((resolve,reject) => {
      post('/common/checkCode',{
        code:myCode,
        codeType:type,
        account:myAccount
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 验证账号是否绑定GA
   * myAccount:账号
   */
  publicIsBindGa(myAccount){
    return new Promise((resolve,reject)=>{
      get('/user/isBindGa',{
        account:myAccount,
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 验证GA
   * gaCode:谷歌码，type:类型
   */
  publicVerifyGA(gaCode,type,myAccount){
    return new Promise((resolve,reject) => {
      post('/common/verifyGA',{
        gaCode:gaCode,
        captchaType:type,
        account:myAccount
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  // 卖出检查
  publicCheckSell(adId){
    return new Promise((resolve, reject) => {
      post('/trade/checkSell',{ adId }).then(res=>{
        if (!res.code) {
          resolve(res)
        }else {
          reject(res)
        }
      })
    });
  },
  // 买入检查
  publicCheckBuy(adId){
    return new Promise((resolve, reject) => {
      post('/trade/checkBuy',{ adId }).then(res=>{
        if (!res.code) {
          resolve(res)
        }else {
          reject(res)
        }
      })
    });
  },
  /**
   * 注册接口
   * account: 账号 password:密码 registerType:注册类型 code:验证码 yqCode:邀请码
   */
  publicRegister(account,password,registerType,code,yqCode){
    return new Promise((resolve,reject)=>{
      post('/user/register',{
        account: account,
        password:password,
        registerType:registerType,
        code:code,
        inviteCode:yqCode,
        autoLogin:1,
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        }else{
          reject(res)
        }
      })
    })
  },
  /**
   * 验证邀请码接口
   * yqCode:邀请码
   */
  publicCheckInviteCode(yqCode){
    return new Promise((resolve,reject)=>{
      post('/user/checkInviteCode',{
        inviteCode:yqCode,
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        }else{
          reject(res)
        }
      })
    })
  },
  /** 
   * 退出登录
   */
  publicLogout(){
    return new Promise((resolve,reject)=>{
      post('/user/logout',{}).then(res=>{
        if (!res.code) {
          resolve(res)
          store.commit('isLogin',false)
          store.commit('setInfo',{})
          utils.deleteCookie();
        }else{
          reject(res)
        }
      })
    })
  }
}

