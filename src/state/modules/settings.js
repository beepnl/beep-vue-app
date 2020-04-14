import axios from '@api/axios'
import store from '@state/store'
import { ApiGroup } from 'axios-actions'

const apiConfig = {
  index: `GET settings`,
  replace: `POST settings`,
}
const endpoint = new ApiGroup(axios, apiConfig)

endpoint
  .when('replace', () => endpoint.index())
  // make sure the commit has the correct module namespace prefix
  .when('index', (data) => store.commit(`settings/SET_DATA`, data))
  .use('data')

export const state = {
  data: {},
}
export const mutations = {
  SET_DATA: function(state, data) {
    // axios provides a fresh object.
    state.data = data
  },
}
export const actions = {
  init() {
    // fetch the models
    endpoint.index()
  },
  index() {
    return endpoint.index()
  },
  replace(settings) {
    return endpoint.replace(settings)
  },
}
