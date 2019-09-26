import Auth from '@aws-amplify/auth'

export default {
  namespaced: true,

  state: {
    user: {},
    session: {},
  },

  getters: {
    isLoggedIn: (store = {}) => {
      const session = store.session
      if (!session) return false

      const accessToken = 'accessToken' in session
      if (!accessToken) return false

      const hasToken = 'jwtToken' in accessToken
      if (!hasToken) return false

      return new Date(accessToken.payload.exp * 1000) > new Date()
    },
    session: (store = {}) => {
      return 'session' in store && Object.keys(store.session).length > 0
        ? store.session
        : null
    },
    username: (store = {}) =>
      store.user && store.user.user ? store.user.user.username : null,
  },

  actions: {
    signIn: async ({ commit }, credentials) => {
      const user = await Auth.signIn(credentials.username, credentials.password)
      commit('setUser', user)
    },
    signOut: async ({ commit, getters }) => {
      if (!getters.isLoggedIn) {
        throw new Error('User is already logged out.')
      }

      await Auth.signOut()
      commit('clearUserAndSession')
    },
  },

  mutations: {
    setUser: (state, user) => {
      state.user = { ...user }
      if ('signInUserSession' in user) {
        state.session = user.signInUserSession
      }
    },
    clearUserAndSession: state => {
      state.user = {}
      state.session = {}
    },
  },
}
