import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import apiary from './apiary'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    apiary,
  },
  strict: debug,
})