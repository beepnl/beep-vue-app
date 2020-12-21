import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'devices' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  selectedDeviceId: null,
}
export const getters = {
  ...resource.getters,
  selectedDeviceId: (state) => {
    return state.selectedDeviceId
  },
}
export const mutations = {
  ...resource.mutations,
  setSelectedDeviceId: function(state, id) {
    state.selectedDeviceId = id
  },
}
export const actions = {
  ...resource.actions,
}
