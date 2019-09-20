import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@aws-amplify/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    getUser(context) {
      return Auth.currentAuthenticatedUser()
        .then(user => {
          if (user && user.getSignInUserSession()) {
            context.commit('setUser', user)
            return user
          }
        })
        .catch(() => {
          context.commit('setUser', null)
          return null
        })
    },
    async signOut({ dispatch, commit }) {
      const user = await dispatch('getUser')
      console.log(user)
      if (user) {
        commit('setUser', null)
        console.log(user)
        return user.signOut()
      }

      return Promise.resolve()
    },
  },
})

export default store
