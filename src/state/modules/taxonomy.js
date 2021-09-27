import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'taxonomy' })

export const state = {
  ...resource.state,
  taxonomyLists: {},
}
export const getters = {
  ...resource.getters,
  alertRulesList: (state) => {
    return state.taxonomyLists.alert_rules || []
  },
  beeRacesList: (state) => {
    return state.taxonomyLists.beeraces || []
  },
  hiveDimensionsList: (state) => {
    return state.taxonomyLists.hivedimensions || []
  },
  hiveTypesList: (state) => {
    return state.taxonomyLists.hivetypes || []
  },
  sensorMeasurementsList: (state) => {
    return state.taxonomyLists.sensormeasurements || []
  },
  sensorTypesList: (state) => {
    return state.taxonomyLists.sensortypes || []
  },
}
export const mutations = {
  ...resource.mutations,
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  resetState: function(state) {
    state.taxonomyLists = {}
  },
}
export const actions = {
  ...resource.actions,
}
