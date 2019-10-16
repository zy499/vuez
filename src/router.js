/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 20:57:07
 * @LastEditors: zy
 * @LastEditTime: 2019-10-16 17:51:18
 */

import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { clearLoginInfo } from '@/utils'
Vue.use(Router)
NProgress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
NProgress.set(0.4)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由
const globalRoutes = [
  {
    path: '',
    component: () => import('@/layouts/full-page/FullPage.vue'),
    children: [
      {
        path: '/pages/login',
        name: 'login',
        component: () => import('@/views/pages/Login.vue')
      },
      {
        path: '/pages/error-404',
        name: 'page-error-404',
        component: () => import('@/views/pages/Error404.vue')
      }
    ]
  }
]

const mainRoutes = {
  path: '/',
  name: 'main',
  redirect: { name: 'home' },
  component: () => import('./layouts/main/Main.vue'),
  children: [
  ]
}
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: globalRoutes.concat(mainRoutes)
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.name !== 'login') {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
  }
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    http({
      url: http.adornUrl('sys/menuList'),
      method: 'get',
      params: http.adornParams()
    }).then(({ data }) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
        NProgress.done()
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
      NProgress.done()
    })
  }
})
router.afterEach(() => {
  NProgress.done()
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].slug,
        meta: {
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].iframeUrl)) {
        route['path'] = menuList[i].url
        route['name'] = menuList[i].slug
        route['meta']['iframeUrl'] = menuList[i].iframeUrl
      } else {
        try {
          route['component'] = _import(`${menuList[i].name}`) || null
        // eslint-disable-next-line no-empty
        } catch (err) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
