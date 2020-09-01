import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'checklists' })

export const actions = {
  ...resource.actions,
  getChecklistTaxonomy: function({ _ }, checklistId) {
    const taxonomy = resource.endpoint.read(checklistId)
    if (taxonomy) {
      return taxonomy
    }
    return false
  },
}
