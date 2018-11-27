<template>
  <div class="record_details">
    <div class="data_table">
      <div class="record_details_title">提现详情</div>
      <div class="data_table_info">
        <div class="row_box">
          <div class="row_title">订单编号</div>
          <div class="row_inner">2154646545415151</div>
        </div>
        <div class="row_box">
          <div class="row_title">提现数量</div>
          <div class="row_inner">0.025695163 BTC</div>
        </div>
        <div class="row_box">
          <div class="row_title">提现单价</div>
          <div class="row_inner">35623.32 CNY/BTC</div>
        </div>
        <div class="row_box">
          <div class="row_title">提现总额</div>
          <div class="row_inner">3915.346907 CNY</div>
        </div>
        <div class="row_box">
          <div class="row_title">收款账户</div>
          <div class="row_inner payment">
            <span>银行卡</span>&nbsp;&nbsp;&nbsp;
            <span>张三</span>&nbsp;&nbsp;
            <span>64325515151517889</span>&nbsp;&nbsp;
            <span>中国人民银行</span>&nbsp;&nbsp;
            <span>大冲支行</span>&nbsp;&nbsp;
          </div>
        </div>
        <div class="row_box">
          <div class="row_title">订单状态</div>
          <div class="row_inner status_class">待支付</div>
        </div>
      </div>
      <div class="order_box_btn" v-if="!Invalid">
        <el-button type="primary" @click="onConfirm">我已收到款</el-button>
        <div class="tips_span">请于<span>{{times}}</span>内确认并点击“我已收到款”，超时系统将自动确认。</div>
      </div>
      <div class="lianxi"  v-if="!Invalid">没收到款或金额有问题？<span @click="Contact">提交申诉</span></div>
      <div class="explain">
        <p>温馨提示</p>
        <p>1、确认提现后，请留意提现状态及账户收款情况，确认已收到全款后，请在确认期限内点击“我已收到款”；</p>
        <p>2、当订单状态为“待确认”，收款确认倒计时开始后，未在确认期限内点击“我已收到款”，系统将自动确认。</p>
      </div>
    </div>
  </div>
</template>
   
<script>
   
export default {
  name : 'RecordDetails',
  data() {
    return {
      Invalid:false,
      times:'',
      ordertimer: null,
      clearTime:null,
      orderTimeOut:'',
    }
  },
  destroyed() {
    //路由销毁之后清除定时器
    clearInterval(this.ordertimer);
    clearInterval(this.clearTime);
  },
  created() {
    this.$emit('sendRouteName',{routeName:'提现记录',routeName2:'提现详情',routePath:'/assets/recordDetails'})
    this.orderId = this.$route.query.orderId;
    // this.orderDetail(this.orderId);
  },
  methods: {
    // 获取订单详情
    orderDetail(orderId = this.orderId){
      this.$get('/trade/orderDetail',{ orderId }).then(res=>{
        if (!res.code) {
          this.orderNo = res.orderNo;
          this.sellerAccount = res.sellerAccount;
          this.sellNum = `${res.qty} ${res.coinType}`;
          this.price =  `${res.price} ${res.legalTender}`;
          this.total = `${res.totalPrice} ${res.legalTender}`;
          this.paymentList = res.paymentTypes.buyer;
          this.statusDesc = res.statusDesc;
          this.remarks = res.flagCode;
          this.orderTimeOut = res.autoConfirmTime;
          this.Invalid = res.status == 2 ? false : true;
          if (!this.Invalid) {
            this.goDate(this.orderTimeOut);
          }
        } else {
          this.$Message.destroy()
          this.$Message.warning(res.message);
        }
      })
    },
    // 我已收到款
    onConfirm(){
      this.$post('/trade/payConfirmByBuyer',{
        orderId:this.orderId,
      }).then(res=>{
        if (!res.code) {
          this.orderDetail();
        } else {
          this.$Message.destroy()
          this.$Message.warning(res.message);
        }
      })
    },
    // 进行倒计时
    goDate(v){
      let that = this;
      let my_v = this.$utils.formatDateTime(v)
      let date1 = new Date();
      let date2 = new Date(my_v);
      that.times = that.$utils.leftTimer(date2)
      if (date2 < date1) {//设置的时间小于现在时间退出
        this.Invalid = true;
        this.times = '00:00';
        this.statusDesc = this.$t('sellOrderinfo.Completed');
        return;
      }else{
        this.ordertimer = setInterval(function () {
          if (that.$utils.leftTimer(date2) == null) {
            clearInterval(that.ordertimer);
            that.times = '00:00';
            that.ordertimer = null;
            that.Invalid = true;
            that.statusDesc = that.$t('sellOrderinfo.Completed');
            return;
          }
          that.times = that.$utils.leftTimer(date2)
        }, 1000);
      }
    },
    // 联系客服
    Contact(){
      window.open(`https://becentotc.zendesk.com/hc/zh-cn/requests/new`)
    }
  }
}
</script>
<style lang='less'>
@import url("../../assets/css/colorConfig.less");
.record_details {
  padding-left: 30px;
  padding-top: 30px;
  margin-top: 30px;
  background-color: @white;
  box-shadow: 0px 4px 8px 0px rgba(133, 133, 133, 0.05);
  min-height: 500px;
  border-radius: 4px;
  .data_table {
    width: 100%;
    .record_details_title {
      font-size: 16px;
      font-weight: 600;
    }
    .data_table_info {
      margin-top: 20px;
      .row_box {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .row_title {
          width: 80px;
          margin-right: 10px;
        }
        .status_class {
          color: @textColor;
          font-weight: 600;
        }
      }
    }
    .order_box_btn {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-top: 40px;
      .el-button--primary {
        width: 280px;
        span {
          display: inline-block;
          height: 20px;
          line-height: 20px;
        }
      }
      .tips_span {
        margin-left: 20px;
        span {
          display: inline-block;
          width: 48px;
          font-size: 16px;
          color: @btnColor;
          font-weight: 600;
        }
      }
    }
    .lianxi {
        padding-top: 20px;
        padding-left: 10px;
        span {
          cursor: pointer;
          color: @btnColor;
        }
      }
      .explain {
        color: @textColor9;
        font-size: 14px;
        line-height: 28px;
        margin-top: 90px;
        padding-bottom: 20px;
      }
  }
}
</style>