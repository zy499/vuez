/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 14:16:32
 * @LastEditors: zy
 * @LastEditTime: 2019-10-11 15:21:20
 */
const path = require('path')
console.log(process.env.NODE_ENV)
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
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
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: `http://10.253.100.13:31503/nccc/`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^api': ''
    //     }
    //   }
    // }
  }
}
