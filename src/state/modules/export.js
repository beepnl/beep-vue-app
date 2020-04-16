import createResource from '@utils/store/vuex-resource'

const other = {
  csv: 'POST export/csv',
}
// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'export', other })

// proxy actions for other methods
resource.actions.csv = () => resource.endpoint.csv()
export default resource
