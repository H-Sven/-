module.exports = {
  baseUrl:"./",
  // assetsDir:"static", //资源文件放入static目录
  lintOnSave:false,//是否使用eslint
  productionSourceMap:false,
  devServer:{
    open:true,
  },
  transpileDependencies: [
    'webpack-dev-server/client',
  ]
}