import axios from '@api/axios'
import store from '@state/store'
import { ApiEndpoint } from 'axios-actions'

// Override default simple string config because CORS preflight fails
// due to redirect for trailing slash
const apiConfig = {
  index: 'hives', // GET
  create: 'hives', // POST
  read: 'hives/:id', // GET
  update: 'PUT hives/:id',
  delete: 'DELETE hives/:id',
}

const endpoint = new ApiEndpoint(axios, apiConfig)
  .when('create update delete', () => this.index())
  .when('index', (data) => store.commit(`hives/SET_DATA`, data))
  .use('data')

export const state = {
  data: {},
}

export const getters = {
  getHivesForApiary: (state) => (locationId) => {
    return (
      (state.data.hives &&
        state.data.hives.filter((hive) => hive.location_id === locationId)) ||
      []
    )
  },
}

export const mutations = {
  SET_DATA: function(state, data) {
    // axios provides a fresh object, otherwise use lodash.cloneDeep
    state.data = data
  },
}

export const actions = {
  init() {
    // fetch the models
    endpoint.index()
  },

  // proxy api actions, flesh out where needed
  index() {
    return endpoint.index()
  },
  read() {
    return endpoint.read()
  },
  create(payload) {
    return endpoint.create(payload)
  },
  update(payload) {
    return endpoint.update(payload)
  },
  delete(payload) {
    return endpoint.delete(payload)
  },

  // add actions as needed
}
