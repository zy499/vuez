/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 20:57:07
 * @LastEditors: zy
 * @LastEditTime: 2019-10-15 16:15:13
 */

import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { clearLoginInfo } from '@/utils'
Vue.use(Router)
NProgress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
NProgress.set(0.4)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/page2',
          name: 'page-2',
          component: () => import('./views/Page2.vue')
        },
        {
          path: '/page3',
          name: 'page-3',
          component: null,
          meta: {
            iframeUrl: 'http://nccc.cdmetrokyb.com/#/passengerFlowWaringHomepage'
          }
        },
        {
          path: '/page4',
          name: 'page-4',
          component: null,
          meta: {
            iframeUrl: 'http://nccc.cdmetrokyb.com/#/stationDetails'
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
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
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.name !== 'login') {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
  }
  next()
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
