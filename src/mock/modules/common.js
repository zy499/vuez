/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 21:43:24
 * @LastEditors: zy
 * @LastEditTime: 2019-10-23 13:45:50
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
      'code': '00000000',
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
      'code': '00000000',
      'menuList': [
        {
          url: null,
          name: "客流监测与预警",
          tag: "2",
          tagColor: "warning",
          icon: "HomeIcon",
          submenu: [
            {
              url: '/passengerFlowWaringHomepage',
              name: '主页',
              slug: 'passengerFlowWaringHomepage',
              iframeUrl: 'http://nccc.cdmetrokyb.com/#/passengerFlowWaringHomepage',
              icon: 'HomeIcon'
            },
            {
              url: '/stationDetails',
              name: '车站详情',
              slug: 'stationDetails',
              iframeUrl: 'http://nccc.cdmetrokyb.com/#/stationDetails',
              icon: 'LifeBuoyIcon'
            }
          ]
        },
        {
          url: null,
          name: "客流时空状态分布",
          icon: "MapIcon",
          submenu: [
            {
              url: '/network',
              name: '线网分布',
              slug: 'network',
              iframeUrl: 'http://nccc.cdmetrokyb.com/#/network',
              icon: 'LifeIcon'
            },
            {
              url: '/od',
              name: 'OD分布',
              slug: 'od',
              iframeUrl: 'http://nccc.cdmetrokyb.com/#/od',
              icon: 'LifeIcon'
            }
          ]
        },
        {
          url: null,
          name: "报表定制与展现",
          icon: "BarChart2Icon",
          submenu: [
            {
              url: 'http://10.76.230.81:9881/#/metro/analysis',
              name: '统计分析',
              slug: 'external',
              target: '_blank',
              icon: 'LifeIcon'
            },
            {
              url: 'http://10.76.230.81:9881/#/metro/compare',
              name: '数据对比',
              slug: 'external',
              target: '_blank',
              icon: 'LifeIcon'
            },
            {
              url: 'http://10.76.230.81:9881/#/metro/report',
              name: '固定报表',
              slug: 'external',
              target: '_blank',
              icon: 'LifeIcon'
            },
            {
              url: 'http://10.76.230.81:9881/#/metro/mopes',
              name: 'MOPES',
              slug: 'external',
              target: '_blank',
              icon: 'LifeIcon'
            },
          ]
        },
        {
          url: "/networkComparison",
          name: "线网运力运量对比分析",
          slug: "networkComparison",
          iframeUrl: 'http://nccc.cdmetrokyb.com/#/networkComparison',
          icon: 'BarChartIcon'
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
      'code': '00000000'
    }
  }
}
