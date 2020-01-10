import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Auth from '@aws-amplify/auth'
import AsyncComputed from 'vue-async-computed'
import VueChartist from 'vue-chartist'
import 'chartist/dist/chartist.min.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import BackBar from '@/components/header/BackBar'
Vue.component('BackBar', BackBar)

Auth.configure({
  userPoolId: process.env.VUE_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.VUE_APP_CLIENT_ID,
  region: process.env.VUE_APP_REGION,
})

Vue.use(Auth)
Vue.use(AsyncComputed)
Vue.use(VueChartist)
Vue.use(VueVirtualScroller)
// Vue.use(require('vue-faker'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
