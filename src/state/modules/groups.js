import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'groups' })

export const state = {
  ...resource.state,
  dashboardEdited: false,
  dashboards: [
    {
      id: '1c987',
      name: 'Overhorst',
      description: 'Test dashboard',
      speed: 60,
      interval: 'day',
      show_inspections: true,
      show_all: false,
      hive_ids: [151, 121, 122, 231, 273],
    },
    {
      id: '32Gf6',
      name: 'Dashboard',
      description: 'Test dashboard 2 met default settings',
      speed: 30,
      interval: 'week',
      show_inspections: false,
      show_all: false,
      hive_ids: [151, 121, 122, 231, 273, 250, 478, 476, 422, 158, 438, 437],
    },
  ],
  groups: [],
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
    state.groups = []
    state.groupEdited = false
    state.invitations = []
  },
}
export const actions = {
  ...resource.actions,
}
