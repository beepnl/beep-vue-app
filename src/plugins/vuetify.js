import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'xs', // This is equivalent to a value of 600
  },
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#F8B133',
        secondary: colors.black,
        accent: '#f29100',
      },
    },
  },
})
