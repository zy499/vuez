/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 20:57:07
 * @LastEditors: zy
 * @LastEditTime: 2019-10-17 17:41:23
 */

import Vue from 'vue'
import Router from 'vue-router'
// import http from '@/utils/httpRequest'
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
        }
      ]
    },
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
  let token = Vue.cookie.get('token')
  if (!token || !/\S/.test(token)) {
    if (to.name !== 'login') {
      clearLoginInfo()
      next({ name: 'login' })
    }
  } else {
    debugger
    if (JSON.parse(sessionStorage.getItem('menuList')) && JSON.parse(sessionStorage.getItem('menuList').length) > 1) {
      let menuList = JSON.parse(sessionStorage.getItem('menuList'))
      // let temp = []
      if (to.path === '/') {
        next()
      }
      for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].submenu && menuList[i].submenu.length > 1) {
          const submenu = menuList[i].submenu
          for(let x=0;x<submenu.length;x++) {
            if (to.path !== submenu[x].url) {
              next({ name: 'page-error-404'})
              break
            } else {
              next()
              break
            }
          }
        } else {
          if (to.path !== menuList[i].url) {
            next({ name: 'page-error-404'})
            break
          } else {
            next()
            break
          }
        }
      }
    }else {
      next()
    }
  }
  // next()
})
router.afterEach(() => {
  NProgress.done()
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
