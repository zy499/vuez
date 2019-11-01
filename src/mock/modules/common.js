/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 21:43:24
 * @LastEditors: zy
 * @LastEditTime: 2019-10-31 16:39:38
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
      'data': [
        {
          id: 1,
          parentId: 0,
          url: null,
          name: "客流监测与预警",
          tag: "2",
          tagColor: "warning",
          icon: "HomeIcon",
          submenu: [
            {
              id: 11,
              parentId: 1,
              url: '/passengerFlowWaringHomepage',
              name: '主页',
              slug: 'passengerFlowWaringHomepage',
              iframeUrl: 'http://192.168.1.131:8001/#/passengerFlowWaringHomepage',
              icon: 'HomeIcon'
            },
            {
              id: 12,
              parentId: 1,
              url: '/stationDetails',
              name: '车站详情',
              slug: 'stationDetails',
              iframeUrl: 'http://192.168.1.131:8001/#/stationDetails',
              icon: 'LifeBuoyIcon'
            }
          ]
        },
        {
          id: 2,
          parentId: 0,
          url: null,
          name: "客流时空状态分布",
          icon: "MapIcon",
          submenu: [
            {
              id: 21,
              parentId: 2,
              url: '/network',
              name: '线网分布',
              slug: 'network',
              iframeUrl: 'http://192.168.1.131:8001/#/network',
              icon: 'LifeIcon'
            },
            {
              id: 22,
              parentId: 2,
              url: '/od',
              name: 'OD分布',
              slug: 'od',
              iframeUrl: 'http://192.168.1.131:8001/#/od',
              icon: 'LifeIcon'
            }
          ]
        },
        {
          id: 3,
          parentId: 0,
          url: null,
          name: "报表定制与展现",
          icon: "BarChart2Icon",
          submenu: [
            {
              id: 31,
              parentId: 3,
              url: 'http://10.76.230.81:9881/#/metro/analysis',
              name: '统计分析',
              slug: 'external',
              target: '_blank',
              icon: 'LifeIcon'
            },
            {
              id: 32,
              parentId: 3,
              url: 'http://10.76.230.81:9881/#/metro/compare',
              name: '数据对比',
              slug: 'external',
              target: '_blank',
              icon: 'LifeIcon'
            },
            {
              id: 33,
              parentId: 3,
              url: 'http://10.76.230.81:9881/#/metro/report',
              name: '固定报表',
              slug: 'external',
              target: '_blank',
              icon: 'LifeIcon'
            },
            {
              id: 34,
              parentId: 3,
              url: 'http://10.76.230.81:9881/#/metro/mopes',
              name: 'MOPES',
              slug: 'external',
              target: '_blank',
              icon: 'LifeIcon'
            },
          ]
        },
        {
          id: 4,
          parentId: 0,
          url: "/networkComparison",
          name: "线网运力运量对比分析",
          slug: "networkComparison",
          iframeUrl: 'http://192.168.1.131:8001/#/networkComparison',
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
