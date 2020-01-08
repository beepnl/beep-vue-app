import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import apiaries from './apiaries'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      isLoading: false,
    }
  },

  mutations: {
    startLoading(state) {
      state.isLoading = true
    },
    doneLoading(state) {
      state.isLoading = false
    },
  },

  actions: {
    startLoading({ commit }) {
      return commit('startLoading')
    },
    doneLoading({ commit }) {
      return setTimeout(() => {
        // FIXME: remove timeout (visual indicator only)
        commit('doneLoading')
      }, 1000)
    },
  },
  modules: {
    auth,
    apiaries,
  },
  strict: debug,
})
