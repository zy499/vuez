<!--
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-10 20:57:07
 * @LastEditors: zy
 * @LastEditTime: 2019-10-11 01:17:19
 -->
<template>
  <div
    class="vs-sidebar--item"
    :class="[
      {'vs-sidebar-item-active'            : activeLink},
      {'disabled-item pointer-events-none' : isDisabled}
    ]"
  >
    <router-link
      v-if="to"
      exact
      :class="[{'router-link-active': activeLink}]"
      :to="to"
      :target="target"
    >
      <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
      <feather-icon v-else :class="{'w-3 h-3': iconSmall}" :icon="icon" />
      <slot />
    </router-link>

    <a v-else :target="target" :href="href">
      <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
      <feather-icon v-else :class="{'w-3 h-3': iconSmall}" :icon="icon" />
      <slot />
    </a>
  </div>
</template>

<script>
export default {
  name: "v-nav-menu-item",
  props: {
    icon: { type: String, default: "" },
    iconSmall: { type: Boolean, default: false },
    iconPack: { type: String, default: "material-icons" },
    href: { type: [String, null], default: "#" },
    to: { type: [String, Object, null], default: null },
    slug: { type: String, default: null },
    index: { type: [String, Number], default: null },
    featherIcon: { type: Boolean, default: true },
    target: { type: String, default: "_self" },
    isDisabled: { type: Boolean, default: false },
    isIframe: { type: Boolean, default: false },
    url: { type: String }
  },
  computed: {
    activeLink() {
      // eslint-disable-next-line no-mixed-operators
      return !!(
        this.to === this.$route.path ||
        (this.$route.meta.parent === this.slug && this.to)
      );
    }
  }
};
</script>
