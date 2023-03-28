import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'dashboard' })

export const state = {
  ...resource.state,
  dashboard: {},
  landscapeMode: true,
  selectedHive: null,
}
export const getters = {
  ...resource.getters,
  dashboard: (state) => {
    return state.dashboard
  },
  landscapeMode: (state) => {
    return state.landscapeMode
  },
  selectedHive: (state) => {
    return state.selectedHive
  },
}
export const mutations = {
  ...resource.mutations,
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  resetState: function(state) {
    state.dashboard = {}
    state.landscapeMode = true
    state.selectedHive = null
  },
}
export const actions = {
  ...resource.actions,
}
