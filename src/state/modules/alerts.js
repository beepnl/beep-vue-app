import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'alerts' })

export const state = {
  ...resource.state,
  activeAlertRule: null,
  alertRuleEdited: false,
  alertRules: [],
  alertRulesChecked: false,
  alerts: [],
}
export const getters = {
  ...resource.getters,
  activeAlertRule: (state) => {
    return state.activeAlertRule
  },
  alertRuleEdited: (state) => {
    return state.alertRuleEdited
  },
  alertRules: (state) => {
    return state.alertRules || []
  },
  alertRulesChecked: (state) => {
    return state.alertRulesChecked
  },
  alerts: (state) => {
    return state.alerts || []
  },
}
export const mutations = {
  ...resource.mutations,
  setData: function(state, payload) {
    state[payload.prop] = payload.value
  },
  resetState: function(state) {
    state.alertRuleEdited = false
    state.activeAlertRule = null
    state.alertRules = []
    state.alertRulesChecked = false
    state.alerts = []
  },
}
export const actions = {
  ...resource.actions,
}
