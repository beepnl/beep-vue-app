<template>
  <v-app id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <keep-alive>
      <RouterView :key="$route.fullPath" />
    </keep-alive>
  </v-app>
</template>

<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

<style lang="scss">
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

#nprogress .bar {
  background: orange;
}
</style>
