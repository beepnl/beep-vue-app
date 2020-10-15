import createResource from '@utils/store/vuex-resource'

const other = {
  checktoken: 'POST groups/checktoken',
}
// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'groups', other })

export const state = {
  ...resource.state,
  groups: [],
  groupEdited: false,
}
export const getters = {
  ...resource.getters,
  groups: (state) => {
    return state.groups || []
  },
  groupEdited: (state) => {
    return state.groupEdited
  },
}
export const mutations = {
  ...resource.mutations,
  setGroupEdited: function(state, bool) {
    state.groupEdited = bool
  },
  setGroups: function(state, payload) {
    state.groups = payload
  },
}
export const actions = {
  ...resource.actions,
  // proxy actions for other methods
  checktoken: function() {
    resource.endpoint.checktoken()
  },
}
