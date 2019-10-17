/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 14:52:12
 * @LastEditors: zy
 * @LastEditTime: 2019-10-17 20:30:12
 */

import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import VueCookie from 'vue-cookie' // api: https://github.com/alfhen/vue-cookie
import 'material-icons/iconfont/material-icons.css' // Material Icons
import 'vuesax/dist/vuesax.css'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

import './filters/filters'

// Tour
import VueTour from 'vue-tour'

// Tailwind
import '@/assets/css/main.css'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // Vuesax
Vue.use(VueCookie)
Vue.use(Vuesax)
Vue.use(VueHammer)
Vue.use(VueTour)
// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
// if (process.env.NODE_ENV !== 'production') {
  
// }
require('@/mock')
require('vue-tour/dist/vue-tour.css')
// Feather font icon
require('./assets/css/iconfont.css')

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth // 权限方法
Vue.prototype.$bus = new Vue() // 中央
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
