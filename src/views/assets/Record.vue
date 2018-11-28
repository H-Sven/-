<template>
  <div class="record_index">
    <div class="tools">
      <el-date-picker
        v-model="dateValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input
        placeholder="提现编号"
        suffix-icon="el-icon-search"
        v-model="recordNumber">
      </el-input>
      <el-select v-model="selectCoin" placeholder="选择币种">
        <el-option
          v-for="item in coinType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="paymentType" placeholder="选择收款方式">
        <el-option
          v-for="item in paymentTypeArr"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="selectStatus" placeholder="选择状态">
        <el-option
          v-for="item in statusArr"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="medium">搜索</el-button>
    </div>
    <div class="table_box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="时间" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现编号" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现货币" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.coinType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现数量" >
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现单价">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现总额">
          <template slot-scope="scope">
            <span>{{ scope.row.total }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收款方式">
          <template slot-scope="scope">
            <span>{{ scope.row.payment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <span>{{ scope.row.statusDec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">确认收款</el-button>
            <el-button type="text" @click="routerLink('/home/assets/recordDetails')">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
   
<script>
   
export default {
  name : 'Record',
  data() {
    return {
      dateValue:'',
      recordNumber:'',
      coinType:[
        {value: 'BTC',label: 'BTC'},
        {value: 'ETH',label: 'ETH'},
        {value: 'USDT',label: 'USDT'},
      ],
      selectCoin:'',
      paymentTypeArr:[
        {value: '1',label: '银行卡'},
        {value: '2',label: '支付宝'},
        {value: '3',label: '微信'},
      ],
      paymentType:'',
      statusArr:[
        {value: '1',label: '待支付'},
        {value: '2',label: '已完成'},
        {value: '3',label: '已取消'},
      ],
      selectStatus:'',
      tableData: [
        {
          date: '2016-05-02', 
          orderId: '100000000312', 
          coinType:'ETH',
          number:'3.434123',
          price: '50,000', 
          total:'3123213',
          payment: '银行卡',
          statusDec:'待支付',
          service:'0.0013',
          surplus:'3.554903',
        },
        {
          date: '2016-05-02', 
          orderId: '100000000312', 
          coinType:'ETH',
          number:'3.434123',
          price: '50,000', 
          total:'3123213',
          payment: '银行卡',
          statusDec:'待支付',
          service:'0.0013',
          surplus:'3.554903',
        },
        {
          date: '2016-05-02', 
          orderId: '100000000312', 
          coinType:'ETH',
          number:'3.434123',
          price: '50,000', 
          total:'3123213',
          payment: '银行卡',
          statusDec:'待支付',
          service:'0.0013',
          surplus:'3.554903',
        },
      ]
    }
  },
  created() {
    this.$emit('sendRouteName',{routeName:'提现记录',routePath:'/home/assets/record'})
  },
  methods: {
    routerLink(route){
      this.$router.push({ path: route, query: {} })
    }
  }
}
</script>
<style lang='less'>
@import url("../../assets/css/colorConfig.less");
.record_index {
  .table_box {
    margin-top: 30px;
    min-height: 74%;
  }
}
</style>