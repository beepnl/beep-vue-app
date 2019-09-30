import Auth from '@aws-amplify/auth'

export default {
  namespaced: true,

  state: {
    currentUser: null,
  },

  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user
    },
  },

  actions: {
    signIn: async ({ commit }, credentials) => {
      const user = await Auth.signIn(credentials.username, credentials.password)
      commit('setCurrentUser', user)
    },
    signOut: async ({ state, commit }) => {
      if (!state.currentUser) {
        throw new Error('User is already logged out.')
      }

      await Auth.signOut()
      commit('setCurrentUser', null)
    },
    signUp: async (_, credentials) => {
      await Auth.signUp(credentials)
    },
    confirmSignup: async (_, signup) => {
      await Auth.confirmSignUp(signup.username, signup.code)
    },
    forgotPassword: async (_, username) => {
      await Auth.forgotPassword(username)
    },
    forgotPasswordSubmit: async (_, forgotPasswordRequest) => {
      await Auth.forgotPasswordSubmit(
        forgotPasswordRequest.email,
        forgotPasswordRequest.verificationCode,
        forgotPasswordRequest.newPassword
      )
    },
    currentUser: async ({ commit }) => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        commit('setCurrentUser', user)
        return user
      } catch (error) {
        commit('setCurrentUser', null)
        return null
      }
    },
  },
}
