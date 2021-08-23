<template>
  <v-app id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView :key="$route.fullPath" />
  </v-app>
</template>

<script>
export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title
        ? `${title} | ${this.$i18n.t('Site_title')}`
        : this.$i18n.t('Site_title')
    },
  },
}
</script>

<style lang="scss">
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress

/* Make clicks pass-through */
// #nprogress {
//   pointer-events: none;
// }

// #nprogress .bar {
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 1031;
//   width: 100%;
//   height: 2px;
//   background: $color-orange-medium;
// }

// /* Fancy blur effect */
// #nprogress .peg {
//   position: absolute;
//   right: 0;
//   display: block;
//   width: 100px;
//   height: 100%;
//   opacity: 1;
//   -webkit-transform: rotate(3deg) translate(0, -4px);
//   -ms-transform: rotate(3deg) translate(0, -4px);
//   transform: rotate(3deg) translate(0, -4px);
// }

// .nprogress-custom-parent {
//   position: relative;
//   overflow: hidden;
// }

// .nprogress-custom-parent #nprogress .bar {
//   position: absolute;
// }
</style>
