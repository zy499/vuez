<!--
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 14:50:54
 * @LastEditors: zy
 * @LastEditTime: 2019-10-16 16:49:40
 -->
<template>
  <div class="layout--main" :class="[layoutTypeClass, navbarClasses, footerClasses, {'app-page': isAppPage}]">

    <the-customizer
      v-if                    = "!disableCustomizer"
      :footerType             = "footerType"
      :hideScrollToTop        = "hideScrollToTop"
      :navbarType             = "navbarType"
      :navbarColor            = "navbarColor"
      :routerTransition       = "routerTransition"
      @toggleHideScrollToTop  = "toggleHideScrollToTop"
      @updateFooter           = "updateFooter"
      @updateNavbar           = "updateNavbar"
      @updateNavbarColor      = "updateNavbarColor"
      @updateRouterTransition = "updateRouterTransition" />

    <v-nav-menu
      :navMenuItems = "navMenuItems"
      :logo         = "navMenuLogo"
      title         = ""
      parent        = ".layout--main" />

    <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <div id="content-overlay" />

    <!-- Navbar -->
    <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1200">
      <the-navbar-horizontal
        :navbarType= "navbarType"
        :logo= "navMenuLogo"
        :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]" />

      <div style="height: 62px" v-if="navbarType === 'static'"></div>

      <h-nav-menu
        :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]"
        :navMenuItems="navMenuItems" />
    </template>

    <template v-else>
      <the-navbar-vertical
        :navbarColor="navbarColor"
        :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]" />
    </template>
    <!-- /Navbar -->

      <div class="content-wrapper">

        <div class="router-view" :style="{height:$route.meta.iframeUrl ? ($store.state.mainLayoutType === 'vertical' ? 'calc(100vh - 6.5rem)' : 'calc(100vh - 11.5rem)') : ''}">
          <div class="router-content" :style="{height:$route.meta.iframeUrl ? '100%': ''}">

            <transition :name="routerTransition">

              <div v-if="$route.meta.breadcrumb || $route.meta.pageTitle" class="router-header flex flex-wrap items-center mb-6">
                <div
                  class="content-area__heading"
                  :class="{'pr-4 border-0 md:border-r border-solid border-grey-light' : $route.meta.breadcrumb}">
                  <h2 class="mb-1">{{ routeTitle }}</h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb class="ml-4 md:block hidden" v-if="$route.meta.breadcrumb" :route="$route" />

                <!-- DROPDOWN -->
                <vs-dropdown vs-trigger-click class="ml-auto md:block hidden cursor-pointer">
                  <vs-button radius icon="icon-settings" icon-pack="feather" />

                  <vs-dropdown-menu class="w-32">
                    <vs-dropdown-item>
                      <div @click="$router.push('/pages/profile').catch(() => {})" class="flex items-center">
                        <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div @click="$router.push('/apps/todo').catch(() => {})" class="flex items-center">
                        <feather-icon icon="CheckSquareIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                        <span>Tasks</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div @click="$router.push('/apps/email').catch(() => {})" class="flex items-center">
                        <feather-icon icon="MailIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                        <span>Inbox</span>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>

                </vs-dropdown>

              </div>
            </transition>

            <div class="content-area__content" :style="{height:$route.meta.iframeUrl ? '100%': ''}">

              <back-to-top bottom="5%" visibleoffset="500" v-if="!hideScrollToTop">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg btn-back-to-top" />
              </back-to-top>
              <transition :name="routerTransition" mode="out-in">
                <router-view v-if="!$route.meta.iframeUrl"  @changeRouteTitle="changeRouteTitle"></router-view>
                 <iframe
                    v-else
                    :src="$route.meta.iframeUrl"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="auto"
                    ref="myIframe"
                  ></iframe>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>

<script>
import { isURL } from '@/utils/validate'
import BackToTop from 'vue-backtotop'
import HNavMenu from '@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue'
// import navMenuItems from '@/layouts/components/vertical-nav-menu/navMenuItems.js'
import TheCustomizer from '@/layouts/components/customizer/TheCustomizer.vue'
import TheNavbarHorizontal from '@/layouts/components/navbar/TheNavbarHorizontal.vue'
import TheNavbarVertical from '@/layouts/components/navbar/TheNavbarVertical.vue'
import TheFooter from '@/layouts/components/TheFooter.vue'
import themeConfig from '@/../themeConfig.js'
import VNavMenu from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue'

