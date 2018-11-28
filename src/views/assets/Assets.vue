<template>
  <div class="assets">
    <div class="assets_title">
      <h4 v-if="$route.path == '/assets/index'">我的资产</h4>
      <el-breadcrumb separator="/" v-if="$route.path != '/assets/index'">
        <el-breadcrumb-item :to="{ path: '/home/assets/index' }">我的资产</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/assets/record' }">{{routeName}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="routeName2">{{routeName2}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="record" v-if="$route.path == '/home/assets/withdrawal'" @click="routeLink('/home/assets/record')">提现记录</div>
    </div>
    <router-view class="assets_view_box" v-on:sendRouteName="sendRouteName"></router-view>
  </div>
</template>
   
<script>
export default {
  name : 'Assets',
  data() {
    return {
      routeName:'',
      routeName2:'',
      routePath:'',
    }
  },
  created() {
    
  },
  methods: {
    routeLink(path){
      this.$router.push({ path: path, query: {} })
    },
    sendRouteName(state){
      this.routeName = state.routeName;
      this.routeName2 = state.routeName2;
      this.routePath = state.routePath;
      // document.title = `${this.routeName} - Becent`;
    },
  }
}
</script>
<style lang='less'>
@import url("../../assets/css/colorConfig.less");
.assets {
  .assets_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid @titleBorder;
    padding-bottom: 10px;
    color: @textColor3;
    .el-breadcrumb {
      font-size: 18px;
      color: @textColor3;
    }
    .record {
      font-size: 16px;
      cursor: pointer;
      color: @textColor;
    }
  }
  .assets_view_box {
    min-height: 74%;
  }
}
</style>