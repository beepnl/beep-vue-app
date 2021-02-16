import createResource from '@utils/store/vuex-resource'

const resource = createResource({ path: 'alerts' })

export const state = {
  ...resource.state,
  activeAlertRule: null,
  alertRuleEdited: false,
  alertRules: [],
}
export const getters = {
  ...resource.getters,
  activeAlertRule: (state) => {
    return state.activeAlertRule
  },
  alertRules: (state) => {
    return state.alertRules || []
  },
  alertRuleEdited: (state) => {
    return state.alertRuleEdited
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
  },
}
export const actions = {
  ...resource.actions,
}
