import axios from './axios'
export function checkConnection() {
  // FIXME: do a lightweight unauthed ping/HEAD request to check if API is up
  // return axios.head('/')
  return Promise.resolve(true)
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

export function setLocale(email, locale) {
  return axios.patch('/user', {
    email,
    locale,
  })
}

export function currentAuthenticatedUser() {
  return axios.post('/authenticate')
}

export function currentSession() {
  // FIXME: Sessions aren't stored on current BEEP API, return true for AWS parity
  return Promise.resolve({ data: true })
}
