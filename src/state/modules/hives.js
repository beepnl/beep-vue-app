import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'hives' })

export const state = {
  ...resource.state,
  hiveEdited: false,
  activeHive: null,
  hiveTags: [
    {
      id: '01',
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
      id: '02',
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
      id: '03',
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
      id: '04',
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
      id: '05',
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
}
export const getters = {
  ...resource.getters,
  activeHive: (state) => {
    return state.activeHive
  },
  hives: (state) => {
    return state.data.hives || []
  },
  hiveEdited: (state) => {
    return state.hiveEdited
  },
  hiveTags: (state) => {
    return state.hiveTags
  },
}
export const mutations = {
  ...resource.mutations,
  setHiveEdited: function(state, bool) {
    state.hiveEdited = bool
  },
  setActiveHive: function(state, hive) {
    state.activeHive = hive
  },
  resetState: function(state) {
    state.hiveEdited = false
    state.activeHive = null
  },
}
export const actions = {
  ...resource.actions,
}
