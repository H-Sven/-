<template>
  <div class="home">
    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-container>
        <el-aside class="left_menu" :width="`${asideWidth}px`">
          <div class="menu_item" :class="{'z-active':select === item.path}" @click="handleSelect(item.path)" v-for="(item, index) in menuArr" :key="index">
            <i class="iconfont" :class="item.icon"></i>
            <span class="menu_title">{{item.pathName}}</span>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <router-view  class="view_box"></router-view>
          </el-main>
          <el-footer>
            <my-footer></my-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
   
<script>
import myHeader from '../components/Header' 
import myFooter from '../components/Footer'
export default {
  name : 'Home',
  components:{
    myHeader,
    myFooter
  },
  data() {
    return {
      asideWidth:130,
      menuArr:[
        {path:'/home/index',pathName:'首页',icon:'icon-index'},
        {path:'/home/order',pathName:'订单',icon:'icon-dingdanxuanzhong'},
        {path:'/home/assets/index',pathName:'资产',icon:'icon-zichan2'},
        {path:'/home/account/index',pathName:'账户',icon:'icon-touxiang'},
      ],
      select:'/home/index',
    }
  },
  created() {
    if (this.$route.path == '/home') {
      this.$router.push({ path: '/home/index', query: {} })
       this.select = '/home/index';
    }else{
      this.select = this.$store.state.toPath;
    }
  },
  methods: {
    widtfun(){
      this.asideWidth = this.asideWidth + 100
    },
    handleSelect(path){
      this.select = path;
      this.$store.commit('setToPath',path);
      this.$router.push({ path: this.select, query: {} })
    }
  }
}
</script>
<style lang='less'>
@import url("../assets/css/colorConfig.less");
.home {
  width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  .left_menu {
    .menu_item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 130px;
      justify-content: center;
      color: @textColor8;
      font-size: 18px;
      .iconfont {
        font-size: 22px;
        margin-bottom: 5px;
      }
    }
    .menu_item.z-active {
      color: @textColor;
      background-color: @chartBg;
    }
  }
  .view_box {
    flex: 1;
    padding: 60px;
    padding-top: 20px;
    padding-bottom: 0;
  }
  .el-header {
    padding: 0;
  }
  .el-main {
    padding: 0;
  }
  .el-aside {
    background-color:@white;
    transition: all .3s linear;
  }
  .el-footer {
    padding: 0 60px;
  }
}
</style>