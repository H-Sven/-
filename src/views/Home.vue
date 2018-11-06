<template>
  <div class="home">
    <img src="../assets/images/logo.png" alt="" srcset="">
    <ve-line :grid="grid" :data="chartData" :settings="chartSettings" v-show="false"></ve-line>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {
    
  },
  data(){
    return {
      chartData: {
        columns: ['日期', '销售额-1季度'],
        rows: [
          { '日期': '1', '销售额-1季度': 1523 },
          { '日期': '2', '销售额-1季度': 1223 },
          { '日期': '3', '销售额-1季度': 2123 },
          { '日期': '4', '销售额-1季度': 4123 },
          { '日期': '5', '销售额-1季度': 3123 },
          { '日期': '6', '销售额-1季度': 7123 }
        ]
      }
    }
  },
  created() {
    this.chartSettings = {
      axisVisible: false,
      scale: [true],
      area: true
    }
    this.grid = {
      left: 0,
      bottom: 0,
      top: 30, // here
      containLabel: false
    }
    var self = this
    setInterval(function () {
      self.chartData.rows.push({
        '日期': self.chartData.rows.length,
        '销售额-1季度': ~~(Math.random() * 10000)
      })
    }, 1000)
  },
  mounted () {
    this.$get('/user/getUserInfo',{}).then(res=>{
      if (!res.code) {
        console.log(res);
      }else{
        console.log(res.code);
      }
    })
  }
};
</script>
