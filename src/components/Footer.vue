<template>
  <div class="footer">
    <ul>
      <li>关于聚合支付</li>
      <li>支付合作协议</li>
      <li>帮助中心</li>
      <li>Copyright © 2018 All Rights Reserved</li>
    </ul>
  </div>
</template>
   
<script>
   
export default {
  name : 'myFooter',
  data() {
    return {
      
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
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  color: @textColor8;
  font-size: 14px;
  ul {
    padding: 20px 0;
    padding-bottom: 10px;
    width: 100%;
    border-top: 1px solid @footerLine;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      cursor: pointer;
      border-right: 1px solid @textColor9;
      padding: 0 15px;
    }
    li:hover {
      color: @textColor;
    }
    li:last-child {
      border-right: 0px solid @textColor9;
    }
  }
}
</style>