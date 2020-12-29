import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'inspections' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  generalInspections: [],
  checklist: {},
  checklists: [],
  inspectionEdited: false,
  selectedInspectionId: null,
}
export const getters = {
  ...resource.getters,
  checklist: (state) => {
    return state.checklist || {}
  },
  checklists: (state) => {
    return state.checklists || []
  },
  generalInspections: (state) => {
    return state.generalInspections || []
  },
  inspectionEdited: (state) => {
    return state.inspectionEdited
  },
  selectedInspectionId: (state) => {
    return state.selectedInspectionId
  },
}
export const mutations = {
  ...resource.mutations,
  setChecklist: function(state, payload) {
    state.checklist = payload
  },
  setChecklists: function(state, payload) {
    state.checklists = payload
  },
  setGeneralInspections: function(state, payload) {
    state.generalInspections = payload
  },
  setInspectionEdited: function(state, bool) {
    state.inspectionEdited = bool
  },
  setSelectedInspectionId: function(state, id) {
    state.selectedInspectionId = id
  },
}
export const actions = {
  ...resource.actions,
}
