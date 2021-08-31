import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'locations' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  apiaries: [],
  hiveView: 'xlView',
  apiaryEdited: false,
  hiveSearch: null,
  hiveFilterByAlert: false,
  hiveFilterByAttention: false,
  hiveFilterByBase: false,
  hiveFilterByGroup: 'off',
  hiveFilterByImpression: [],
  hiveFilterByReminder: false,
}
export const getters = {
  ...resource.getters,
  apiaries: (state) => {
    return state.apiaries
  },
  hiveView: (state) => {
    return state.hiveView
  },
  apiaryEdited: (state) => {
    return state.apiaryEdited
  },
  hiveFilterByAlert: (state) => {
    return state.hiveFilterByAlert
  },
  hiveFilterByAttention: (state) => {
    return state.hiveFilterByAttention
  },
  hiveFilterByBase: (state) => {
    return state.hiveFilterByBase
  },
  hiveFilterByGroup: (state) => {
    return state.hiveFilterByGroup
  },
  hiveFilterByImpression: (state) => {
    return state.hiveFilterByImpression
  },
  hiveFilterByReminder: (state) => {
    return state.hiveFilterByReminder
  },
  hiveSearch: (state) => {
    return state.hiveSearch
  },
}
export const mutations = {
  ...resource.mutations,
  setApiaries: function(state, payload) {
    state.apiaries = payload
  },
  setApiaryEdited: function(state, bool) {
    state.apiaryEdited = bool
  },
  setHiveView: function(state, string) {
    state.hiveView = string
  },
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  setFilterByImpression: function(state, payload) {
    var array = state.hiveFilterByImpression
    if (array.includes(payload)) {
      array.splice(array.indexOf(payload), 1)
    } else {
      array.push(payload)
    }
    state.hiveFilterByImpression = array
  },
  clearFilters: function(state) {
    state.hiveSearch = null
    state.hiveFilterByAlert = false
    state.hiveFilterByAttention = false
    state.hiveFilterByBase = false
    state.hiveFilterByGroup = 'off'
    state.hiveFilterByImpression = []
    state.hiveFilterByReminder = false
  },
  resetState: function(state) {
    state.apiaries = []
    state.hiveView = 'xlView'
    state.apiaryEdited = false
    state.hiveSearch = null
    state.hiveFilterByAlert = false
    state.hiveFilterByAttention = false
    state.hiveFilterByBase = false
    state.hiveFilterByGroup = 'off'
    state.hiveFilterByImpression = []
    state.hiveFilterByReminder = false
  },
}
export const actions = {
  ...resource.actions,
}
