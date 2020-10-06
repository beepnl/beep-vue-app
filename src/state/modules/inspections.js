import createResource from '@utils/store/vuex-resource'
import * as Api from '@api/inspections.js'

const other = {
  index: 'GET inspections/lists',
  read: 'GET inspections/hive/:id',
  create: 'POST inspections/store',
  update: 'POST inspections/store',
  delete: 'DELETE inspections/:id',
  getchecklistbyid: 'GET inspections/lists?id=:id',
  getinspectionbyid: 'GET inspections/:id',
}

const resource = createResource({ path: 'inspections', other })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  inspectionEdited: false,
  selectedInspectionId: null,
}
export const getters = {
  ...resource.getters,
  inspectionEdited: (state) => {
    return state.inspectionEdited
  },
  selectedInspectionId: (state) => {
    return state.selectedInspectionId
  },
}
export const mutations = {
  ...resource.mutations,
  setInspectionEdited: function(state, bool) {
    state.inspectionEdited = bool
  },
  setSelectedInspectionId: function(state, id) {
    state.selectedInspectionId = id
  },
}
export const actions = {
  ...resource.actions,
  getInspectionById: function({ _ }, id) {
    const inspection = resource.endpoint.getinspectionbyid(id)
    if (inspection) {
      return inspection
    }
    return false
  },
  // getInspectionsForHiveIds: function({ _ }, hiveIds) {
  //   return Promise.all(
  //     hiveIds.map((hiveId) => resource.endpoint.read(hiveId))
  //   ).then((data) =>
  //     data.reduce((all, item) => all.concat(item.inspections), [])
  //   )
  // },
  // getInspectionsForHives: function({ _ }, hives) {
  //   return Promise.all(
  //     hives.map((hive) => resource.endpoint.read(hive.id))
  //   ).then((data) =>
  //     data.reduce((all, item) => all.concat(item.inspections), [])
  //   )
  // },
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
  getChecklistById: function({ _ }, id) {
    const checklist = resource.endpoint.getchecklistbyid(id)
    if (checklist) {
      return checklist
    }
    return false
  },
  saveInspection: function({ _ }, inspection) {
    return Api.saveInspection(inspection)
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
  deleteInspection: function({ _ }, id) {
    return Api.deleteInspection(id)
  },
}
