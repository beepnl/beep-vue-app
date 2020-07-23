import createResource from '@utils/store/vuex-resource'
import * as Api from '@api/hives.js'

const resource = createResource({ path: 'hives' })

export const state = {
  ...resource.state,
  hive: {},
  edited: false,
}
export const getters = {
  ...resource.getters,
  activeHive: (state) => {
    return state.hive
  },
  hives: (state) => {
    return state.data.hives || []
  },
  hiveEdited: (state) => {
    return state.edited
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
  deleteLayer: function(state, payload) {
    var remainingLayers = state.hive.layers.filter(
      (layer) =>
        !(layer.id === payload.layerId || layer.key === payload.layerKey)
    )
    state.hive.layers = remainingLayers
    state.hive.frames = state.hive.layers[0].framecount
    state.edited = true
  },
  updateHive: function(state, payload) {
    state.hive[payload.key] = payload.value
    if (
      payload.key !== 'bb_width_cm' &&
      payload.key !== 'bb_height_cm' &&
      payload.key !== 'bb_depth_cm' &&
      payload.key !== 'fr_width_cm' &&
      payload.key !== 'fr_height_cm'
    ) {
      state.edited = true // NB edited tracking has been disabled for vue-number-input component inputs as it calls @input when hive-edit.vue is initialized, before any changes are made
    }
  },
  updateHiveLayers: function(state, payload) {
    state.hive.layers.forEach((layer) => {
      layer[payload.key] = payload.value
    })
    if (payload.key === 'framecount') {
      state.hive.frames = payload.value // NB edited tracking has been disabled vue-number-input component inputs as it calls @input when hive-edit.vue is initialized, before any changes are made
    } else {
      state.hive[payload.key] = payload.value
      state.hive.frames = state.hive.layers[0].framecount
      state.edited = true
    }
  },
  updateHiveLayerColor: function(state, payload) {
    const layerIndex = state.hive.layers.findIndex(
      (layer) => layer.id === payload.layerId || layer.key === payload.layerKey
    )
    state.hive.layers[layerIndex].color = payload.layerColor
    state.hive.frames = state.hive.layers[0].framecount
    state.edited = true
  },
  updateHiveLayerOrder: function(state, layers) {
    var i = layers.length
    layers.map((layer) => {
      layer.order = i
      i--
    })
    state.hive.layers = layers
    state.hive.frames = state.hive.layers[0].framecount
    state.edited = true
  },
  updateQueen: function(state, payload) {
    if (state.hive.queen === null) {
      state.hive.queen = {}
    }
    state.hive.queen[payload.key] = payload.value
    console.log(payload)
    state.edited = true
  },
  setActiveHive: function(state, hive) {
    state.hive = hive
  },
  setEdited: function(state, bool) {
    state.edited = bool
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
    commit('setEdited', false)
    return resource.endpoint.read(id)
  },
  saveHiveSettings: function({ _ }, hive) {
    const id = hive.id
    return Api.saveHiveSettings(id, hive)
    // .then(() => {
    //   return true
    // })
    // .catch((error) => {
    //   // Error 😨
    //   if (error.response) {
    //     /*
    //      * The request was made and the server responded with a
    //      * status code that falls out of the range of 2xx
    //      */
    //     console.log(error.response.data)
    //     console.log(error.response.status)
    //     console.log(error.response.headers)
    //   } else if (error.request) {
    //     /*
    //      * The request was made but no response was received, `error.request`
    //      * is an instance of XMLHttpRequest in the browser and an instance
    //      * of http.ClientRequest in Node.js
    //      */
    //     console.log(error.request)
    //   } else {
    //     // Something happened in setting up the request and triggered an Error
    //     console.log('Error', error.message)
    //   }
    //   console.log(error)
    // })
  },
  deleteHive: function({ _ }, id) {
    return Api.deleteHive(id)
  },
}
