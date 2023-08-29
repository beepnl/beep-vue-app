import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'inspections' })

// Add some custom functionality to the resource module
export const state = {
  ...resource.state,
  activeInspectionDate: null,
  bulkInspection: false,
  checklist: {},
  checklists: [],
  checklistSvgs: [],
  diaryFilterByAttention: false,
  diaryFilterByGroup: 'off',
  diaryFilterByImpression: [],
  diaryFilterByReminder: false,
  diarySearch: null,
  generalInspections: [],
  inspectionEdited: false,
  parsedOfflineInput: null,
  selectedInspectionId: null,
  svgColumnCounter: 0,
  svgItemCounter: 0,
  svgMaxPageNr: null,
  svgPageNr: 1,
  svgPositionSet: {},
  svgRowHeight: 38,
  svgWarnings: [],
  svgY: 0,
  tempSavedInspection: null,
  uploadInspectionPayload: null,
}
export const getters = {
  ...resource.getters,
  activeInspectionDate: (state) => {
    return state.activeInspectionDate
  },
  bulkInspection: (state) => {
    return state.bulkInspection
  },
  checklist: (state) => {
    return state.checklist || {}
  },
  checklists: (state) => {
    return state.checklists || []
  },
  checklistSvgs: (state) => {
    return state.checklistSvgs
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
  diarySearch: (state) => {
    return state.diarySearch
  },
  generalInspections: (state) => {
    return state.generalInspections || []
  },
  inspectionEdited: (state) => {
    return state.inspectionEdited
  },
  parsedOfflineInput: (state) => {
    return state.parsedOfflineInput
  },
  selectedInspectionId: (state) => {
    return state.selectedInspectionId
  },
  svgColumnCounter: (state) => {
    return state.svgColumnCounter
  },
  svgItemCounter: (state) => {
    return state.svgItemCounter
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
  svgWarnings: (state) => {
    return state.svgWarnings
  },
  svgY: (state) => {
    return state.svgY
  },
  tempSavedInspection: (state) => {
    return state.tempSavedInspection
  },
  uploadInspectionPayload: (state) => {
    return state.uploadInspectionPayload
  },
}
export const mutations = {
  ...resource.mutations,
  addWarning: function(state, payload) {
    var warningPresent =
      state.svgWarnings.filter((warning) => {
        return warning.id === payload.id
      }).length > 0
    if (!warningPresent) {
      state.svgWarnings.push(payload)
    }
  },
  removeWarning: function(state, payload) {
    var warningIndex = state.svgWarnings.findIndex(
      (warning) => warning.id === payload
    )
    if (warningIndex > -1) {
      state.svgWarnings.splice(warningIndex, 1)
    }
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
    state.activeInspectionDate = null
    state.bulkInspection = false
    state.checklist = {}
    state.checklists = []
    state.checklistSvgs = []
    state.diaryFilterByAttention = false
    state.diaryFilterByGroup = 'off'
    state.diaryFilterByImpression = []
    state.diaryFilterByReminder = false
    state.diarySearch = null
    state.generalInspections = []
    state.inspectionEdited = false
    state.parsedOfflineInput = null
    state.selectedInspectionId = null
    state.svgColumnCounter = 0
    state.svgItemCounter = 0
    state.svgMaxPageNr = null
    state.svgPageNr = 1
    state.svgPositionSet = {}
    state.svgRowHeight = 38
    state.svgWarnings = []
    state.svgY = 0
    state.tempSavedInspection = null
    state.uploadInspectionPayload = null
  },
  resetSvgStates: function(state) {
    state.svgColumnCounter = 0
    state.svgItemCounter = 0
    state.svgMaxPageNr = null
    state.svgPageNr = 1
    state.svgPositionSet = {}
    state.svgRowHeight = 38
    state.svgWarnings = []
    state.svgY = 0
  },
  resetUploadInspectionPayload: function(state, locale) {
    state.uploadInspectionPayload = {
      svg: '',
      images: [],
      settings: {
        return_blob: ['text', 'number', 'checkbox'],
      },
      'data-user-locale': [locale],
      ocr_engine: 'aws',
    }
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
