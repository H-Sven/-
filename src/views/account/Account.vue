<template>
  <div class="my_account">
    <div class="account_title">
      <h4>账户中心</h4>
    </div>
    <router-view class="account_view_box"></router-view>
    <my-footer></my-footer>
  </div>
</template>
   
<script>
import myFooter from '../../components/Footer'  
export default {
  name : 'Account',
  components:{
    myFooter
  },
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
@import url("../../assets/css/colorConfig.less");
.my_account {
  width: 100px;
  .account_title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid @titleBorder;
    padding-bottom: 10px;
  }
  .account_view_box {
    min-height: 72%;
  }
}
</style>