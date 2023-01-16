import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import minifyTheme from 'minify-css-string'

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'xs', // This is equivalent to a value of 600
  },
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: false,
    themes: {
      options: { minifyTheme },
      light: {
        primary: '#F8B133',
        secondary: colors.black,
        accent: '#f29100',
      },
      dark: {
        primary: '#F8B133',
        background: colors.black,
        accent: colors.white,
      },
    },
  },
})
