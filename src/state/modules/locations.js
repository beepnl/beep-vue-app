import Vue from 'vue'
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
  // FIXME: most of the following should be either moved to local view state
  // or be replaced by endpoint actions
  setApiaries: function(state, payload) {
    state.apiaries = payload
  },
  setApiaryEdited: function(state, bool) {
    state.apiaryEdited = bool
  },
  selectHive: function(_, hive) {
    Vue.set(hive, 'selected', !hive.selected)
  },
  setApiaryListView: function(state, string) {
    state.apiaryListView = string
  },
}
export const actions = {
  ...resource.actions,
}
