import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'inspections' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  diaryFilterByAttention: false,
  diaryFilterByGroup: 'off',
  diaryFilterByImpression: [],
  diaryFilterByReminder: false,
  generalInspections: [],
  checklist: {},
  checklists: [],
  inspectionEdited: false,
  selectedInspectionId: null,
  lastSelectedChecklist: null,
  bulkInspection: false,
  diarySearch: null,
  activeInspectionDate: null,
  tempSavedInspection: null,
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
    return state.diaryFilterByImpression
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
  lastSelectedChecklist: (state) => {
    return state.lastSelectedChecklist
  },
  bulkInspection: (state) => {
    return state.bulkInspection
  },
  diarySearch: (state) => {
    return state.diarySearch
  },
  activeInspectionDate: (state) => {
    return state.activeInspectionDate
  },
  tempSavedInspection: (state) => {
    return state.tempSavedInspection
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
  setFilterByImpression: function(state, payload) {
    var array = state.diaryFilterByImpression
    if (array.includes(payload)) {
      array.splice(array.indexOf(payload), 1)
    } else {
      array.push(payload)
    }
    state.diaryFilterByImpression = array
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
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  clearFilters: function(state) {
    state.diaryFilterByAttention = false
    state.diaryFilterByGroup = 'off'
    state.diaryFilterByImpression = []
    state.diaryFilterByReminder = false
  },
  resetState: function(state) {
    state.diaryFilterByAttention = false
    state.diaryFilterByGroup = 'off'
    state.diaryFilterByImpression = []
    state.diaryFilterByReminder = false
    state.generalInspections = []
    state.checklist = {}
    state.checklists = []
    state.inspectionEdited = false
    state.selectedInspectionId = null
    state.lastSelectedChecklist = null
    state.bulkInspection = false
    state.diarySearch = null
    state.activeInspectionDate = null
    state.tempSavedInspection = null
  },
}
export const actions = {
  ...resource.actions,
}
