import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.

const other = {
  multiple: 'POST devices/multiple',
}
const resource = createResource({ path: 'devices', other })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  devices: [],
  selectedDeviceId: null,
}
export const getters = {
  ...resource.getters,
  devices: (state) => {
    return state.devices
  },
  selectedDeviceId: (state) => {
    return state.selectedDeviceId
  },
}
export const mutations = {
  ...resource.mutations,
  // FIXME: most of the following should be either moved to local view state
  // or be replaced by endpoint actions
  setDevices: function(state, payload) {
    state.devices = payload
  },
  setSelectedDeviceId: function(state, id) {
    state.selectedDeviceId = id
  },
}
export const actions = {
  ...resource.actions,
  multiple: function(devices) {
    resource.endpoint.multiple(devices)
  },
}
