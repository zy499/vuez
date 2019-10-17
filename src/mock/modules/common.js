/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 21:43:24
 * @LastEditors: zy
 * @LastEditTime: 2019-10-17 22:18:23
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
          url: null,
          name: "Dashboard",
          tag: "2",
          tagColor: "warning",
          icon: "HomeIcon",
          submenu: [
            {
              url: '/dashboard/analytics',
              name: 'Analytics',
              slug: 'dashboard-analytics',
              iframeUrl: ''
            },
            {
              url: '/dashboard/home',
              name: 'Home',
              slug: 'dashboard-home',
              iframeUrl: ''
            }
          ]
        },
        {
          url: '/page',
          name: 'Page',
          slug: 'page',
          icon: 'ActivityIcon',
          isDisabled: true,
          iframeUrl: ''
        },
        {
          url: '/page2',
          name: '客流预警',
          slug: 'page2',
          icon: 'AirplayIcon',
          iframeUrl: 'http://nccc.cdmetrokyb.com/#/passengerFlowWaringHomepage'
        },
        {
          url: '/page3',
          name: '车站详情',
          slug: 'page3',
          icon: 'LifeBuoyIcon',
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
