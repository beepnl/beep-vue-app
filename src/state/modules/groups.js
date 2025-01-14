import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'groups' })

export const state = {
  ...resource.state,
  dashboardEdited: false,
  dashboardGroups: [],
  dashboardGroupsChecked: false,
  groupEdited: false,
  invitations: [],
}
export const getters = {
  ...resource.getters,
  dashboardEdited: (state) => {
    return state.dashboardEdited
  },
  dashboards: (state) => {
    return state.dashboards
  },
  dashboardGroups: (state) => {
    return state.dashboardGroups || []
  },
  dashboardGroupsChecked: (state) => {
    return state.dashboardGroupsChecked
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
  setInvitations: function(state, payload) {
    state.invitations = payload
  },
  resetState: function(state) {
    state.dashboardEdited = false
    state.dashboardGroups = []
    state.dashboardGroupsChecked = false
    state.groupEdited = false
    state.invitations = []
  },
}
export const actions = {
  ...resource.actions,
}
