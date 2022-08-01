import Vue from 'vue'
import router from '@router'
import store from '@state/store'
import vuetify from '@plugins/vuetify'
import VueI18n from 'vue-i18n'
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
import vueCountryRegionSelect from 'vue-country-region-select'
import './plugins/element.js'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import VueEllipseProgress from 'vue-ellipse-progress'

import App from './app.vue'

Vue.use(VueI18n)
Vue.use(vueCountryRegionSelect)
Vue.use(VueEllipseProgress)
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
