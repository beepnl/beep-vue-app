import createResource from '@utils/store/vuex-resource'
import * as Api from '@api/hives.js'

const resource = createResource({ path: 'hives' })

export const state = {
  ...resource.state,
}
export const getters = {
  ...resource.getters,
  activeHive: (state) => {
    return state.hive
  },
  hives: (state) => {
    return state.data.hives || []
  },
  getHivesForApiary: (state) => (apiaryId) => {
    return (
      (state.data.hives &&
        state.data.hives.filter((hive) => hive.location_id === apiaryId)) ||
      []
    )
  },
}
export const mutations = {
  ...resource.mutations,
  setActiveHive: function(state, hive) {
    state.hive = hive
  },
  updateHiveName: function(state, name) {
    state.hive.name = name
  },
  updateHiveLocation: function(state, location) {
    state.hive.location = location
  },
}
export const actions = {
  ...resource.actions,
  findAll: function({ _ }) {
    const hives = resource.endpoint.index()
    if (hives) {
      // commit('SET_HIVES', hives);
      return hives
    }
    return false
  },
  findById: function({ commit }, id) {
    return resource.endpoint.read(id).then((response) => {
      const hive = response.hives[0]
      commit('setActiveHive', hive)
      console.log(hive)
      return true
    })
  },
  saveHiveSettings: function({ _ }, hive) {
    const id = hive.id
    return Api.saveHiveSettings(id, hive)
  },
  deleteHive: function({ _ }, id) {
    return Api.deleteHive(id)
  },
}
