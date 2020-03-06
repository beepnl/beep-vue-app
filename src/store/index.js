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
      menuItems: [],
      tabs: [
        {
          title: 'Apiaries',
          icon: 'mdi-beehive-outline',
          route: 'apiaries',
        },
        { title: 'Diary', icon: 'mdi-calendar-edit', route: 'diary' },
        { title: 'Data', icon: 'mdi-chart-line', route: 'data' },
        { title: 'Photos', icon: 'mdi-image-multiple', route: 'photos' },
      ],
    }
  },

  mutations: {
    startLoading(state) {
      state.isLoading = true
    },
    doneLoading(state) {
      state.isLoading = false
    },
    setMenu(state, menuItems) {
      state.menuItems = menuItems
    },
  },

  actions: {
    startLoading({ commit }) {
      return commit('startLoading')
    },
    doneLoading({ commit }) {
      commit('doneLoading')
    },
    setMenu({ commit }, menuItems) {
      return commit('setMenu', menuItems)
    },
  },
  modules: {
    auth,
    apiaries,
  },
  strict: debug,
})
