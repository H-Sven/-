<template>
  <div class="withdrawal_index">
    <ul class="data_list_box">
      <li class="data_list">
        <div class="li_title">可用{{coinType}}</div>
        <div class="number">
          <countTo :startVal="0" :endVal="available" :duration="1000"></countTo>
        </div>
      </li>
      <li class="data_list">
        <div class="li_title">冻结{{coinType}}</div>
        <div class="number">
          <countTo :startVal="0" :endVal="frozen" :duration="1000"></countTo>
        </div>
      </li>
      <li class="data_list">
        <div class="li_title">{{coinType}}总量</div>
        <div class="number">
          <countTo :startVal="0" :endVal="total" :duration="1000"></countTo>
        </div>
      </li>
    </ul>
    <div class="steps_box">
      <div class="steps steps_1" v-if="steps === 1">
        <div class="steps_title">设置提现数量、收款方式</div>
        <div class="ipt_box">
          <div class="ipt_title">提现数量</div>
          <div class="ipt_box_inner">
            <input class="my_input" v-model="iptNumber" :placeholder="`可提现数量：${available}`" @mousewheel.prevent @DOMMouseScroll.prevent step="0.0000000001" v-enter-number2 type="number">
            <span class="hover" @click="allFuc">全部</span>
          </div>
        </div>
        <bind-payment></bind-payment>
        <div class="next_step">
          <el-button type="primary" size="medium"  @click="nextStep(2)">下一步</el-button>
        </div>
      </div>
      <div class="steps steps_2" v-if="steps === 2">
        <div class="steps_title">确认下单</div>
        <div class="ipt_box">
          <div class="ipt_title">提现数量</div>
          <div class="ipt_box_inner2">
            <span>{{iptNumber}} {{coinType}}</span>
          </div>
        </div>
        <div class="ipt_box">
          <div class="ipt_title">当前单价</div>
          <div class="ipt_box_inner2">
            <span>{{iptNumber}} {{coinType}}</span>
          </div>
        </div>
        <div class="ipt_box">
          <div class="ipt_title">收款方式</div>
          <div class="ipt_box_inner2"  v-for="(item, index) in myBankList" :key="index">
            <div class="paytype_div" v-if="item.paymentType == 1">银行卡</div>
            <div class="paytype_div" v-if="item.paymentType == 2">支付宝</div>
            <div class="paytype_div" v-if="item.paymentType == 3">微信</div>
            <div class="class_bank" v-if="item.paymentType == 1"><span>{{item.name}}</span><span>{{item.cardNo}}</span><span>{{item.bankName}}</span><span>{{item.branchName}}</span></div>
            <div class="class_bank" v-if="item.paymentType != 1 "><span>{{item.name}}</span><span>{{item.payAccount}}</span></div>
          </div>
        </div>
        <div class="ipt_box ipt_total_div">
          <div class="ipt_title">订单总额</div>
          <div class="ipt_box_inner2">915.346907 CNY</div>
        </div>
        <div class="next_step">
          <el-button  size="medium"  @click="nextStep(1)">上一步</el-button>
          <el-button type="primary" size="medium"  @click="verification = true">确认下单</el-button>
        </div>
      </div>
      <div class="steps steps_3" v-if="steps === 3">
        <div class="tips">下单成功，请静待收款</div>
        <div class="next_step3">
          <el-button  size="medium"  @click="nextStep(1)">再提一单</el-button>
          <el-button type="primary" size="medium"  @click="viewInfo">查看详情</el-button>
        </div>
      </div>
    </div>
    <!-- 确认下单 -->
    <verifi-cation v-if="verification" @childEventVerifi="verifiCancelModel" :loading="loading" :codeType="codeType"></verifi-cation>
  </div>
</template>
   
<script>
import BindPayment from '../../components/BindPayment'
import verifiCation from "../../components/Verification"; 
export default {
  name : '',
  components:{
    BindPayment,
    verifiCation
  },
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
      ],
      coinType:'BTC',
      available:33.3231,
      frozen:33.3231,
      total:33.3231,
      steps:1,
      iptNumber:'23123.32312',
      verification:false,
      codeType:'102',
      loading:false,
    }
  },
  created() {
    this.$emit('sendRouteName',{routeName:'提现',routePath:'/home/assets/withdrawal'})
  },
  methods: {
    // 全部
    allFuc(){
      this.iptNumber = this.available;
    },
    // 下一步
    nextStep(steps){
      this.steps = steps;
    },
    // 确定出售安全验证
    verifiCancelModel({status,code}){
      if (status) {
        this.loading = true;
        this.$post('/trade/sell',{ 
          qty:this.iptNum,
          price:this.iptPrice,
          adId:this.adId,
          code:code,
        }).then(res=>{
          if (!res.code) {
            this.loading = false;
            this.showVerifiCation = false;
            this.$Message.destroy()
            this.$Message.success(this.$t("c2c.SuccessfulOrder"));
            this.$router.push({path:'/sellorderinfo',query:{orderId:res.orderId}})
            this.tradingShow = 10000;
            this.isClickConfirm = false;
            this.modelBtnLoading = false;
            this.getSellersFind(this.coinName);
          } else {
            this.loading = false;
            this.$Message.destroy()
            this.$Message.warning(res.message);
          }
        }).catch(error=>{
          this.loading = false;
        })
      }else{
        this.verification = status;
      }
    },
    // 查看详情
    viewInfo(){

    }
  }
}
</script>
<style lang='less'>
@import url("../../assets/css/colorConfig.less");
.withdrawal_index {
  .data_list_box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;
    width: 100%;
    .data_list {
      width: 23%;
      height: 130px;
      background-color: @white;
      color: @textColor3;
      font-size: 16px;
      font-weight: 600;
      padding: 20px 0 0 20px;
      box-shadow: 0px 4px 8px 0px rgba(133, 133, 133, 0.05);
      border-radius: 4px;
      margin-right: 20px;
      .number {
        padding-top: 20px;
        font-size: 28px;
        font-weight: 600;
        color: @textColor;
      }
    }
  }
  .steps_box {
    .steps {
      min-height: 300px;
      margin-top: 30px;
      background-color: @white;
      color: @textColor3;
      box-shadow: 0px 4px 8px 0px rgba(133, 133, 133, 0.05);
      border-radius: 4px;
      padding: 20px 0 30px 20px;
      .steps_title {
        font-size: 16px;
      }
      .ipt_box {
        display: flex;
        align-items: center;
        margin-top: 20px;
        .ipt_title {
          width: 100px;
        }
        .ipt_box_inner {
          position: relative;
          margin-left: 20px;
          input {
            width: 310px;
            height: 34px;
            line-height: 33px;
          }
          span {
            cursor: pointer;
            color: @textColor;
            font-weight: 600;
            position: absolute;
            right: 10px;
            top: 8px;
          }
        }
        .ipt_box_inner2 {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: flex-start;
          .paytype_div {
            padding-right: 30px;
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
      }
      .ipt_total_div {
        margin-top: 30px;
        .ipt_title,.ipt_box_inner2 {
          color: @textColor;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
    .next_step {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      padding-right: 30px;
      .el-button:last-child {
        margin-right: 30px;
      }
    }
    .steps_3 {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .tips {
        font-weight: 600;
        font-size: 22px;
      }
      .next_step3 {
        margin-top: 30px;
        .el-button {
          margin-right: 0;
        }
      }
    }
  }
}
</style>