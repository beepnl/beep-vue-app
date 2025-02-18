import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'locations' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  apiaries: [],
  apiaryEdited: false,
  groups: [],
  hiveFilterByAlert: false,
  hiveFilterByAttention: false,
  hiveFilterByBase: false,
  hiveFilterByGroup: 'off',
  hiveFilterByImpression: [],
  hiveFilterByReminder: false,
  hiveSearch: null,
  hiveView: 'xlView',
}
export const getters = {
  ...resource.getters,
  apiaries: (state) => {
    return state.apiaries
  },
  apiaryEdited: (state) => {
    return state.apiaryEdited
  },
  groups: (state) => {
    return state.groups || []
  },
  hiveFilterByAlert: (state) => {
    return state.hiveFilterByAlert
  },
  hiveFilterByAttention: (state) => {
    return state.hiveFilterByAttention
  },
  hiveFilterByBase: (state) => {
    return state.hiveFilterByBase
  },
  hiveFilterByGroup: (state) => {
    return state.hiveFilterByGroup
  },
  hiveFilterByImpression: (state) => {
    return state.hiveFilterByImpression
  },
  hiveFilterByReminder: (state) => {
    return state.hiveFilterByReminder
  },
  hives: (state, getters) => {
    const ownHivesArray = []
    getters.apiaries.forEach((apiary) => {
      apiary.hives.forEach((hive) => {
        hive.label = hive.name
        ownHivesArray.push(hive)
      })
    })

    const sharedHivesArray = []
    getters.groups.forEach((group) => {
      group.hives.forEach((hive) => {
        hive.label = hive.name
        hive.group_name = group.name
        sharedHivesArray.push(hive)
      })
    })

    const allHives = ownHivesArray.concat(sharedHivesArray)

    return allHives
  },
  hiveSets: (state, getters) => {
    return getters.apiaries.concat(getters.groups)
  },
  hivesObject: (state, getters) => {
    const allHives = getters.hives

    var uniqueHives = {}
    const map = new Map()
    for (const item of allHives) {
      if (!map.has(item.id)) {
        map.set(item.id, true) // set any value to Map
        uniqueHives[item.id] = item
      }
    }

    return uniqueHives
  },
  hiveSearch: (state) => {
    return state.hiveSearch
  },
  hiveView: (state) => {
    return state.hiveView
  },
}
export const mutations = {
  ...resource.mutations,
  setApiaries: function(state, payload) {
    state.apiaries = payload
  },
  setApiaryEdited: function(state, bool) {
    state.apiaryEdited = bool
  },
  setGroups: function(state, payload) {
    state.groups = payload
  },
  setHiveView: function(state, string) {
    state.hiveView = string
  },
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  setFilterByImpression: function(state, payload) {
    const array = state.hiveFilterByImpression
    if (array.includes(payload)) {
      array.splice(array.indexOf(payload), 1)
    } else {
      array.push(payload)
    }
    state.hiveFilterByImpression = array
  },
  clearFilters: function(state) {
    state.hiveSearch = null
    state.hiveFilterByAlert = false
    state.hiveFilterByAttention = false
    state.hiveFilterByBase = false
    state.hiveFilterByGroup = 'off'
    state.hiveFilterByImpression = []
    state.hiveFilterByReminder = false
  },
  resetState: function(state) {
    state.apiaries = []
    state.apiaryEdited = false
    state.groups = []
    state.hiveFilterByAlert = false
    state.hiveFilterByAttention = false
    state.hiveFilterByBase = false
    state.hiveFilterByGroup = 'off'
    state.hiveFilterByImpression = []
    state.hiveFilterByReminder = false
    state.hiveSearch = null
    state.hiveView = 'xlView'
  },
}
export const actions = {
  ...resource.actions,
}
