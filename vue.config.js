/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 14:16:32
 * @LastEditors: zy
 * @LastEditTime: 2019-10-10 22:06:43
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
    proxy: {
      '/api': {
        target: `https://easy-mock.com/mock/5d9f2e79cda1720dffee5ea4/mock`,
        changeOrigin: true,
        pathRewrite: {
          '^api': ''
        }
      }
    }
  }
}
