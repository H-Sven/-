<template>
  <div id="app">
    <router-view class="app_view_box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide(){
    return {
      reload:this.reload,
    }
  },
  data () {
    return {
      isRouterAkive:true, //刷新当前路由
    }
  },
  methods: {
    // 刷新路由
    reload(){
      this.isRouterAkive = false
      this.$nextTick(()=>{
        this.isRouterAkive = true
      })
    },
  }
}
</script>

<style style="less">
#app {
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  #app::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  }
  #app::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #ccc;
  }
  #app::-webkit-scrollbar-track {/*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
  }
</style>
