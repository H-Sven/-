<template>
  <div class="verification">
    <!-- 安全验证 -->
    <el-dialog class="now_model Verification_model" center  title="安全验证" :visible.sync="verification" :before-close="handleClose" width="450px">
      <div class="model_ipt">
        <div class="ipt_code_box">
          <el-input v-model="code" type="number" placeholder="请输入验证码" oninput="if(value.length>6)value=value.slice(0,6)"></el-input>
          <el-button class="code_btn" type="text" @click="getCode" :disabled="codeDisabled">{{codeState}}</el-button>
        </div>
        <div class="sell_tips">温馨提示：通过安全验证即可成功下单，不可取消订单。</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
   
<script>
   
export default {
  name : 'verification',
  props: ['loading','codeType','btnText'],
  data() {
    return {
      verification:true,
      code:'', //短信邮箱验证码
      time: 0,
      timer: null,
      modelCodeError:'',
      codeDisabled:false,
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
  },
  methods: {
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
    // 确定
    clickConfirm(){
      if (this.loading ||　!this.code) {
        return; 
      }else{
        this.loading = true;
        this.$emit('childEventVerifi', { status: true,code:this.code} );
      }
    },
    // 取消验证
    handleClose(){
      this.verification = false;
      // this.code = '';
      this.$emit('childEventVerifi', { status: this.verification} );
    },
  }
}
</script>
<style lang='less'>
@import url("../assets/css/colorConfig.less");
  .Verification_model {
    .model_ipt {
      padding-top: 10px;
      .ipt_code_box {
        width: 100%;
        margin: 0 auto;
        height: 42px;
        line-height: 42px;
        position: relative;
        .code_btn {
          position: absolute;
          right: 10px;
          top: 0;
        }
      }
      .sell_tips {
        width: 90%;
        margin: 0 auto;
        padding-top: 30px;
      }
    }
    .el-dialog__footer {
      padding: 0;
      padding-bottom: 20px;
    }
    .el-button--primary {
      width: 90%;
    }
  }
</style>