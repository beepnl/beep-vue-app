import createResource from '@utils/store/vuex-resource'

const other = {
  checktoken: 'POST groups/checktoken',
  detach: 'DELETE groups/detach/{id}',
}
// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'groups', other })

export const state = {
  ...resource.state,
}
export const getters = {
  ...resource.getters,
  groups: (state) => {
    return state.data.groups || []
  },
}
export const mutations = {
  ...resource.mutations,
}
export const actions = {
  ...resource.actions,
  findAll: function({ _ }) {
    const groups = resource.endpoint.index()
    if (groups) {
      // commit('SET_GROUPS', groups);
      return groups
    }
    return false
  },
  // proxy actions for other methods
  checktoken: function() {
    resource.endpoint.checktoken()
  },
  detach: function(id) {
    resource.endpoint.detach(id)
  },
}
