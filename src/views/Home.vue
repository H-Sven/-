<template>
  <div class="home">
    <el-menu :default-active="select" @select="handleSelect" class="el-menu-vertical-demo" :collapse="false">
      <el-menu-item index="/index">
        <i class="iconfont icon-index"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/order">
        <i class="iconfont icon-dingdanxuanzhong"></i>
        <span slot="title">订单</span>
      </el-menu-item>
      <el-menu-item index="/assets/index">
        <i class="iconfont icon-zichan2"></i>
        <span slot="title">资产</span>
      </el-menu-item>
      <el-menu-item index="/account/index">
        <i class="iconfont icon-touxiang"></i>
        <span slot="title">账户</span>
      </el-menu-item>
    </el-menu>
    <router-view  class="view_box"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data(){
    return {
      select:'/index',
    }
  },
  created() {
    this.select = this.$store.state.toPath || '/index';
    // this.$router.push({ path: this.select, query: {} })
  },
  mounted () {
    // this.$get('/user/getUserInfo',{}).then(res=>{
    //   if (!res.code) {
    //     console.log(res);
    //   }else{
    //     console.log(res.code);
    //   }
    // })
  },
  methods:{
    handleSelect(index){
      this.$store.commit('setToPath',index);
      this.$router.push({ path: index, query: {} })
    }
  }
};
</script>
<style lang="less">
@import url("../assets/css/colorConfig.less");
.home {
  width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  .el-menu {
    width: 120px;
    background-color:@white;
    .el-menu-item {
      // color: @white;
      .iconfont {
        line-height: normal;
        font-size: 26px;
        margin-right: 10px;
      }
    }
    .el-menu-item.is-active::after {
      content: '';
      display:inline-block;
      width: 4px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: @textColor;
    }
  }
  .view_box {
    flex: 1;
    padding: 60px;
    padding-top: 20px;
    padding-bottom: 0;
  }
}
</style>
