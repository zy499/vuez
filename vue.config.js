/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 14:16:32
 * @LastEditors: zy
 * @LastEditTime: 2019-10-10 17:07:48
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = '8080'
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
      port: port,
      '/api': {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          '^api': ''
        }
      }
    }
  }
}
