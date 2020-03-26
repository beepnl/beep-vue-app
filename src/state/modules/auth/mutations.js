export function SET_CURRENT_USER(state, newValue) {
  state.currentUser = newValue
  saveState('auth.currentUser', newValue)
}

export function SET_CURRENT_SESSION(state, newValue) {
  state.currentSession = newValue
  saveState('auth.currentSession', newValue)
}

// ===
// Private helpers
// ===

function saveState(key, state) {
  // use LocalStorage, could use cookie, opinions vary, see also:
  // https://auth0.com/docs/tokens/guides/store-tokens
  window.localStorage.setItem(key, JSON.stringify(state))
}
