import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'groups' })

export const state = {
  ...resource.state,
  dashboardEdited: false,
  dashboard: {},
  groups: [],
  groupEdited: false,
  invitations: [],
}
export const getters = {
  ...resource.getters,
  dashboardEdited: (state) => {
    return state.dashboardEdited
  },
  dashboard: (state) => {
    return state.dashboard
  },
  groups: (state) => {
    return state.groups || []
  },
  groupEdited: (state) => {
    return state.groupEdited
  },
  invitations: (state) => {
    return state.invitations || []
  },
}
export const mutations = {
  ...resource.mutations,
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  setGroupEdited: function(state, bool) {
    state.groupEdited = bool
  },
  setGroups: function(state, payload) {
    state.groups = payload
  },
  setInvitations: function(state, payload) {
    state.invitations = payload
  },
  resetState: function(state) {
    state.dashboardEdited = false
    state.dashboard = {}
    state.groups = []
    state.groupEdited = false
    state.invitations = []
  },
}
export const actions = {
  ...resource.actions,
}
