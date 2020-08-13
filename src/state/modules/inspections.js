import createResource from '@utils/store/vuex-resource'

const other = {
  index: 'GET inspections/lists',
  read: 'GET inspections/hive/:id',
  create: 'POST inspections/store',
  update: 'POST inspections/store',
  delete: 'DELETE inspections/:id',
}

const resource = createResource({ path: 'inspections', other })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  edited: false,
}
export const getters = {
  ...resource.getters,
  inspectionEdited: (state) => {
    return state.edited
  },
}
export const mutations = {
  ...resource.mutations,
  setEdited: function(state, bool) {
    state.edited = bool
  },
}
export const actions = {
  ...resource.actions,
  getInspectionsForHiveIds: function({ _ }, hiveIds) {
    return Promise.all(
      hiveIds.map((hiveId) => resource.endpoint.read(hiveId))
    ).then((data) =>
      data.reduce((all, item) => all.concat(item.inspections), [])
    )
  },
  getInspectionsForHives: function({ _ }, hives) {
    return Promise.all(
      hives.map((hive) => resource.endpoint.read(hive.id))
    ).then((data) =>
      data.reduce((all, item) => all.concat(item.inspections), [])
    )
  },
  getAllInspectionsForHiveId: function({ _ }, hiveId) {
    const response = resource.endpoint.read(hiveId)
    if (response) {
      return response
    }
    return false
  },
  getChecklists: function({ _ }) {
    const checklists = resource.endpoint.index()
    if (checklists) {
      return checklists
    }
    return false
  },
}
