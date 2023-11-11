import { createApp } from 'vue'
import router from '@router'
import store from '@state/store'
import { createI18n } from 'vue-i18n'
import cs from '@public/js/lang/cs'
import de from '@public/js/lang/de'
import el from '@public/js/lang/el'
import en from '@public/js/lang/en'
import es from '@public/js/lang/es'
import fi from '@public/js/lang/fi'
import fr from '@public/js/lang/fr'
import it from '@public/js/lang/it'
import nb from '@public/js/lang/nb'
import nl from '@public/js/lang/nl'
// import pl from '@public/js/lang/pl'
import pt from '@public/js/lang/pt'
import ro from '@public/js/lang/ro'
import sv from '@public/js/lang/sv'
// import enUS from '@public/js/lang/en-US'
import languages from '@assets/js/languages'
import moment from 'moment-timezone'
import vueCountryRegionSelect from 'vue3-country-region-select'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import veProgress from 'vue-ellipse-progress'
import { ResizeObserver as Polyfill } from '@juggle/resize-observer'
import 'element-plus/es/components/input-number/style/css'
import '@assets/css/element.scss'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// * Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import App from './app.vue'

const vuetify = createVuetify({
  // default options
  defaults: {
    VAlert: {
      variant: 'tonal',
      density: 'compact',
    },
    VBtn: {
      variant: 'outlined',
      rounded: 0,
    },
    VCard: {
      variant: 'outlined',
    },
    VCardActions: {
      VBtn: {
        variant: 'outlined',
      },
    },
    VCheckbox: {
      color: 'accent',
    },
    VCheckboxBtn: {
      color: 'accent',
    },
    VList: {
      density: 'compact',
    },
    VSelect: {
      density: 'compact',
      variant: 'underlined',
    },
    VSwitch: {
      density: 'compact',
      color: 'accent',
    },
    VTable: {
      density: 'compact',
    },
    VTextArea: {
      variant: 'underlined',
    },
    VTextField: {
      variant: 'underlined',
    },
    VToolbar: {
      VBtn: {
        variant: 'outlined',
      },
    },
    VTooltip: {
      location: 'bottom',
    },
  },
  display: {
    mobileBreakpoint: 'xs',
    xs: 600,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
  // breakpoint: {
  //   mobileBreakpoint: 'xs', // This is equivalent to a value of 600
  // },
  theme: {
    defaultTheme: 'beepTheme',
    themes: {
      beepTheme: {
        light: true,
        colors: {
          primary: '#F8B133',
          secondary: '#000000',
          accent: '#f29100',
          black: '#000000',
          disabled: '#b0b0b0',
          error: '#ff001d',
          // "primary-darken-1": "#000000",
          // "secondary-darken-1": "#000000",
          // info: "#000000",
          // success: "#000000",
          // warning: "#000000",
        },
      },
      beepDarkTheme: {
        dark: true,
        colors: {
          primary: '#F8B133',
          secondary: '#000000',
          accent: '#ffffff',
        },
      },
    },
  },
})

const i18n = createI18n({
  // allowComposition: true, // you need to specify that!
  // const i18n = new VueI18n({
  //   legacy: true,
  locale: languages.checkBrowserLanguage() || 'en',
  messages: {
    cs,
    de,
    el,
    en,
    es,
    fi,
    fr,
    it,
    nb,
    nl,
    // pl,
    pt,
    ro,
    sv,
    // add 4-letter code like: 'en-US': enUS, (can only be imported without dash, as enUS)
  },
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.use(vuetify)
app.use(vueCountryRegionSelect)
app.use(veProgress)
app.config.globalProperties.$moment = moment

app.component('VueDatePicker', VueDatePicker)
app.component('DynamicScroller', DynamicScroller)
app.component('DynamicScrollerItem', DynamicScrollerItem)

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  app.config.errorHandler = window.Cypress.cy.onUncaughtException
}

// fix chartjs bug for older devices + better resize reactivity
if (typeof window !== 'undefined') {
  window.ResizeObserver = window.ResizeObserver || Polyfill
}

app.mount('#app')

// If running e2e tests...
// if (process.env.VUE_APP_TEST === 'e2e') {
//   // Attach the app to the window, which can be useful
//   // for manually setting state in Cypress commands
//   // such as `cy.logIn()`.
//   window.__app__ = App
// }
