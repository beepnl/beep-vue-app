import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'hives' })

export const state = {
  ...resource.state,
  hiveEdited: false,
  activeHive: null,
  hivesObject: {},
  hiveTags: [],
  hiveTagsChecked: false,
  hiveTagEdited: false,
  tempSavedHiveTag: null,
}
export const getters = {
  ...resource.getters,
  activeHive: (state) => {
    return state.activeHive
  },
  hives: (state) => {
    return state.data.hives || []
  },
  hivesObject: (state) => {
    return state.hivesObject
  },
  hiveEdited: (state) => {
    return state.hiveEdited
  },
  hiveTags: (state) => {
    return state.hiveTags
  },
  hiveTagsChecked: (state) => {
    return state.hiveTagsChecked
  },
  hiveTagEdited: (state) => {
    return state.hiveTagEdited
  },
  tempSavedHiveTag: (state) => {
    return state.tempSavedHiveTag
  },
}
export const mutations = {
  ...resource.mutations,
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  setHiveEdited: function(state, bool) {
    state.hiveEdited = bool
  },
  setActiveHive: function(state, hive) {
    state.activeHive = hive
  },
  resetState: function(state) {
    state.hiveEdited = false
    state.activeHive = null
    state.hiveTags = []
    state.hiveTagsChecked = false
    state.hivesObject = {}
    state.hiveTagEdited = false
    state.tempSavedHiveTag = null
  },
}
export const actions = {
  ...resource.actions,
}
