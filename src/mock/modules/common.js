/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 21:43:24
 * @LastEditors: zy
 * @LastEditTime: 2019-10-16 17:29:16
 */
import Mock from 'mockjs'

// 登录
export function login() {
  return {
    // isOpen: false,
    url: '/sys/login',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'expire': Mock.Random.natural(60 * 60 * 1, 60 * 60 * 12),
      'token': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32),
    }
  }
}
export function menuList() {
  return {
    // isOpen: false,
    url: 'sys/menuList',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'menuList': [
        {
          url: '/home',
          name: 'Home',
          slug: 'home',
          icon: 'HomeIcon',
          iframeUrl: '',
        },
        {
          url: '/page2',
          name: 'Page2',
          slug: 'page2',
          icon: 'FileIcon',
          isDisabled: true,
          iframeUrl: ''
        },
        {
          url: '/page3',
          name: 'Page3',
          slug: 'page3',
          icon: 'FileIcon',
          iframeUrl: 'http://nccc.cdmetrokyb.com/#/passengerFlowWaringHomepage'
        },
        {
          url: '/page4',
          name: 'Page4',
          slug: 'page4',
          icon: 'FileIcon',
          iframeUrl: 'http://nccc.cdmetrokyb.com/#/stationDetails'
        }
      ]
    }
  }
}
// 退出
export function logout() {
  return {
    // isOpen: false,
    url: '/sys/logout',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
