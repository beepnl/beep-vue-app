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
import moment from 'moment'

import App from './app.vue'

Vue.use(VueI18n)
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
  locale: navigator.language.split('-')[0] || 'en',
  messages: {
    de,
    en,
    es,
    fr,
    nl,
    pt,
    ro,
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
