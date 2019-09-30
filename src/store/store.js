import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@/store/modules/Auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Auth,
  },
})

export default store
