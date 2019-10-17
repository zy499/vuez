/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-08-27 09:10:58
 * @LastEditors: zy
 * @LastEditTime: 2019-10-17 19:43:08
 */
import Vue from 'vue'
// import store from '@/store/store.js'

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('token')
  sessionStorage.removeItem('menuList')
}

/**
 *
 * @param {*} time 时间戳或者时间对象
 * @param {*} fm 格式 默认是{y}-{m}-{d} {h}:{i}:{s}
 */
export function parseTime (time, fm) {
  if (arguments.length === 0) {
    return null
  }
  const format = fm || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
// date 代表指定的日期，格式：2018-09-27
// day 传-1表始前一天，传1表始后一天
// JS获取指定日期的前一天，后一天
export function getNextDate (date, day) {
  var dd = new Date(date)
  dd.setDate(dd.getDate() + day)
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
  return y + '-' + m + '-' + d
}
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
/** 随机生成颜色
 * @param {Function} func
 */
export function getRandomColor () {
  var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16)
  if (rand.length === 6) {
    return rand
  } else {
    return getRandomColor()
  }
}

/** 随机生成颜色
 * @param {Function} func
 */
export function getListColor (i) {
  const colors = ['#3BD19F', '#FF2F78', '#3553FF', '#FA852E', '#DB7093', '#00CED1', '#20B2AA', '#FFE4B5', '#87CEFA']
  let a
  colors.forEach((item, index) => {
    if (i === index) a = item
  })
  return a
}

/** 数组每逢三位补,
 * @param {*} str 修改的值
 */
export function formatNum (num) {
  var str = num.toString()
  var reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return str.replace(reg, '$1,')
}

export const colors = {
  '1号线': '#10069F',
  '2号线': '#FF5C39',
  '3号线': '#D40F7D',
  '4号线': '#44AF52',
  '7号线': '#6AD1E3',
  '10号线': '#003DA5'
}
export const colorsBg = {
  '1号线': 'rgba(34,42,140,.1)',
  '2号线': 'rgba(235,90,53,.1)',
  '3号线': 'rgba(213,0,106,.1)',
  '4号线': 'rgba(0,170,88,.1)',
  '7号线': 'rgba(109,198,214,.1)',
  '10号线': 'rgba(0,80,162,.1)'
}

export function deepCopy (obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
