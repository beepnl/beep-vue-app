import Vue from 'vue'
import createResource from '@utils/store/vuex-resource'
import * as Api from '@api/locations.js'

const resource = createResource({ path: 'locations' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
}
export const getters = {
  ...resource.getters,
  apiaries: (state) => {
    return state.data.locations || []
  },
}
export const mutations = {
  ...resource.mutations,
  // FIXME: most of the following should be either moved to local view state
  // or be replaced by endpoint actions
  setEditable: function(state, editable) {
    state.editing = editable
  },
  selectHive: function(_, hive) {
    Vue.set(hive, 'selected', !hive.selected)
  },
  unselectHive: function(_, hive) {
    Vue.set(hive, 'selected', false)
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
  ...resource.actions,
  // add actions as needed
  // FIXME: most of the following should be either moved to local view state
  // or be replaced by endpoint actions
  findAll: function({ _ }) {
    const apiaries = resource.endpoint.index()
    if (apiaries) {
      return apiaries // automatically committed by SET_DATA after index()
    }
    return false
  },
  // findApiary: function({ getters, commit }, id) {
  //   const apiary = getters.apiaries.find((apiary) => apiary.id === id) // const apiary = resource.endpoint.read(id);
  //   if (apiary) {
  //     commit('setSelectedApiary', apiary)
  //     return apiary
  //   }
  //   return false
  // },
  createApiary: function({ _ }, apiary) {
    return Api.createApiary(apiary)
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
}
