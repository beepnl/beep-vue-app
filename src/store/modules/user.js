import Auth from '@aws-amplify/auth'

export default {
  namespaced: true,

  state: {
    user: {},
    session: {},
  },

  getters: {
    isLoggedIn: (store = {}) => {
      const hasSession = 'session' in store
      if (!hasSession) return false

      const hasAccessToken = 'accessToken' in store.session
      if (!hasAccessToken) return false

      const hasToken = 'jwtToken' in store.session.accessToken
      if (!hasToken) return false

      return new Date(store.session.accessToken.payload.exp * 1000) > new Date()
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
    forgotPassword: async ({ commit }, username) => {
      await Auth.forgotPassword(username)
      commit('clearUserAndSession')
    },
    forgotPasswordSubmit: async ({ commit }, forgotPasswordRequest) => {
      await Auth.forgotPasswordSubmit(
        forgotPasswordRequest.email,
        forgotPasswordRequest.verificationCode,
        forgotPasswordRequest.newPassword
      )
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
