import axios from '@api/axios'
import store from '@state/store'
import { ApiGroup } from 'axios-actions'

// TODO: verify if the below functionality taken from the API docs
// is as intended
const apiConfig = {
  lists: `GET taxonomy/lists`,
  taxonomy: `GET taxonomy/taxonomy`,
}
const endpoint = new ApiGroup(axios, apiConfig)

endpoint
  .when('lists', (data) => store.commit(`taxonomy/SET_LISTS`, data))
  .when('taxonomy', (data) => store.commit(`taxonomy/SET_TAXONOMY`, data))
  .use('data')

export const state = {
  data: {
    lists: [],
    taxonomy: [],
  },
}
export const getters = {
  beeRacesList: (state) => {
    return state.data.lists.beeraces || []
  },
  hiveDimensionsList: (state) => {
    return state.data.lists.hivedimensions || []
  },
  hiveTypesList: (state) => {
    return state.data.lists.hivetypes || []
  },
}
export const mutations = {
  SET_LISTS: function(state, data) {
    // axios provides a fresh object.
    state.data.lists = data
  },
  SET_TAXONOMY: function(state, data) {
    // axios provides a fresh object.
    state.data.taxonomy = data
  },
}
export const actions = {
  index() {
    return endpoint.lists().then(() => endpoint.taxonomy)
  },
}
