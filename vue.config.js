/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 14:16:32
 * @LastEditors: zy
 * @LastEditTime: 2019-10-23 15:41:43
 */
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // publicPath: '/',
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
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': {
        // target: 'http://10.253.100.13:31503/nccc/',
        target: 'http://192.168.1.119:9002/nccc/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    } : {}
  }
}
