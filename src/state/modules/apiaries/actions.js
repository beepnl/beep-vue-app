export function selectApiary({ state, commit }, id) {
  const apiary = state.apiaries.find((apiary) => apiary.id === id)
  if (apiary) {
    commit('setSelectedApiary', apiary)
    return apiary
  }
  return false
}
export function editOn({ commit }) {
  return commit('setEditable', true)
}
export function editOff({ commit }) {
  return commit('setEditable', false)
}
export function selectHive({ commit }, payload) {
  return commit('selectHive', payload || {})
}
export function unselectHives({ commit }) {
  return commit('unselectHives')
}
export function addHive({ commit }, payload) {
  return commit('addHive', payload || {})
}
export function createApiary({ commit }) {
  return commit('createApiary')
}
export function updateApiary({ commit }, payload) {
  return commit('updateApiary', payload || {})
}
export function deleteApiary({ commit }, payload) {
  return commit('deleteApiary', payload || {})
}
