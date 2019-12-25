/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-12-10 16:03:17
 * @LastEditors: zy
 * @LastEditTime: 2019-12-25 13:55:54
 */
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],

  configureWebpack: {
    name: 'vuez Admin',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': {
        target: 'http://10.253.100.13:31503/nccc/',
        // target: 'http://192.168.1.189:9002/nccc/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    } : {}
  },
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  }
}

