import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'devices' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  devices: [],
  devicesChecked: false,
  selectedDeviceId: null,
  selectedFlashLog: null,
  logSearch: null,
}
export const getters = {
  ...resource.getters,
  devices: (state) => {
    return state.devices
  },
  devicesChecked: (state) => {
    return state.devicesChecked
  },
  selectedDeviceId: (state) => {
    return state.selectedDeviceId
  },
  selectedFlashLog: (state) => {
    return state.selectedFlashLog
  },
  logSearch: (state) => {
    return state.logSearch
  },
}
export const mutations = {
  ...resource.mutations,
  setSelectedDeviceId: function(state, id) {
    state.selectedDeviceId = id
  },
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  resetState: function(state) {
    state.devices = []
    state.devicesChecked = false
    state.selectedDeviceId = null
    state.selectedFlashLog = null
    state.logSearch = null
  },
}
export const actions = {
  ...resource.actions,
}
