import axios from '@api/axios'
import store from '@state/store'
import { ApiGroup } from 'axios-actions'

const apiConfig = {
  index: 'GET research',
  add_consent: 'POST research/{id}/add_consent',
  remove_consent: 'POST research/{id}/remove_consent',
}
const endpoint = new ApiGroup(axios, apiConfig)

endpoint
  .when('add_consent remove_consent', () => endpoint.index())
  .when('index', (data) => store.commit('research/SET_DATA', data))
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
  index() {
    return endpoint.index()
  },
  add_consent(id) {
    return endpoint.add_consent(id)
  },
  remove_consent(id) {
    return endpoint.remove_consent(id)
  },
}
