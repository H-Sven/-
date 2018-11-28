<template>
  <div class="bind_payment">
    <div class="select_info">
      <div class="select_switch" v-for="(item, index) in myBankList" :key="index">
        <div class="left" @click="clickSwitch(index,item.id)">
          <el-switch class="class_switch" v-model="item.isEnable" ></el-switch>
          <div class="paytype_div" v-if="item.paymentType == 1">银行卡</div>
          <div class="paytype_div" v-if="item.paymentType == 2">支付宝</div>
          <div class="paytype_div" v-if="item.paymentType == 3">微信</div>
          <div class="class_bank" v-if="item.paymentType == 1"><span>{{item.name}}</span><span>{{item.cardNo}}</span><span>{{item.bankName}}</span><span>{{item.branchName}}</span></div>
          <div class="class_bank" v-if="item.paymentType != 1 "><span>{{item.name}}</span><span>{{item.payAccount}}</span></div>
        </div>
        <div class="delete hover" @click="clickDelete(item.id)"><i class="iconfont icon-shanchu"></i></div>
      </div>
      <div class="add_pay hover"><span  @click="addPay"><i class="iconfont icon-svg-"></i>&nbsp;添加收款方式</span></div>
    </div>
    <!-- 绑定收款方式 -->
    <div class="dialog_box">
      <el-dialog class="bank_model" title="添加收款方式" :visible.sync="modelPayAdd" width="550px" center :before-close="onCancel">
        <div class="model_content">
          <div class="model_add_box">
            <!-- 选择收款方式 -->
            <div class="ipt_select">
              <span class="title">收款方式</span>
              <el-select v-model="selectPay" class="select_div" @change="selectChange" placeholder="请选择收款方式">
                <el-option v-for="item in payList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- 绑定银行卡 -->
            <div v-if="selectPay == 1">
              <div class="ipt_select ipt_ipt">
                <span class="title">姓名</span>
                <input class="my_input input_ipt" v-model="payName" type="text" :placeholder="`请输入绑定账号姓名`" oninput="if(value.length>15)value=value.slice(0,15)"></input>
              </div>
              <div class="ipt_select ipt_ipt">
                <span class="title">开户银行</span>
                <input class="my_input input_ipt" v-model="bankName" type="text" :placeholder="`请输入开户银行`" oninput="if(value.length>15)value=value.slice(0,15)"></input>
              </div>
              <div class="ipt_select ipt_ipt">
                <span class="title">开户支行</span>
                <input class="my_input input_ipt" v-model="branchName" type="text" :placeholder="`请输入开户支行`" oninput="if(value.length>15)value=value.slice(0,15)"></input>
              </div>
              <div class="ipt_select ipt_ipt">
                <span class="title">银行卡账号</span>
                <input class="my_input input_ipt" v-model="bankCardNo" type="text" :placeholder="`请输入银行卡账号`" oninput="if(value.length>30)value=value.slice(0,30)"></input>
              </div>
            </div>
            <!-- 支付宝和微信 -->
            <div v-if="selectPay == 2 || selectPay == 3">
              <div class="ipt_select ipt_ipt">
                <span class="title">{{selectPay == 2 ? '支付宝' : '微信'}}</span>
                <input class="my_input input_ipt" v-model="alipay_wechat" type="text" :placeholder="selectPay == 2 ? '请输入支付宝账号' : '请输入微信账号'" oninput="if(value.length>50)value=value.slice(0,50)"></input>
              </div>
              <div class="ipt_select ipt_ipt">
                <span class="title">二维码</span>
                <el-upload 
                  drag
                  :multiple="false"
                  :action="`${$store.state.api_url}/${$store.getters.filterLang}/v1/user/uploadKYC`"
                  :before-upload="handleUpload1"
                  >
                  <i v-if="!file1" class="el-icon-upload"></i>
                  <div>
                      <div v-if="file1" class="file_img" :style="{backgroundImage:`url(${file1Img})`}"></div>
                      <!-- <Icon v-if="!file1" type="ios-cloud-upload"></Icon> -->
                      <p v-if="!file1">{{`请上传${selectPay == 2 ? '支付宝':'微信'}收款二维码图片(*.jpg / *.png / *.jpeg)`}}</p>
                  </div>
              </el-upload>
              </div>
            </div>
            <div class="ipt_select ipt_ipt" v-if="selectPay">
              <span class="title">验证码</span>
              <div class="code_box">
                <input class="my_input input_ipt code_ipt" @mousewheel.prevent @DOMMouseScroll.prevent @mousewheel.prevent @DOMMouseScroll.prevent v-model="code" step="0.0000000001" :placeholder="`请输入验证码`" v-enter-number2 type="number" oninput="if(value.length>6)value=value.slice(0,6)"></input>
                <div class="code_btn btn_hover" @click="getCode"  :class="{'z-active': time > 0}">{{codeState}}</div>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
   
