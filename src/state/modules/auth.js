import Api from '@api/Api'

export const state = {
  currentUser: null,
  apiToken: getSavedState('auth.beepToken'),
}

export const getters = {
  apiToken: function(state) {
    return state.apiToken
  },
  loggedIn: function(state) {
    return !!state.currentUser
  },
  currentUser: function(state) {
    return state.currentUser || null
  },
  userEmail: function(state) {
    return (state.currentUser && state.currentUser.email) || null
  },
  userId: function(state) {
    return (state.currentUser && state.currentUser.id) || null
  },
  // userIsAdmin: function(state) {
  //   return (state.currentUser && state.currentUser.admin) || false
  // },
  userLocale: function(state) {
    return (state.currentUser && state.currentUser.locale) || null
  },
  userName: function(state) {
    return (state.currentUser && state.currentUser.name) || null
  },
}
export const mutations = {
  SET_CURRENT_USER: function(state, value) {
    state.currentUser = value
  },
  SET_API_TOKEN: function(state, value) {
    state.apiToken = value
    saveState('auth.beepToken', value)
  },
}
export const actions = {
  signIn: function({ commit, dispatch, getters }, credentials = {}) {
    if (getters.loggedIn) return dispatch('validateUser')

    return Api.postRequest('/login', credentials).then((response) => {
      const user = response.data
      commit('SET_CURRENT_USER', user)
      commit('SET_API_TOKEN', user.api_token)
      return user
    })
  },
  signOut: function({ _, commit, getters }) {
    console.log('sign out')

    // reset all module states
    commit('alerts/resetState', null, { root: true })
    commit('devices/resetState', null, { root: true })
    commit('groups/resetState', null, { root: true })
    commit('hives/resetState', null, { root: true })
    commit('inspections/resetState', null, { root: true })
    commit('locations/resetState', null, { root: true })
    commit('taxonomy/resetState', null, { root: true })

    commit('SET_CURRENT_USER', null)
    commit('SET_API_TOKEN', null)

    return null
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validateUser: function({ state, commit, dispatch }) {
    console.log('validate user')
    return (
      state.currentUser ||
      Api.postRequest('/authenticate')
        .then((response) => {
          const user = response.data
          commit('SET_CURRENT_USER', user)
          // api token is already correctly set, otherwise authentication would fail
          return user
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log(error.response)
            return dispatch('signOut')
          }
        })
    )
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
