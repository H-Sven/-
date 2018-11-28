import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  routes: [
    {path: '*',name: '',redirect: '/home'},
    // 账户资料模块
    {
      path: '/home',
      name: '首页',
      component:() =>import(/* webpackChunkName: "3" */ "./views/Home.vue"),
      children: [
        {path: 'index',name: '页面首页',component: () =>import(/* webpackChunkName: "3" */ "./views/Index.vue")},
        {path: 'order',name: '订单记录',component: () =>import(/* webpackChunkName: "3" */ "./views/Order.vue")},
        {
          path: 'assets',
          name: '资产',
          component: () =>import(/* webpackChunkName: "3" */ "./views/assets/Assets.vue"),
          children:[
            {path: 'index',name: '资产首页',component: () =>import(/* webpackChunkName: "3" */ "./views/assets/Index.vue")},
            {path: 'withdrawal',name: '提现',component: () =>import(/* webpackChunkName: "3" */ "./views/assets/Withdrawal.vue")},
            {path: 'record',name: '提现记录',component: () =>import(/* webpackChunkName: "3" */ "./views/assets/Record.vue")},
            {path: 'details',name: '账单明细',component: () =>import(/* webpackChunkName: "3" */ "./views/assets/Details.vue")},
            {path: 'recordDetails',name: '提现详情',component: () =>import(/* webpackChunkName: "3" */ "./views/assets/RecordDetails.vue")},
          ]
        },
        {
          path: 'account',
          name: '账户中心',
          component: () =>import(/* webpackChunkName: "3" */ "./views/account/Account.vue"),
          children:[
            {path: 'index',name: '账户中心首页',component: () =>import(/* webpackChunkName: "3" */ "./views/account/Index.vue")},
          ]
        },
      ]
    },
  ]
});

export default router