<script>
import lrz from 'lrz/dist/lrz.bundle.js';   
export default {
  name : 'BindPayment',
  data() {
    return {
      myBankList:[
        {
          id:12,
          isEnable:false,
          paymentType:1,
          name:'斯文',
          cardNo:'3123213',
          bankName:'农业银行',
          branchName:'宇宙支行'
        },
        {
          id:12,
          isEnable:true,
          paymentType:1,
          name:'斯文',
          cardNo:'3123213',
          bankName:'农业银行',
          branchName:'宇宙支行'
        },
        {
          id:12,
          isEnable:false,
          paymentType:1,
          name:'斯文',
          cardNo:'3123213',
          bankName:'农业银行',
          branchName:'宇宙支行'
        },
      ],
      modelPayAdd:false,
      selectPay:'',
      paymentIds:'',
      payList:[
        {value: '1',label: '银行卡'},
        {value: '2',label: '支付宝'},
        {value: '3',label: '微信'},
      ],
      alipay_wechat:'',
      file1:'',
      file1Img:'',
      payName:'',
      bankName:'',
      branchName:'',
      bankCardNo:'',
      code:'',
      time: 0,
      timer: null,
      tipModal:false,
      btnLoading:false,
      clickSitchIndex: null,
    }
  },
  created() {
    // this.getBankList();
  },
  computed:{
    codeState: function() {
      if (this.time <= 0) {
        return '获取验证码';
      } else {
        var time = this.time;
        time = String(time);
        time = time.length < 2 ? "0" + time : time;
        return `重新获取${time}`
      }
    },
  },
  methods: {
    // 获取银行卡列表
    getBankList(){
      this.$get('/userbank/findList',{}).then(res=>{
        if (!res.code) {
          this.paymentIds = '';
          this.myBankList = res;
          this.myBankList.forEach(item => {
            if (item.isEnable) {
              this.paymentIds = `${item.id},${this.paymentIds}`;
              this.$emit('childBank', this.paymentIds);
            }
          });
        }else{
          this.$Message.destroy()
          this.$Message.error(res.message);
        }
      })
    },
    goAuth(link){
      window.open(`${this.$store.state.www_url}${link}?lang=${this.$store.state.lang}`)
    },
    clickSwitch(index,bankId){
      this.clickSitchIndex = index;
      const isEnable = this.myBankList[this.clickSitchIndex].isEnable ? 1 : 2;
      this.$post('/userbank/bankSwitch',{
        bankId:bankId,
        isEnable:isEnable,
      }).then(res=>{
        this.getBankList();
        // this.$emit('childBank', bankId);
        if (!res.code) {}else{
          this.$Message.destroy()
          this.$Message.error(res.message);
        }
      })
    },
    clickDelete(bankId){
      this.$post('/userbank/unbindBankCard',{ bankId }).then(res=>{
        if (!res.code) {
          this.getBankList();
          this.$Message.destroy()
          this.$Message.success(this.$t('account_index.deleteSuccess'));
        }else{
          this.$Message.destroy()
          this.$Message.error(res.message);
        }
      })
    },
    addPay(){
      this.modelPayAdd = true;
    },
    // 选择器改变
    selectChange(){
      this.bankName = '',
      this.branchName = '',
      this.bankCardNo = '',
      this.code = '',
      this.alipay_wechat = '',
      this.file1 = '';
      this.file1Img = '';
    },
    // 取消绑定
    onCancel(){
      this.bankName = '',
      this.branchName = '',
      this.bankCardNo = '',
      this.code = '',
      this.modelPayAdd = false;
      this.tipModal = false;
      this.selectPay = '';
      this.alipay_wechat = '',
      this.file1 = '';
      this.file1Img = '';
    },
    // 文件选择
    handleUpload1(file){
      console.log(file);
      let that = this;
      if (file.size > 1*1024*1024) {
        that.$Message.destroy()
        that.$Message.warning(that.$t('account_index.errorUploadSize'))
        return;
      }else if(file.type.indexOf('jpg') == -1 && file.type.indexOf('jpeg') == -1 && file.type.indexOf('png') == -1){
        that.$Message.destroy()
        that.$Message.warning(that.$t('account_index.errorUploadFormat'))
        return;
      }else{
        lrz(file,{}).then(function (rst) {
          that.file1Img = rst.base64;
          that.file1 = that.$utils.dataURLtoFile(rst.base64,'file1.jpg');
          that.file1['exifdata'] = file.exifdata;
        }).catch(function (err) {
          that.$Message.destroy()
          that.$Message.error(that.$t('account_index.errorUploadFormat'))
        })
      }
      return false;
    },
    // 确认绑定
    onConfirm(){
      if (this.btnLoading) {
        return;
      }else if(!this.selectPay){
        this.$Message.destroy()
        this.$Message.warning(this.$t('account_index.selectPayType'));
        return;
      }else if (this.selectPay == 1 && (!this.bankName || !this.branchName || !this.bankCardNo || !this.code)){
        this.$Message.destroy()
        this.$Message.warning(this.$t('account_index.enter_error'));
        return;
      }else if((this.selectPay == 2 || this.selectPay == 3) && (!this.alipay_wechat || !this.file1 || !this.code)){
        this.$Message.destroy()
        this.$Message.warning(this.$t('account_index.enter_error'));
        return;
      }else if (this.selectPay == 1){
        this.btnLoading = true;
        this.$post('/userbank/authBankCard',{
          bankCardNo:this.bankCardNo,
          bankName:this.bankName,
          branchName:this.branchName,
          code:this.code,
        }).then(res=>{
          if (!res.code) {
            this.selectPay = '';
            this.modelPayAdd = false;
            this.btnLoading = false;
            this.getBankList();
            this.bankName = '';
            this.branchName = '';
            this.bankCardNo = '';
            this.code = '';
          }else{
            this.btnLoading = false;
            this.$Message.destroy()
            this.$Message.error(res.message);
          }
        })
      }else if(this.selectPay != 1) {
        this.btnLoading = true;
        const QRCode = this.file1;
        const form = new FormData();
        form.append('lang',this.$store.state.lang);
        form.append('uid',this.$utils.generateUUID());
        form.append('QRCode',QRCode,`QRCode${QRCode.type.replace('image/','.')}`);
        form.append('payType',this.selectPay);
        form.append('payAccount',this.alipay_wechat);
        form.append('code',this.code);
        this.$post('/userpaymenttype/addPaymentQRCode',form,'v1',{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
          if (!res.code) {
            this.modelPayAdd = false;
            this.btnLoading = false;
            this.getBankList();
            this.selectPay = '';
            this.alipay_wechat = '';
            this.file1 = '';
            this.file1Img = '';
            this.code = '';
          }else{
            this.btnLoading = false;
            this.$Message.destroy()
            this.$Message.error(res.message);
          }
        })
      }
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
      let code_type = this.$store.state.myInfo.regType == '1' ? 103 : 104;
      if (this.selectPay != 1) {
        code_type = 110;
      }
      this.$funcApi.isLoginPublicGetCode(this.$store.state.myInfo.regType,code_type).then(res=>{}).catch(error=>{
        that.codeError = error.message;
      })
    },
  }
}
</script>
<style lang='less'>
@import url("../assets/css/colorConfig.less");
.bind_payment {
  .select_info {
    .select_switch {
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      color: @textColor3;
      border-bottom: 1px solid @lineColor;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .paytype_div {
          width: 100px;
        }
      }
      .delete {
        margin-right: 20px;
      }
      .iconfont {
        width: 22px;
        font-size: 20px;
        color:  @btnColor;
        margin-right: 5px;
      }
      .class_switch {
        margin-right: 15px;
      }
      .class_bank {
        span {
          padding: 0 10px;
        }
        span:nth-child(1){
          padding: 0 10px 0 0px;
        }
      }
    }
    .add_pay {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-right: 30px;
      color: @btnColor;
      padding-top: 20px;
      span {
        cursor: pointer;
        margin-right: 30px;
      }
    }
  }
  .dialog_box {
    .el-button {
      width: 245px;
      height: 46px;
    }
    .bank_model {
      .model_add_box {
        margin-top: 20px;
        .ipt_select,.ipt_ipt {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          text-align: left;
          margin-bottom: 20px;
          margin-left: -15px;
          .title {
            display: inline-block;
            width: 100px;
            text-align: right;
            margin-right: 20px;
          }
          .select_div {
            width: 430px;
            height: 46px;
            line-height: 46px;
            border-radius: 4px;
            span {
              padding-left: 15px;
              color: @textColor9;
            }
            .ivu-select-selection,.ivu-select-selected-value,.ivu-select-placeholder {
              height: 46px;
              line-height: 46px !important;
              text-align: left;
            }
            .ivu-select-selection {
              background: @white !important;
              // border: solid 1px @borderLineColor !important;
            }
            .ivu-select-selection:hover {
              // border: solid 1px @borderHoverColor !important;
            }
          }
          .title_select {
            background-color: @bgColor;
            border: 1px solid @inputBorder;
          }
          .input_ipt {
            width: 430px;
            height: 46px;
            line-height: 46px;
            padding-left: 15px;
          }
          .code_box {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .code_ipt {
              width: 247px;
            }
            .code_btn {
              cursor: pointer;
              position: relative;
              left: 0;
              width: 140px;
              height: 46px;
              line-height: 46px;
              text-align: center;
              color:@white;
              background-color: @btnColor;
              border-radius: 4px;
              margin-left: 10px;
            }
            .code_btn.z-active {
              color: @inputPlaceHolder;
            }
          }
        }
        .el-upload {
          width: 413px;
          div {
            padding: 10px 0;
            .el-icon-upload {
              // font-size: 24px;
              color: @btnColor;
            }
            p {
              font-size: 12px;
              color: @inputPlaceHolder;
            }
          }
          .el-upload-dragger,.el-upload-list {
            width: 100%;
            height: auto !important;
          }
          .file_img {
            width: 85%;
            height: 245px;
            background-position: center center;
            background-size: 55%;
            background-repeat: no-repeat;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>