export default {
  components: {
    BackToTop,
    HNavMenu,
    TheCustomizer,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu
  },
  data () {
    return {
      iframeWin: null,
      disableCustomizer: themeConfig.disableCustomizer,
      disableThemeTour: themeConfig.disableThemeTour,
      footerType: themeConfig.footerType || 'static',
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || '#fff',
      navbarType: themeConfig.navbarType || 'floating',
      navMenuItems: [],
      navMenuLogo: require('@/assets/images/logo/logo.png'),
      routerTransition: themeConfig.routerTransition || 'none',
      routeTitle: this.$route.meta.pageTitle
    }
  },
  watch: {
    '$route' () {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark (val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff'
      this.updateNavbarColor(color)
    },
    '$store.state.mainLayoutType' (val) {
      this.setNavMenuVisibility(val)
      this.disableThemeTour = true
    },
    windowWidth (val) {
      if (val < 1200) this.disableThemeTour = true
    },
    verticalNavMenuWidth () {
      this.disableThemeTour = true
    }
  },
  computed: {
    bodyOverlay () { return this.$store.state.bodyOverlay },
    // eslint-disable-next-line vue/return-in-computed-property
    contentAreaClass () {
      if (this.mainLayoutType === 'vertical') {
        if (this.verticalNavMenuWidth === 'default') {
          return 'content-area-reduced'
        } else if (this.verticalNavMenuWidth === 'reduced') {
          return 'content-area-lg'
        }
      } else {
        return 'content-area-full'
      }
    },
    footerClasses () {
      return {
        'footer-hidden': this.footerType === 'hidden',
        'footer-sticky': this.footerType === 'sticky',
        'footer-static': this.footerType === 'static'
      }
    },
    isAppPage () {
      return !!this.$route.path.includes('/apps/')
    },
    isThemeDark () { return this.$store.state.theme === 'dark' },
    layoutTypeClass () { return `main-${this.mainLayoutType}` },
    mainLayoutType () { return this.$store.state.mainLayoutType },
    navbarClasses () {
      return {
        'navbar-hidden': this.navbarType === 'hidden',
        'navbar-sticky': this.navbarType === 'sticky',
        'navbar-static': this.navbarType === 'static',
        'navbar-floating': this.navbarType === 'floating'
      }
    },
    verticalNavMenuWidth () { return this.$store.state.verticalNavMenuWidth },
    windowWidth () { return this.$store.state.windowWidth }
  },
  methods: {
    isURL (str) {
      return isURL(str)
    },
    // handleMessage (event) {
    //   const { data } = event
    //   switch (data.cmd) {
    //     case 'returnHeight':
    //       if (data.params.success) {
    //         console.log(data.params.data)
    //         this.iframeWin.height = data.params.data + 300 + 'px'
    //       }
    //   }
    // },
    changeRouteTitle (title) {
      this.routeTitle = title
    },
    updateNavbar (val) {
      if (val === 'static') this.updateNavbarColor('#fff')
      this.navbarType = val
    },
    updateNavbarColor (val) {
      this.navbarColor = val
      if (val === '#fff') this.isNavbarDark = false
      else this.isNavbarDark = true
    },
    updateFooter (val) {
      this.footerType = val
    },
    updateRouterTransition (val) {
      this.routerTransition = val
    },
    setNavMenuVisibility (layoutType) {
      if ((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === 'vertical' && this.windowWidth < 1200)) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
      } else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
      }
    },
    toggleHideScrollToTop (val) {
      this.hideScrollToTop = val
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.setIframeHeight(document.getElementById('myIframe'))
      window.addEventListener('message', this.handleMessage)
      this.iframeWin = this.$refs.myIframe
    })
  },
  created () {
    const color = this.navbarColor === '#fff' && this.isThemeDark ? '#10163a' : this.navbarColor
    this.updateNavbarColor(color)
    this.setNavMenuVisibility(this.$store.state.mainLayoutType)
    this.navMenuItems = [this.navMenuItems, ...JSON.parse(sessionStorage.getItem('menuList'))]
  }
}

</script>

<style>
  /*- scrollbar -*/
  ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
  }
  ::-webkit-scrollbar-thumb{
      background-color: rgb(204, 207, 209);
      -webkit-border-radius: 5px;
      border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:vertical:hover{
      background-color: #666;
  }
  ::-webkit-scrollbar-thumb:vertical:active{
      background-color: #333;
  }
  ::-webkit-scrollbar-button{
      display: none;
  }
  ::-webkit-scrollbar-track{
      background-color: #f1f1f1;
  }
</style>
