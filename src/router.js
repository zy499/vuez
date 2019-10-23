/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 20:57:07
 * @LastEditors: zy
 * @LastEditTime: 2019-10-22 16:18:53
 */

import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { clearLoginInfo } from '@/utils'
Vue.use(Router)
NProgress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
NProgress.set(0.4)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/',
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('./views/DashboardAnalytics.vue'),
        },
        {
          path: '/dashboard/home',
          name: 'dashboard-home',
          component: () => import('./views/Home.vue'),
        },
        {
          path: '/page',
          name: 'page',
          component: () => import('./views/Page2.vue')
        },
        {
          path: '/page2',
          name: 'page2',
          component: null,
          meta: {
            iframeUrl: 'http://nccc.cdmetrokyb.com/#/passengerFlowWaringHomepage'
          }
        },
        {
          path: '/page3',
          name: 'page3',
          component: null,
          meta: {
            iframeUrl: 'http://nccc.cdmetrokyb.com/#/stationDetails'
          }
        },
        {
          path: '/page4',
          name: 'page4',
          component: () => import('./views/Page2.vue')
        }
      ]
    },
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      router.push({ name: 'login' })
    } else {
      if (to.path !== '/' && to.path !== '/pages/error-404') {
        if (JSON.parse(sessionStorage.getItem('menuList')) && JSON.parse(sessionStorage.getItem('menuList')).length > 0) {
          if (!isAuthMenu(to, JSON.parse(sessionStorage.getItem('menuList')))) {
            next({ name: 'page-error-404' })
          } else {
            next()
          }
        } else {
          http({
            url: http.adornUrl('sys/menuList'),
            method: 'get',
            params: http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === '00000000') {
              sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
              if(!JSON.parse(localStorage.getItem('navBarSearchAndPinList'))) {
                if (data.menuList && data.menuList.length > 0) {
                  localStorage.setItem('navBarSearchAndPinList', JSON.stringify(setNavBarSearchAndPinList(data.menuList)))
                }
              }
              next()
              // sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
            } else {
              sessionStorage.setItem('menuList', '[]')
              next()
              // sessionStorage.setItem('permissions', '[]')
            }
          }).catch((e) => {
            console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
            router.push({ name: 'login' })
          })
        }
      } else {
        next()
      }
    }
  }
})
/**
 * 是否有路由权限
 * @param {*} to 当前路由
 * @param {*} menuList 路由表
 */
function isAuthMenu(to, menuList) {
  let result = false
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].submenu && menuList[i].submenu.length > 0) {
      for (let a = 0; a < menuList[i].submenu.length; a++) {
        if (to.path === menuList[i].submenu[a].url && !menuList[i].submenu[a].isDisabled) {
          result = true
        }
      }
    } else {
      if (to.path === menuList[i].url && !menuList[i].isDisabled) {
        result = true
      }
    }
  }
  return result
}

function setNavBarSearchAndPinList (menuList = []) {
  let navBarSearchAndPinList = {
    actionIcon: 'StarIcon',
    highlightColor: 'warning',
    data: []
  }
  if (menuList && menuList.length > 0) {
    const menuArr = menuList 
    let index = 0
    for(let i=0;i < menuArr.length; i++){
      if (menuArr[i].url && !menuArr[i].isDisabled) {
        index++
        navBarSearchAndPinList.data.push({
          index : index,
          label: menuArr[i].name,
          url: menuArr[i].url,
          labelIcon: menuArr[i].icon,
          highlightAction: false
        })
      }
      if (menuArr[i].submenu && menuArr[i].submenu.length > 0) {
        const subMenuArr = menuArr[i].submenu
        for(let c = 0; c < subMenuArr.length; c++) {
          if (subMenuArr[c].url && !subMenuArr[c].isDisabled) {
            index++
            navBarSearchAndPinList.data.push({
              index : index,
              label: subMenuArr[c].name,
              url: subMenuArr[c].url,
              labelIcon: subMenuArr[c].icon,
              highlightAction: false
            })
          }
        }
      }
    }
    return navBarSearchAndPinList
  }
}
router.afterEach(() => {
  NProgress.done()
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
