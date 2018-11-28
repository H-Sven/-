<template>
  <div class="account_index">
    <div class="account_inner_box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="账户与安全" name="security">
          <div class="account_row">
            <div class="row_box">
              <div class="title">账户名</div>
              <div class="content">深圳神羽网络</div>
              <div class="row_btn hover" @click="changeName">修改</div>
            </div>
            <div class="row_box">
              <div class="title">账户ID</div>
              <div class="content">365987</div>
            </div>
            <div class="row_box">
              <div class="title">登录密码</div>
              <div class="content">********</div>
              <div class="row_btn hover" @click="changePassword">修改</div>
            </div>
            <div class="row_box">
              <div class="title">邮箱绑定</div>
              <div class="content">13535379563@163.com</div>
              <div class="row_btn hover" @click="changeEmail">修改</div>
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
    <!-- 修改账户名 -->
    <el-dialog center  title="修改账户名" :visible.sync="nameDialog" :before-close="handleClose" width="450px">
      <el-input v-model="newName" placeholder="请输入新的账户名"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nameConfirm">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 修改登录密码 -->
    <el-dialog center  title="修改登录密码" :visible.sync="passwordDialog" :before-close="handleClose" width="450px">
      <div class="dialog_box">
        <div class="pwd_title">当前密码</div>
        <el-input v-model="nowPassword" placeholder="请输入当前密码"></el-input>
      </div>
      <div class="dialog_box">
        <div class="pwd_title">新密码</div>
        <el-input v-model="newPassword" placeholder="请输入新密码"></el-input>
      </div>
      <div class="dialog_box">
        <div class="pwd_title">确认密码</div>
        <el-input v-model="confirmPassword" placeholder="请再次输入"></el-input>
      </div>
      <div class="dialog_box">
        <div class="pwd_title">验证码</div>
        <div class="code_box">
          <el-input v-model="code" type="number" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="请输入验证码"></el-input>
          <el-button class="code_btn" type="text" @click="getCode(1)" :disabled="codeDisabled">{{codeState}}</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="passwordConfirm">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 修改邮箱 -->
    <el-dialog center  title="修改邮箱" :visible.sync="emailDialog" :before-close="handleClose" width="450px">
      <div class="dialog_box">
        <div class="pwd_title">邮箱验证</div>
        <div class="code_box">
          <el-input v-model="nowCode" type="number" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="请输入当前的验证码"></el-input>
          <el-button class="code_btn" type="text" @click="getCodeNow" :disabled="nowCodeDisabled">{{nowCodeState}}</el-button>
        </div>
      </div>
      <div class="dialog_box">
        <div class="pwd_title">新的邮箱</div>
        <el-input v-model="newPassword" placeholder="请输入新的邮箱"></el-input>
      </div>
      <div class="dialog_box">
        <div class="pwd_title">新邮箱验证</div>
        <div class="code_box">
          <el-input v-model="newCode" type="number" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="请输入新的邮箱"></el-input>
          <el-button class="code_btn" type="text" @click="getCodeNew" :disabled="newCodeDisabled">{{newCodeState}}</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="emailConfirm">提 交</el-button>
      </span>
    </el-dialog>
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
      activeName:'security',
      nameDialog:false,
      newName:'深圳神羽网络',
      passwordDialog:false,
      nowPassword:'',
      newPassword:'',
      confirmPassword:'',
      codeDisabled:false,
      code:'',
      time: 0,
      timer: null,
      emailDialog:false,
      // 邮箱验证01
      nowCode:'',
      nowTime: 0,
      nowTimer: null,
      nowCodeDisabled:false,
      // 邮箱验证02
      newCode:'',
      newTime: 0,
      newTimer: null,
      newCodeDisabled:false,
    }
  },
  created() {
    
  },
  computed:{
    codeState: function() {
      if (this.time <= 0) {
        this.codeDisabled = false;
        return '获取验证码';
      } else {
        this.codeDisabled = true;
        var time = this.time;
        time = String(time);
        time = time.length < 2 ? "0" + time : time;
        return `重新获取${time}`
      }
    },
    // 邮箱验证01
    nowCodeState: function() {
      if (this.nowTime <= 0) {
        this.nowCodeDisabled = false;
        return '获取验证码';
      } else {
        this.nowCodeDisabled = true;
        var time = this.nowTime;
        time = String(time);
        time = time.length < 2 ? "0" + time : time;
        return `重新获取${time}`
      }
    },
    // 邮箱验证02
    newCodeState: function() {
      if (this.newTime <= 0) {
        this.newCodeDisabled = false;
        return '获取验证码';
      } else {
        this.newCodeDisabled = true;
        var time = this.newTime;
        time = String(time);
        time = time.length < 2 ? "0" + time : time;
        return `重新获取${time}`
      }
    },
  },
  methods: {
    // 修改账户名
    changeName(){
      this.nameDialog = true;
    },
    nameConfirm(){
      this.nameDialog = false;
    },
    // 修改登录密码
    changePassword(){
      this.passwordDialog = true;
    },
    passwordConfirm(){
      this.passwordDialog = false;
    },
    // 修改邮箱
    changeEmail(){
      this.emailDialog = true;
    },
    emailConfirm(){
      this.emailDialog = false;
    },
    // 获取验证码
    getCode(type){
      let that = this;
      if (that.time > 0 ) {
        return;
      }
      that.time = 60;
      that.timer = setInterval(function() {
        if (that.time == 0) {
          clearInterval(that.timer);
          return false;
        }
        that.time--;
      }, 1000);
      let api = this.$store.state.myInfo.regType == '1' ? '/common/sendSMSCode' : '/common/sendEmailCode';
      let code_type =  this.codeType;
      this.$funcApi.isLoginPublicGetCode(this.$store.state.myInfo.regType,code_type).then(res=>{}).catch(error=>{
        that.modelCodeError = error.message;
      })
    },
    // 验证邮箱
    getCodeNow(type){
      let that = this;
      if (that.nowTime > 0 ) {
        return;
      }
      that.nowTime = 60;
      that.nowTimer = setInterval(function() {
        if (that.nowTime == 0) {
          clearInterval(that.nowTimer);
          return false;
        }
        that.nowTime--;
      }, 1000);
      let api = this.$store.state.myInfo.regType == '1' ? '/common/sendSMSCode' : '/common/sendEmailCode';
      let code_type =  this.codeType;
      this.$funcApi.isLoginPublicGetCode(this.$store.state.myInfo.regType,code_type).then(res=>{}).catch(error=>{
        that.modelCodeError = error.message;
      })
    },
    getCodeNew(type){
      let that = this;
      if (that.newTime > 0 ) {
        return;
      }
      that.newTime = 60;
      that.newTimer = setInterval(function() {
        if (that.newTime == 0) {
          clearInterval(that.newTimer);
          return false;
        }
        that.newTime--;
      }, 1000);
      let api = this.$store.state.myInfo.regType == '1' ? '/common/sendSMSCode' : '/common/sendEmailCode';
      let code_type =  this.codeType;
      this.$funcApi.isLoginPublicGetCode(this.$store.state.myInfo.regType,code_type).then(res=>{}).catch(error=>{
        that.modelCodeError = error.message;
      })
    },
    handleClose(){
      this.nameDialog = false;
      this.passwordDialog = false;
      this.emailDialog = false;
    },
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
  .el-dialog__body {
    margin-top: 30px;
  }
  .el-button--primary {
    width: 100%;
  }
  .dialog_box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .pwd_title {
      width: 100px;
    }
    .code_box {
      width: 100%;
      position: relative;
      .code_btn {
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
  }
}
</style>