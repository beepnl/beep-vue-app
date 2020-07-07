import createResource from '@utils/store/vuex-resource'
import * as Api from '@api/hives.js'

const resource = createResource({ path: 'hives' })

export const state = {
  ...resource.state,
  hive: {},
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
  updateHiveColor: function(state, color) {
    state.hive.color = color
  },
  updateHiveFrames: function(state, frames) {
    state.hive.layers.forEach((layer) => {
      layer.framecount = frames
    })
  },
  updateHiveLayers: function(state, layers) {
    state.hive.layers = layers
  },
  updateHiveName: function(state, name) {
    state.hive.name = name
  },
  updateHiveType: function(state, typeID) {
    state.hive.hive_type_id = typeID
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
      // console.log(hive)
      return true
    })
  },
  saveHiveSettings: function({ _ }, hive) {
    const id = hive.id
    Api.saveHiveSettings(id, hive)
      .then(() => {
        return true
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request)
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message)
        }
        console.log(error)
      })
  },
  deleteHive: function({ _ }, id) {
    return Api.deleteHive(id)
  },
}
