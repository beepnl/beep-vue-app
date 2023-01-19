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
  bulkInspection: false,
  diarySearch: null,
  activeInspectionDate: null,
  tempSavedInspection: null,
  svgItemCounter: 0,
  svgColumnCounter: 0,
  svgMaxPageNr: null,
  svgPageNr: 1,
  svgPositionSet: {},
  svgRowHeight: 38,
  svgY: 0,
  svgWarnings: [],
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
  diarySearch: (state) => {
    return state.diarySearch
  },
  activeInspectionDate: (state) => {
    return state.activeInspectionDate
  },
  tempSavedInspection: (state) => {
    return state.tempSavedInspection
  },
  svgItemCounter: (state) => {
    return state.svgItemCounter
  },
  svgColumnCounter: (state) => {
    return state.svgColumnCounter
  },
  svgMaxPageNr: (state) => {
    return state.svgMaxPageNr
  },
  svgPageNr: (state) => {
    return state.svgPageNr
  },
  svgPositionSet: (state) => {
    return state.svgPositionSet
  },
  svgRowHeight: (state) => {
    return state.svgRowHeight
  },
  svgY: (state) => {
    return state.svgY
  },
  svgWarnings: (state) => {
    return state.svgWarnings
  },
}
export const mutations = {
  ...resource.mutations,
  addWarning: function(state, payload) {
    state.svgWarnings.push(payload)
  },
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
  setItemCounter: function(state, payload) {
    state.svgItemCounter = payload
  },
  setColumnCounter: function(state, payload) {
    state.svgColumnCounter = payload
  },
  setRowHeight: function(state, payload) {
    state.svgRowHeight = payload
  },
  setPageNr: function(state, payload) {
    state.svgPageNr = payload
  },
  setPosition: function(state, payload) {
    state.svgPositionSet[payload.id] = {
      x: payload.x,
      y: payload.y,
      pageY: payload.pageY,
      id: payload.id,
    }
  },
  setY: function(state, payload) {
    state.svgY = payload
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
    state.bulkInspection = false
    state.diarySearch = null
    state.activeInspectionDate = null
    state.tempSavedInspection = null
    state.svgItemCounter = 0
    state.svgColumnCounter = 0
    state.svgPageNr = 1
    state.svgPositionSet = {}
    state.svgRowHeight = 38
    state.svgY = 0
    state.svgMaxPageNr = null
    state.svgWarnings = []
  },
  resetSvgStates: function(state) {
    state.svgItemCounter = 0
    state.svgColumnCounter = 0
    state.svgPageNr = 1
    state.svgPositionSet = {}
    state.svgRowHeight = 38
    state.svgY = 0
    state.svgMaxPageNr = null
    state.svgWarnings = []
  },
}
export const actions = {
  ...resource.actions,
  nextPage: function({ state, commit }) {
    commit('setPageNr', state.svgPageNr + 1)
    commit('setColumnCounter', 0)
    commit('setItemCounter', 0)
    commit('setRowHeight', 0)
    commit('setY', 0)
  },
}
