<template>
  <div class="order">
    <div class="order_title">
      <h4>订单列表</h4>
      <span>数据可能存在延时，请以隔天的数据为准</span>
    </div>
    <div class="tools">
      <el-date-picker
        v-model="dateValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input
        placeholder="订单编号"
        suffix-icon="el-icon-search"
        v-model="searchOrder">
      </el-input>
      <el-select v-model="selectCoin" placeholder="选择币种">
        <el-option
          v-for="item in coinType"
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
      <el-button type="warning" size="medium">下载报表</el-button>
    </div>
    <div class="table_box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="订单编号" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单金额">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款方式" width="180">
          <template slot="header" slot-scope="scope">
            <span>付款方式</span>
            <el-popover trigger="hover" placement="top"
              content="这是说明这是说明这是说明这是说明">
              <i class="el-icon-question"  slot="reference"></i>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <i class="iconfont icon-zhifubao1" style="margin-left: 5px"></i>
            <i class="iconfont icon-weixin" style="margin-left: 5px"></i>
            <i class="iconfont icon-bank-card" style="margin-left: 5px"></i>
            <span>{{ scope.row.payment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单货币" width="120">
          <template slot="header" slot-scope="scope">
            <span>下单货币</span>
            <el-popover trigger="hover" placement="top"
              content="这是说明这是说明这是说明这是说明">
              <i class="el-icon-question"  slot="reference"></i>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.coinType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="货币数量">
          <template slot="header" slot-scope="scope">
            <span>货币数量</span>
            <el-popover trigger="hover" placement="top"
              content="这是说明这是说明这是说明这是说明">
              <i class="el-icon-question"  slot="reference"></i>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手续费">
          <template slot="header" slot-scope="scope">
            <span>手续费</span>
            <el-popover trigger="hover" placement="top"
              content="这是说明这是说明这是说明这是说明">
              <i class="el-icon-question"  slot="reference"></i>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.service }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结余数量">
          <template slot="header" slot-scope="scope">
            <span>结余数量</span>
            <el-popover trigger="hover" placement="top"
              content="这是说明这是说明这是说明这是说明">
              <i class="el-icon-question"  slot="reference"></i>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.surplus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <span>{{ scope.row.statusDec }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
   
<script>
export default {
  name : 'Order',
  data() {
    return {
      dateValue:'',
      searchOrder:'',
      coinType:[
        {value: 'BTC',label: 'BTC'},
        {value: 'ETH',label: 'ETH'},
        {value: 'USDT',label: 'USDT'},
      ],
      selectCoin:'',
      statusArr:[
        {value: '1',label: '待支付'},
        {value: '2',label: '已完成'},
        {value: '3',label: '已取消'},
      ],
      selectStatus:'',
      tableData: [
        {
          orderId: '100000000312', 
          date: '2016-05-02', 
          price: '50,000 CNY', 
          payment: '',
          coinType:'ETH',
          number:'3.434123',
          service:'0.0013',
          surplus:'3.554903',
          statusDec:'待支付'
        }, 
        {
          orderId: '100000000312', 
          date: '2016-05-02', 
          price: '50,000 CNY', 
          payment: '',
          coinType:'ETH',
          number:'3.434123',
          service:'0.0013',
          surplus:'3.554903',
          statusDec:'待支付'
        }, 
        {
          orderId: '100000000312', 
          date: '2016-05-02', 
          price: '50,000 CNY', 
          payment: '',
          coinType:'ETH',
          number:'3.434123',
          service:'0.0013',
          surplus:'3.554903',
          statusDec:'待支付'
        }, 
      ]
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
.order {
  color: @textColor3;
  .order_title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid @titleBorder;
    padding-bottom: 10px;
    span {
      font-size: 14px;
      color: @textColor9;
      padding-left: 10px;
    }
  }
  .table_box {
    margin-top: 30px;
    min-height: 74%;
    .icon-zhifubao1 {
      color: @btnColor;
    }
    .icon-weixin {
      color: #58bc47;
    }
    .icon-bank-card {
      color: @btnColor2;
    }
    .el-icon-question {
      color: @tipsColor;
    }
  }
}
</style>