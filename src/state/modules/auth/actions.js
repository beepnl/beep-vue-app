import AWSAuth from '@aws-amplify/auth'
import * as BEEPAuth from '@/src/state/api/auth.js'

let Auth
export function init({ dispatch }) {
  // legacy BEEP API or AWS API?
  const BEEPApi =
    process.env.VUE_APP_API_URL &&
    process.env.VUE_APP_API_URL.indexOf('test.beep.nl/api' >= 0)

  Auth = BEEPApi ? BEEPAuth : AWSAuth
  if (BEEPApi) {
    BEEPAuth.init()
  }

  dispatch('validateUser')
  dispatch('validateSession')
}

export function signIn(
  { commit, dispatch, getters },
  { username, password } = {}
) {
  if (getters.loggedIn) return dispatch('validateUser')

  return Auth.signIn(username, password).then((response) => {
    const user = response.data

    commit('SET_CURRENT_USER', user)
    return user
  })
}
export function checkConnection() {
  return Auth.checkConnection()
}

export function logout({ _, commit, getters }) {
  if (!getters.loggedIn) {
    throw new Error('User is already logged out.')
  }

  Auth.signOut().then(() => {
    commit('SET_CURRENT_USER', null)
    return null
  })
}

// Validates the current user's token and refreshes it
// with new data from the API.
export function validateUser({ state, commit, dispatch }) {
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
}
export function validateSession({ _, commit }) {
  return Auth.currentSession()
    .then((response) => {
      const session = response.data
      commit('SET_CURRENT_SESSION', session)
      return session
    })
    .catch((_) => {
      return commit('SET_CURRENT_SESSION', null)
    })
}

export function signUp(_, credentials) {
  return Auth.signUp(credentials)
}
export function confirmSignUp(_, signup) {
  return Auth.confirmSignUp(signup.username, signup.code)
}
export function forgotPassword(_, username) {
  return Auth.forgotPassword(username)
}
export function forgotPasswordSubmit(_, forgotPasswordRequest) {
  return Auth.forgotPasswordSubmit(
    forgotPasswordRequest.email,
    forgotPasswordRequest.verificationCode,
    forgotPasswordRequest.newPassword
  )
}
