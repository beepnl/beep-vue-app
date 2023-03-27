import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'dashboard' })

export const state = {
  ...resource.state,
  dashboard: {},
}
export const getters = {
  ...resource.getters,
  dashboard: (state) => {
    return state.dashboard
  },
}
export const mutations = {
  ...resource.mutations,
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  resetState: function(state) {
    state.dashboard = {}
  },
}
export const actions = {
  ...resource.actions,
}
