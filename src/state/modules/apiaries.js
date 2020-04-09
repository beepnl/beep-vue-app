import axios from '@api/axios'
import store from '@state/store'
import { ApiEndpoint } from 'axios-actions'

import Vue from 'vue'

// Override default simple string config because CORS preflight fails
// due to redirect for trailing slash
const apiConfig = {
  index: 'locations', // GET
  create: 'locations', // POST
  read: 'locations/:id', // GET
  update: 'PUT hives/:id',
  delete: 'DELETE hives/:id',
}

const endpoint = new ApiEndpoint(axios, apiConfig)
  .when('create update delete', () => this.index())
  .when('index', (data) => store.commit('apiaries/SET_DATA', data))
  .use('data')

export const state = {
  data: [],
}

export const getters = {
  apiaries: function(state) {
    return state.data.locations
  },
  highestHive: function(state, getters, rootState, rootGetters) {
    // returns the highest hive across all apiaries
    return Math.max(
      ...getters.apiaries.map((apiary) =>
        Math.max(
          rootGetters['hives/getHivesForApiary'](apiary.id).map(
            (hive) => hive.honey + hive.brood
          )
        )
      )
    )
  },

  widestApiary: function(state, getters, rootState, rootGetters) {
    // returns the widest apiary (most total frames)
    return Math.max(
      ...getters.apiaries.map((apiary) =>
        rootGetters['hives/getHivesForApiary'](apiary.id).reduce(
          (frames, hive) => frames + hive.frames,
          0
        )
      )
    )
  },
  selectedHives: function(state) {
    // returns an Array of currently selected hives
    const hiveIndexes =
      (state.apiary.hives &&
        state.apiary.hives.reduce((hiveIndexes, hive, i) => {
          if (hive.selected) {
            hiveIndexes.push(i + 1)
          }
          return hiveIndexes
        }, [])) ||
      []
    return hiveIndexes
  },
  inspectionsForApiary: function(state) {
    return state.inspections.filter((i) => i.apiary === state.apiary.title)
  },
  filteredInspections: function(_, getters) {
    if (!getters.selectedHives.length) {
      // show every hive in apiary
      return getters.inspectionsForApiary
    }
    return getters.inspectionsForApiary.filter((inspection) => {
      return (
        !inspection.hive ||
        getters.selectedHives.indexOf(inspection.hive) !== -1
      )
    })
  },
}
export const mutations = {
  SET_DATA: function(state, data) {
    // axios provides a fresh object, otherwise use lodash.cloneDeep
    state.data = data
  },
  // FIXME: most of the following should be either moved to local view state
  // or be replaced by endpoint actions
  setSelectedApiary: function(state, apiary) {
    state.apiary = apiary
  },
  setEditable: function(state, editable) {
    state.editing = editable
  },
  selectHive: function(_, hive) {
    Vue.set(hive, 'selected', !hive.selected)
  },
  unselectHives: function(state) {
    state.apiary.hives.forEach((hive) => Vue.set(hive, 'selected', false))
  },
  addHive: function(state, { apiary = null, hive = null }) {
    if (!apiary) {
      apiary = state.apiary
    }
    const defaultHive = {
      brood: 1,
      honey: 1,
      frames: 10,
      color: 'orange',
    }
    if (!hive) {
      hive = { ...defaultHive }
    }
    apiary.hives.push(hive)
  },
  setHives: function(_, { apiary = null, hives = null }) {
    if (!apiary || !hives) {
      return
    }
    Vue.set(apiary, 'hives', hives)
  },
  createApiary: function(_, getters, { apiary = null }) {
    const defaultApiary = {
      id: Math.max(getters.apiaries.map((apiary) => apiary.id) + 1),
      title: 'New Apiary',
      hives: [].splice(),
    }
    if (!apiary) {
      apiary = defaultApiary
    }
    getters.apiaries.push(apiary)
  },
  updateApiary: function(
    _,
    getters,
    { apiary = null, id = null, update = null }
  ) {
    id = id || apiary.id
    if (!id) {
      return
    }
    const index = getters.apiaries.map((apiary) => apiary.id).indexOf(id)
    if (index > -1) {
      if (update) {
        getters.apiaries.splice(index, 1, update)
      } else {
        getters.apiaries.splice(index, 1)
      }
    }
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

  // FIXME: most of the following should be either moved to local view state
  // or be replaced by endpoint actions

  selectApiary: function({ getters, commit }, id) {
    const apiary = getters.apiaries.find((apiary) => apiary.id === id)
    if (apiary) {
      commit('setSelectedApiary', apiary)
      return apiary
    }
    return false
  },
  editOn: function({ commit }) {
    return commit('setEditable', true)
  },
  editOff: function({ commit }) {
    return commit('setEditable', false)
  },
  selectHive: function({ commit }, payload) {
    return commit('selectHive', payload || {})
  },
  unselectHives: function({ commit }) {
    return commit('unselectHives')
  },
  addHive: function({ commit }, payload) {
    return commit('addHive', payload || {})
  },
  createApiary: function({ commit }) {
    return commit('createApiary')
  },
  updateApiary: function({ commit }, payload) {
    return commit('updateApiary', payload || {})
  },
  deleteApiary: function({ commit }, payload) {
    return commit('deleteApiary', payload || {})
  },
}
