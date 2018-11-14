<template>
  <div class="home">
    <div id="container" style="min-width:400px;height:400px"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Highstock from 'highcharts/highstock';
import mydata from './data.js'
export default {
  name: "home",
  components: {
    
  },
  data(){
    return {
      highstock:null,
      dataArr:[]
    }
  },
  created() {
    this.dataArr = mydata;
  },
  mounted () {
    this.$get('/user/getUserInfo',{}).then(res=>{
      if (!res.code) {
        console.log(res);
      }else{
        console.log(res.code);
      }
    })
    console.log(Highstock);
    this.highstock = Highstock.stockChart('container', {
      rangeSelector : {
        selected : 1
      },
      title : {
        text : 'AAPL Stock Price'
      },
      scrollbar : {
        enabled : false //关闭滚动条
      },
      navigator : {
        enabled : false //关闭导航器
      },
      series : [{
        name : 'AAPL Stock Price',
        data : this.dataArr,
        type : 'areaspline',
        threshold : null,
        tooltip : {
          valueDecimals : 2
        },
        fillColor : {
          linearGradient : {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops : [
            [0, Highstock.getOptions().colors[0]],
            [1, Highstock.Color(Highstock.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        }
      }]
    });
    // setInterval(() => {
    //   this.highstock.series[0].setData([1147651200000,67.79])
    // }, 1000);
  }
};
</script>
<style lang="less">

</style>
