import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'hives' })

export const state = {
  ...resource.state,
  hiveEdited: false,
  activeHive: null,
  hivesObject: {},
  hiveTags: [
    {
      tag: '01',
      url: {
        name: 'home',
        query: {
          search: 'id=609',
        },
      },
      hive_id: 609,
      description: 'Show hive card in overview',
    },
    {
      tag: '02',
      url: {
        name: 'inspect',
        query: {
          hive_id: 609,
        },
      },
      hive_id: 609,
      description: 'Create a new inspection',
    },
    {
      tag: '03',
      url: {
        name: 'hive-inspections',
        params: {
          id: 609,
        },
      },
      hive_id: 609,
      description: 'View inspections',
    },
    {
      tag: '04',
      url: {
        name: 'hive-edit',
        params: {
          id: 609,
        },
      },
      hive_id: 609,
      description: 'Edit hive configuration',
    },
    {
      tag: '05',
      url: {
        name: 'measurements-id',
        params: {
          id: 299,
        },
      },
      hive_id: 609,
      description: 'View measurements',
    },
  ],
  hiveTagEdited: false,
}
export const getters = {
  ...resource.getters,
  activeHive: (state) => {
    return state.activeHive
  },
  hives: (state) => {
    return state.data.hives || []
  },
  hivesObject: (state) => {
    return state.hivesObject
  },
  hiveEdited: (state) => {
    return state.hiveEdited
  },
  hiveTags: (state) => {
    return state.hiveTags
  },
  hiveTagEdited: (state) => {
    return state.hiveTagEdited
  },
}
export const mutations = {
  ...resource.mutations,
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  setHiveEdited: function(state, bool) {
    state.hiveEdited = bool
  },
  setActiveHive: function(state, hive) {
    state.activeHive = hive
  },
  resetState: function(state) {
    state.hiveEdited = false
    state.activeHive = null
    // state.hiveTags = []
    state.hivesObject = {}
    state.hiveTagEdited = false
  },
}
export const actions = {
  ...resource.actions,
}
