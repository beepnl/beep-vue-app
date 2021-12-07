import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'groups' })

export const state = {
  ...resource.state,
  groups: [],
  groupEdited: false,
  invitations: [],
}
export const getters = {
  ...resource.getters,
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
  setGroupEdited: function(state, bool) {
    state.groupEdited = bool
  },
  setGroups: function(state, groups) {
    groups.map((group) => {
      group.hives = sortHivesByLocationAndName(group.hives)
    })
    state.groups = groups
  },
  setInvitations: function(state, payload) {
    state.invitations = payload
  },
  resetState: function(state) {
    state.groups = []
    state.groupEdited = false
    state.invitations = []
  },
}
export const actions = {
  ...resource.actions,
}

// ===
// Private helpers
// ===

function sortHivesByLocationAndName(hives) {
  const sortedHives = hives.slice().sort(function(a, b) {
    // order = null comes last
    // if order is equal, sort by name with number sensitivity (10 comes after 2 instead of 1)
    return (
      (a.location_id === null) - (b.location_id === null) ||
      +(a.location_id > b.location_id) ||
      -(a.location_id < b.location_id) ||
      (a.location_id === b.location_id && a.name !== null && b.name !== null
        ? a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        : 0)
    )
  })
  return sortedHives
}
