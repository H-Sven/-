<template>
  <div class="home_count">
    <div class="title">
      <h4>整体情况<i class="iconfont icon-yanjing" @click="openNumber = !openNumber" :class="{'yanjing_active':openNumber}"></i></h4>
      <el-select class="company" v-model="company" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <ul class="data_list">
      <li>
        <div class="li_title">资产总估值</div>
        <div class="number">
          <countTo :startVal="0" :endVal="assetsTotal" :duration="800"></countTo><span class="company_span">{{company}}</span>
        </div>
      </li>
      <li>
        <div class="li_title">昨日订单总金额</div>
        <div class="number">
          <countTo :startVal="0" :endVal="yesterdayTotal" :duration="800"></countTo><span class="company_span">{{company}}</span>
        </div>
      </li>
      <li>
        <div class="li_title">今日订单总金额</div>
        <div class="number">
          <countTo :startVal="0" :endVal="todayTotal" :duration="800"></countTo><span class="company_span">{{company}}</span>
        </div>
      </li>
      <li class="oder_total">
        <div class="li_title">订单统计</div>
        <div class="number_box">
          <div class="number">
            <span>今日新增</span>
            <countTo class="count_to" :startVal="0" :endVal="todayNews" :duration="800"></countTo>
          </div>
          <div class="number">
            <span>已取消</span>
            <countTo class="count_to" :startVal="0" :endVal="cancelTotal" :duration="800"></countTo>
          </div>
          <div class="number">
            <span>待支付</span>
            <countTo class="count_to" :startVal="0" :endVal="successTotal" :duration="800"></countTo>
          </div>
          <div class="number">
            <span>已完成</span>
            <countTo class="count_to" :startVal="0" :endVal="paidTotal" :duration="800"></countTo>
          </div>
        </div>
      </li>
    </ul>
    <div class="chart">
      <div class="chart_title">
        <div class="ch_title">数据报表&nbsp;
          <span>(以下数据10分钟刷新一次)</span>
        </div>
        <el-select class="data" v-model="dateSelect" placeholder="请选择">
          <el-option v-for="item in dateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="chart_box">
        <ve-line class="ve_line"
          width="100%"
          :data="chartData" 
          :settings="chartSettings" 
          :loading="loading"
          :data-empty="dataEmpty"
          >
        </ve-line>
      </div>
    </div>
  </div>
</template>
   
<script>
export default {
  name : 'HomeCount',
  data() {
    return {
      openNumber:false,
      company:'',
      options: [
        {value: 'CNY',label: 'CNY'}, 
        {value: 'USD',label: 'USD'}
      ],
      assetsTotal:50000000,
      yesterdayTotal:50000000,
      todayTotal:50000000,
      todayNews:500,
      cancelTotal:526,
      successTotal:50,
      paidTotal:1365,
      dateSelect:'',
      dateList:[
        {value: '7',label: '过去7天'}, 
        {value: '30',label: '过去1月'}
      ],
      chartSettings:{
        labelMap: {
          '订单量': '订单量',
          '订单总额': '订单总额',
          '成交量': '成交量',
          '成交总额': '成交总额',
        },
      },
      loading : false,
      dataEmpty : false, //暂无数据
      chartData: {
        columns: ['date', '订单量', '订单总额', '成交量','成交总额'],
        rows: [
          { 'date': '11-01', '订单量': 1393, '订单总额': 1093, '成交量': 133.32,'成交总额':1323 },
          { 'date': '11-02', '订单量': 3530, '订单总额': 3230, '成交量': 323.26,'成交总额':1423 },
          { 'date': '11-03', '订单量': 2923, '订单总额': 2623, '成交量': 135.76,'成交总额':1623 },
          { 'date': '11-04', '订单量': 1723, '订单总额': 1423, '成交量': 560.49,'成交总额':1123 },
          { 'date': '11-05', '订单量': 3792, '订单总额': 3492, '成交量': 657.323,'成交总额':1423 },
          { 'date': '11-06', '订单量': 4593, '订单总额': 4293, '成交量': 3211.78,'成交总额':2323 }
        ]
      }
    }
  },
  created() {
    this.company = this.options[0].value
  },
  methods: {
   
  }
}
</script>
<style lang='less'>
@import url("../assets/css/colorConfig.less");
  .home_count {
    color: @textColor3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid @titleBorder;
      padding-bottom: 10px;
      .icon-yanjing {
        margin-left: 10px;
        font-size: 24px;
        color: @textColor9;
        cursor: pointer;
      }
      .yanjing_active {
        color: @textColor;
      }
      .company {
        width: 100px;
        height: 28px;
        margin-left: 20px;
        .el-input {
          width: 100%;
          height: 100%;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
          .el-input__icon {
            line-height: 28px;
          }
        }
      }
    }
    .data_list {
      margin-top: 30px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        width: 23%;
        height: 130px;
        background-color: @white;
        color: @textColor3;
        font-size: 16px;
        font-weight: 600;
        padding: 20px 0 0 20px;
        box-shadow: 0px 4px 8px 0px rgba(133, 133, 133, 0.05);
        border-radius: 4px;
        .number {
          padding-top: 20px;
          font-size: 28px;
          font-weight: 600;
          color: @textColor;
          .company_span {
            font-size: 26px;
          }
        }
      }
      .oder_total {
        .number_box {
          display: flex;
          flex-wrap: wrap;
          .number {
            width: 50%;
            font-weight: normal;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: @textColor3;
            .count_to {
              font-weight: 600;
              padding-right: 30px;
              color: @textColor;
            }
          }
        }
      }
    }
    .chart {
      width: 100%;
      min-height: 600px;
      margin-top: 30px;
      background-color: @white;
      color: @textColor3;
      display: flex;
      flex-direction: column;
      align-items: center;
      .chart_title {
        width: 100%;
        height: 50px;
        font-size: 16px;
        background-color: @titleBg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .ch_title {
          padding-left: 20px;
          span {
            font-size: 14px;
            color: @textColor9;
          }
        }
        .el-select {
          width: 140px;
          height: 34px;
          margin-right: 20px;
          .el-input {
            width: 100%;
            height: 100%;
            .el-input__inner {
              width: 100%;
              height: 100%;
            }
            .el-input__icon {
              line-height: 34px;
            }
          }
        }
      }
      .chart_box {
        width: 90%;
        margin-top: 60px;
        background-color: @chartBg;
        border: 1px solid @chartBorder;
      }
      .ve_line {
        margin-top: 30px;
        // margin-left: 30px;
      }
    }
  }
</style>