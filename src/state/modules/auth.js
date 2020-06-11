import AWSAuth from '@aws-amplify/auth'
import * as BEEPAuth from '@api/auth.js'

let Auth = null
export const state = {
  currentUser: getSavedState('auth.currentUser'),
  currentSession: getSavedState('auth.currentSession'),
}

export const getters = {
  loggedIn: function(state) {
    return !!state.currentUser
  },
  userLocale: function(state) {
    return state.currentUser.locale || null
  },
  apiToken: function(state) {
    return (state.currentUser && state.currentUser.api_token) || null
  },
}
export const mutations = {
  SET_CURRENT_USER: function(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
  },
  SET_CURRENT_SESSION: function(state, newValue) {
    state.currentSession = newValue
    saveState('auth.currentSession', newValue)
  },
}
export const actions = {
  init: function() {
    // legacy BEEP API or AWS API?
    const BEEPApi =
      process.env.VUE_APP_API_URL &&
      process.env.VUE_APP_API_URL.indexOf('test' >= 0)

    Auth = BEEPApi ? BEEPAuth : AWSAuth
  },

  checkConnection: function() {
    return Auth.checkConnection()
  },

  signIn: function({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn) return dispatch('validateUser')

    return Auth.signIn(username, password).then((response) => {
      const user = response.data
      commit('SET_CURRENT_USER', user)
      return user
    })
  },

  signOut: function({ _, commit, getters }) {
    if (!getters.loggedIn) {
      throw new Error('User is already logged out.')
    }

    Auth.signOut().then(() => {
      commit('SET_CURRENT_USER', null)
      window.localStorage.removeItem('auth')
      return null
    })
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validateUser: function({ state, commit, dispatch }) {
    return (
      state.currentUser ||
      Auth.currentAuthenticatedUser()
        .then((response) => {
          const user = response.data
          commit('SET_CURRENT_USER', user)
          return user
        })
        .catch((error) => {
          if (error.response && error.response.status === 401)
            return dispatch('auth/signOut')
        })
    )
  },
  validateSession: function({ _, commit }) {
    return Auth.currentSession()
      .then((response) => {
        const session = response.data
        commit('SET_CURRENT_SESSION', session)
        return session
      })
      .catch((_) => {
        return commit('SET_CURRENT_SESSION', null)
      })
  },

  signUp: function(_, credentials) {
    return Auth.signUp(credentials)
  },
  confirmSignUp: function(_, signup) {
    return Auth.confirmSignUp(signup.username, signup.code)
  },
  forgotPassword: function(_, username) {
    return Auth.forgotPassword(username)
  },
  forgotPasswordSubmit: function(_, forgotPasswordRequest) {
    return Auth.forgotPasswordSubmit(
      forgotPasswordRequest.email,
      forgotPasswordRequest.verificationCode,
      forgotPasswordRequest.newPassword
    )
  },
  setLocale: function({ commit, getters }, locale) {
    if (getters.loggedIn) {
      const user = state.currentUser
      const email = user.email
      user.locale = locale
      Auth.setLocale(email, locale).then(() => {
        return commit('SET_CURRENT_USER', user)
      })
    } else {
      return false
    }
  },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
  // use LocalStorage, could use cookie, opinions vary, see also:
  // https://auth0.com/docs/tokens/guides/store-tokens
  window.localStorage.setItem(key, JSON.stringify(state))
}

function getSavedState(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    return undefined
  }
}
