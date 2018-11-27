<template>
  <div class="assets_index">
    <div class="account_box">
      <div class="row_box">
        <div class="title">账户名：</div>
        <div>深圳神羽网络</div>
      </div>
      <div class="row_box">
        <div class="title">账户ID：</div>
        <div>365987</div>
      </div>
      <div class="row_box">
        <div class="title">总资产估值：</div>
        <div>≈5632469.26</div>
        <el-select class="company" v-model="company" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="assets_table">
      <div class="tools">
        <div class="left">
          <el-input
            placeholder=""
            size="small"
            suffix-icon="el-icon-search"
            v-model="searchOrder">
          </el-input>
        </div>
        <div class="right detailed hover" @click="routerLink('/assets/details')">账单明细</div>
      </div>
      <div class="table_box">
        <el-table :data="tableData" style="width: 100%">
        <el-table-column label="币种" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.coin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总量">
          <template slot-scope="scope">
            <span>{{ scope.row.number }} ≈ {{ scope.row.yue }} {{company}}</span>
          </template>
        </el-table-column>
        <el-table-column label="可用" >
          <template slot-scope="scope">
            <span>{{ scope.row.available }}</span>
          </template>
        </el-table-column>
        <el-table-column label="冻结" >
          <template slot-scope="scope">
            <span>{{ scope.row.freeze }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <div class="btn_box">
              <div class="cash hover" @click="handleCash(scope.$index, scope.row)">提现</div>
              <div class="record hover" @click="handleRecord(scope.$index, scope.row)">记录</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
  </div>
</template>
   
<script>
   
export default {
  name : 'assetsIndex',
  data() {
    return {
      company:'',
      options: [
        {value: 'CNY',label: 'CNY'}, 
        {value: 'USD',label: 'USD'}
      ],
      searchOrder:'',
      tableData:[
        {
          coin: 'BTC', 
          number:'3.434123',
          yue:'33.32323',
          available: '43.554903',
          freeze:'1.32323',
        }, 
      ]
    }
  },
  created() {
    this.company = this.options[0].value
  },
  methods: {
    routerLink(route){
      this.$router.push({ path: route, query: {} })
    },
    // 提现
    handleCash(index,row){
      console.log(index,row);
      this.$router.push({ path: '/assets/withdrawal', query: {} })
    },
    // 提现记录
    handleRecord(index,row){
      console.log(index,row);
      this.$router.push({ path: '/assets/record', query: {} })
    },
  }
}
</script>
<style lang='less'>
@import url("../../assets/css/colorConfig.less");
.assets_index {
  .account_box {
    margin-top: 30px;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 100px;
    background-color: @white;
    box-shadow: 0px 4px 8px 0px rgba(133, 133, 133, 0.05);
    border-radius: 4px;
    .row_box {
      display: flex;
      align-items: center;
      min-height: 50px;
      margin-left: 30px;
      .title {
        width: 130px;
      }
      .el-select {
        margin-left: 30px;
        width: 100px;
      }
    }
  }
  .assets_table {
    min-height: 50%;
    .tools {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 30px 0;
      .el-input {
        width: 200px;
      }
      .detailed {
        cursor: pointer;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: @textColor;
        border-radius: 4px;
        color: @white;
      }
    }
    .btn_box {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: @textColor;
      .cash,.record {
        margin-right: 14px;
      }
    }
  }
}
</style>