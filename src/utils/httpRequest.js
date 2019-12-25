/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-08-29 10:26:16
 * @LastEditors  : zy
 * @LastEditTime : 2019-12-25 12:47:29
 */
import Vue from 'vue'
import axios from 'axios'
// import router from '@/router'
const http = axios.create({
  timeout: 1000 * 60,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
// const self = new Vue
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data && response.data.code === '00000002') { // 00000002 token失效
      // self.$vs.notify({ title: '错误', text: '登录失效，请重新登录', color: 'danger' })
    } else if (response.data && response.data.code !== '00000000') {
      // self.$vs.notify({ title: '错误', text: response.data.msg, color: 'danger',position: 'top-center' })
      return Promise.reject(response)
    } else {
      return Promise.resolve(response)
    }
  }
}, error => {
  // NProgress.done()
  if (error && error.response) {
    switch (error.response.status) {
      case 401:
        break
      case 404:
        console.log('err' + error) // for debug
        break

      case 500:
        console.log('err' + error) // for debug
        break

      default:
        console.log('err' + error) // for debug
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
  return (process.env.NODE_ENV === 'development' ? '/api/' : 'http://10.253.100.13:31503/nccc/') + actionName
  // return '/api/' + actionName
  // return 'http://10.253.100.13:31503/nccc/' + actionName
}


export default http
