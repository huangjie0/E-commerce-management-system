const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //配置代理服务器
  devServer: {
    proxy: 'https://lianghj.top:8888/api/private/v1/'
  }
})
