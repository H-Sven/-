<template>
  <div class="my_header">
    <div class="title">聚合支付商户平台</div>
    <div class="account">
      <el-dropdown trigger="hover">
        <div class="el-dropdown-link info_box">
          <i class="iconfont icon-touxiang1"></i>
          <ul class="account_info">
            <li>深圳神羽网络</li>
            <li>账户ID：123456</li>
          </ul>
        </div>
        <el-dropdown-menu slot="dropdown" class="account_dropdown">
          <el-dropdown-item command="a">账户中心</el-dropdown-item>
          <el-dropdown-item command="b">推出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
   
<script>
   
export default {
  name : 'my_header',
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
<style lang='less'>
@import url("../assets/css/colorConfig.less");
.my_header {
  height: 60px;
  // width: 100%;
  background-color: @headerBg;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: @white;
  .title {
    font-size: 20px;
    font-weight: 600;
  }
  .account {
    color: @white;
    .el-dropdown {
      color: @white;
    }
    .info_box {
      display: flex;
      align-items: center;
      .icon-touxiang1 {
        font-size: 34px;
        margin-right: 10px;
      }
      .account_info {
        // display: flex;
        // align-items: center;
      }
    }
  }
}
.account_dropdown {
  min-width: 150px;
}
</style>