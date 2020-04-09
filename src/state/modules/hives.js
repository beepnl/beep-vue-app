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

const api = new ApiEndpoint(axios, apiConfig)
  .when('create update delete', () => this.index())
  .when('index', (data) => store.commit('hives/SET_DATA', data))
  .use('data')

export const state = {
  hives: {},
}

export const getters = {}

export const mutations = {
  SET_DATA: function(state, data) {
    // TODO: is this a fresh object? lodash.cloneDeep otherwise
    state.hives = data.hives
  },
}

export const actions = {
  init({ state, dispatch }) {
    // fetch the models
    api.index()
    // console.log('initialized hives', state)
  },

  // proxy api actions, flesh out where needed
  index() {
    return api.index()
  },
  read() {
    return api.read()
  },
  create(payload) {
    return api.create(payload)
  },
  update(payload) {
    return api.update(payload)
  },
  delete(payload) {
    return api.delete(payload)
  },

  // add more actions if desired
}
