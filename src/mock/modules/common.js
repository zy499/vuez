/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 21:43:24
 * @LastEditors: zy
 * @LastEditTime: 2019-10-11 01:17:44
 */
import Mock from 'mockjs'

// 登录
export function login () {
  return {
    // isOpen: false,
    url: '/sys/login',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'expire': Mock.Random.natural(60 * 60 * 1, 60 * 60 * 12),
      'token': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32),
      'menuList': [
        {
          url: '/',
          name: 'Home',
          slug: 'home',
          icon: 'HomeIcon'
        },
        {
          url: '/page2',
          name: 'Page 2',
          slug: 'page2',
          icon: 'FileIcon'
        },
        {
          url: '/page3',
          name: 'Page 3',
          slug: 'page3',
          icon: 'FileIcon',
          isDisabled: true
        },
        // {
        //   url: 'http://www.baidu.com',
        //   name: 'Page 3',
        //   slug: 'page3',
        //   icon: 'FileIcon',
        //   isIframe: true
        // }
      ]
    }
  }
}

// 退出
export function logout () {
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
