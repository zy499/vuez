/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-08-29 10:26:16
 * @LastEditors: zy
 * @LastEditTime: 2019-10-11 15:21:07
 */
import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css'
import { clearLoginInfo } from '@/utils'
// import { Message } from 'element-ui'
// NProgress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
// NProgress.set(0.4)
const http = axios.create({
  timeout: 1000 * 60,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  // NProgress.start()
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  // NProgress.done()
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  return response
  // NProgress.done()
  // if (response.status) {
  // if (response.status === 200) {
  //   if (response.data && response.data.code === '00000002') { // 00000002 token失效
  //     clearLoginInfo()
  //     this.$vs.notify({ title: 'Danger', text: '登录失效，请重新登录', color: 'danger' })
  //     setTimeout(() => {
  //       router.push({ name: 'login' })
  //     }, 2000)
  //   } else if (response.data && response.data.code !== '00000000') {
  //     console.log('err:', response.data.msg)
  //     return Promise.reject(response)
  //   } else {
  //     return Promise.resolve(response.data)
  //   }
  // } else {
  //   return Promise.reject(response)
  // }
  // }
}, error => {
  // NProgress.done()
  if (error && error.response) {
    switch (error.response.status) {
      case 401:
        clearLoginInfo()
        this.$vs.notify({ title: 'Danger', text: '登录失效，请重新登录', color: 'danger' })
        setTimeout(() => {
          router.push({ name: 'login' })
        }, 2000)
        break
      case 404:
        // router.push({name: '404'})
        // error.message = '请求出错(404)'
        console.log('err' + error) // for debug
        // Message({
        //   message: '抱歉，服务器出错了',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        break

      case 500:
        // router.push({name: '500'})
        //  error.message = '服务器错误(500)';
        console.log('err' + error) // for debug
        // Message({
        //   message: '抱歉，服务器出错了',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        break

      default:
      // error.message = `连接出错(${error.response.status})!`
        console.log('err' + error) // for debug
        // Message({
        //   message: '抱歉，服务器出错了',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
    }
  }
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/api/' : window.SITE_CONFIG.baseUrl) + actionName
  return 'http://10.253.100.13:31503/nccc/' + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = false) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = false, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
