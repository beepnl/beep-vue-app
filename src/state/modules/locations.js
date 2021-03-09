import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'locations' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  apiaries: [],
  apiaryListView: 'listView',
  apiaryEdited: false,
  hiveSearch: null,
  hiveFilterByAlert: false,
  hiveFilterByAttention: false,
  hiveFilterByBase: false,
  hiveFilterByImpression: [],
  hiveFilterByReminder: false,
}
export const getters = {
  ...resource.getters,
  apiaries: (state) => {
    return state.apiaries
  },
  apiaryListView: (state) => {
    return state.apiaryListView
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
  setApiaryListView: function(state, string) {
    state.apiaryListView = string
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
    state.hiveFilterByImpression = []
    state.hiveFilterByReminder = false
  },
  resetState: function(state) {
    state.apiaries = []
    state.apiaryListView = 'listView'
    state.apiaryEdited = false
    state.hiveSearch = null
    state.hiveFilterByAlert = false
    state.hiveFilterByAttention = false
    state.hiveFilterByBase = false
    state.hiveFilterByImpression = []
    state.hiveFilterByReminder = false
  },
}
export const actions = {
  ...resource.actions,
}
