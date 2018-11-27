<template>
  <div class="details_index">
    <div class="tools">
      <el-date-picker
        v-model="dateValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-select v-model="selectCoin" placeholder="选择币种">
        <el-option
          v-for="item in coinType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="selectType" placeholder="选择类型">
        <el-option
          v-for="item in typeArr"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="medium">搜索</el-button>
    </div>
    <div class="table_box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="币种">
          <template slot-scope="scope">
            <span>{{ scope.row.coinType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账单类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
   
<script>
   
export default {
  name : 'Details',
  data() {
    return {
      dateValue:'',
      coinType:[
        {value: 'BTC',label: 'BTC'},
        {value: 'ETH',label: 'ETH'},
        {value: 'USDT',label: 'USDT'},
      ],
      selectCoin:'',
      typeArr:[
        {value: '1',label: '待支付'},
        {value: '2',label: '已完成'},
        {value: '3',label: '已取消'},
      ],
      selectType:'',
      tableData: [
        {
          date: '2016-05-02', 
          coinType:'ETH',
          type:'交易',
          number:'3.434123',
        }, 
        {
          date: '2016-05-02', 
          coinType:'ETH',
          type:'交易',
          number:'3.434123',
        }, 
        {
          date: '2016-05-02', 
          coinType:'ETH',
          type:'交易',
          number:'3.434123',
        }, 
      ]
    }
  },
  created() {
    this.$emit('sendRouteName',{routeName:'账单明细',routePath:'/assets/details'})
  },
  methods: {
    
  }
}
</script>
<style lang='less'>
@import url("../../assets/css/colorConfig.less");
.details_index {
  .table_box {
    margin-top: 30px;
    min-height: 74%;
  }
}
</style>