import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'inspections' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  diaryFilterByAttention: false,
  diaryFilterByGroup: false,
  diaryFilterByImpression: [],
  diaryFilterByReminder: false,
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
  diaryFilterByAttention: (state) => {
    return state.diaryFilterByAttention
  },
  diaryFilterByGroup: (state) => {
    return state.diaryFilterByGroup
  },
  diaryFilterByImpression: (state) => {
    return state.diaryFilterByImpression || []
  },
  diaryFilterByReminder: (state) => {
    return state.diaryFilterByReminder
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
  setFilter: function(state, payload) {
    state[payload.filter] = payload.value
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
