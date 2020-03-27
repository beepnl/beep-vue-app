import axios from 'axios'
import store from '@state/store'
export function init() {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  axios.interceptors.response.use(undefined, function(err) {
    return new Promise((resolve, reject) => {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        store.dispatch('auth/signOut')
      }
      throw err
    })
  })

  // Add API token dynamically
  axios.interceptors.request.use(function(config) {
    const apiToken = store.getters['auth/apiToken']
    config.headers.common.Authorization = 'Bearer ' + apiToken
    return config
  })
}
export function checkConnection() {
  return axios.head('/')
}
// provide the same interface as '@aws-amplify/auth' to the TEST beep backend
export function signIn(username, password) {
  // current BEEP usernames are email addresses
  return axios.post('/login', { email: username, password })
}

export function signOut() {
  // Contrary to AWS auth, there's no session to invalidate on the existing
  // BEEP backend, so just return
  return Promise.resolve(null)
}

export function signUp({ username, password, policyAccepted } = {}) {
  // For the existing BEEP backend, policy must be accepted during registration
  return axios.post('/register', {
    email: username,
    password,
    policy_accepted: policyAccepted,
  })
}

export function confirmSignUp(token) {
  return axios.post('/email/verify', {
    id: token,
  })
}

export function resendEmailVerification(email) {
  return axios.post('/email/resend', {
    email,
  })
}

export function forgotPassword(username) {
  return axios.post('/user/reminder', {
    email: username,
  })
}

export function forgotPasswordSubmit(email, verificationCode, newPassword) {
  return axios.post('/user/reset', {
    email,
    token: verificationCode,
    password: newPassword,
    password_confirm: newPassword, // FIXME: confirmation is not present in AWSAuth
  })
}

export function currentAuthenticatedUser() {
  return axios.post('/authenticate')
}

export function currentSession() {
  // FIXME: Sessions aren't stored on current BEEP API, return true for AWS parity
  return Promise.resolve({ data: true })
}
