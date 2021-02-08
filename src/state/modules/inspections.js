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
  bulkInspection: false,
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
  bulkInspection: (state) => {
    return state.bulkInspection
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
  resetState: function(state) {
    state.diaryFilterByAttention = false
    state.diaryFilterByGroup = false
    state.diaryFilterByImpression = []
    state.diaryFilterByReminder = false
    state.generalInspections = []
    state.checklist = {}
    state.checklists = []
    state.inspectionEdited = false
    state.selectedInspectionId = null
    state.bulkInspection = false
  },
}
export const actions = {
  ...resource.actions,
}
