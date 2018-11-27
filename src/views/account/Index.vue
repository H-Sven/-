<template>
  <div class="account_index">
    <div class="account_inner_box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账户与安全" name="security">
          <div class="account_row">
            <div class="row_box">
              <div class="title">账户名</div>
              <div class="content">深圳神羽网络</div>
              <div class="row_btn hover">修改</div>
            </div>
            <div class="row_box">
              <div class="title">账户ID</div>
              <div class="content">365987</div>
            </div>
            <div class="row_box">
              <div class="title">登录密码</div>
              <div class="content">********</div>
              <div class="row_btn hover">修改</div>
            </div>
            <div class="row_box">
              <div class="title">邮箱绑定</div>
              <div class="content">13535379563@163.com</div>
              <div class="row_btn hover">修改</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收款方式" name="payment">
          <div class="payment_box">
            <div class="tips">请务必使用您本人的实名账户，开启的收款方式将在交易时向您汇款，只能同时开启一种收款方式。</div>
            <bind-payment></bind-payment>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
   
<script>
import BindPayment from '../../components/BindPayment'
export default {
  name : 'accountIndex',
  components:{
    BindPayment,
  },
  data() {
    return {
      activeName:'security'
    }
  },
  created() {
    
  },
  methods: {
    handleClick(){

    }
  }
}
</script>
<style lang='less'>
@import url("../../assets/css/colorConfig.less");
.account_index {
  .account_inner_box {
    background-color: @white;
    padding: 30px 0;
    margin-top: 30px;
    box-shadow: 0px 4px 8px 0px rgba(133, 133, 133, 0.05);
    border-radius: 4px;
    .el-tabs {
      .el-tabs__nav {
        padding-left: 30px;
        .el-tabs__active-bar {
          left: 30px;
        }
      }
    }
    .account_row {
      padding: 0 30px;
      .row_box {
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid @lineColor;
        .title {
          width: 130px;
        }
        .content {
          flex: 1;
        }
        .row_btn {
          cursor: pointer;
          color: @textColor;
          width: 100px;
        }
      }
    }
    .payment_box {
      padding: 0 30px;
      .tips {
        height: 50px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>