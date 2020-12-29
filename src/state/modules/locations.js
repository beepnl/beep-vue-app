import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'locations' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  apiaries: [],
  apiaryListView: 'listView',
  apiaryEdited: false,
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
}
export const actions = {
  ...resource.actions,
}
