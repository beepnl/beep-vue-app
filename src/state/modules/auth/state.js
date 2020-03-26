export default function() {
  return {
    currentUser: getSavedState('auth.currentUser'),
    currentSession: getSavedState('auth.currentSession'),
  }
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    return undefined
  }
}
