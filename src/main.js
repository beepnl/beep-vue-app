import Vue from 'vue'
import router from '@router'
import store from '@state/store'
import vuetify from '@plugins/vuetify'
import VueI18n from 'vue-i18n'
import de from '@assets/js/lang/de'
import en from '@assets/js/lang/en'
import es from '@assets/js/lang/es'
import fr from '@assets/js/lang/fr'
import nl from '@assets/js/lang/nl'
import pt from '@assets/js/lang/pt'
import ro from '@assets/js/lang/ro'
// import enUS from '@assets/js/lang/en-US'
import languages from '@assets/js/lang/languages'
import moment from 'moment'
import vueCountryRegionSelect from 'vue-country-region-select'
import './plugins/element.js'
import 'chartist-plugin-legend'
import 'chartist-plugin-pointlabels'

import App from './app.vue'

Vue.use(VueI18n)
Vue.use(vueCountryRegionSelect)
Vue.use(require('vue-chartist'))
Vue.prototype.$moment = moment

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const i18n = new VueI18n({
  // legacy: true,
  locale: languages.checkBrowserLanguage() || 'en',
  messages: {
    de,
    en,
    es,
    fr,
    nl,
    pt,
    ro,
    // add 4-letter code like: 'en-US': enUS, (can only be imported without dash, as enUS)
  },
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = App
}
