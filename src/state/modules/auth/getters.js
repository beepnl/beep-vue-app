export function loggedIn(state) {
  return !!state.currentUser
}

export function apiToken(state) {
  return (state.currentUser && state.currentUser.api_token) || null
}
