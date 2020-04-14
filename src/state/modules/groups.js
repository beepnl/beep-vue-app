import createResource from '@utils/store/vuex-resource'

const other = {
  checktoken: 'POST groups/checktoken',
  detach: 'DELETE groups/detach/{id}',
}
// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'groups', other })

// proxy actions for other methods
resource.actions.checktoken = () => resource.endpoint.checktoken()
resource.actions.detach = (id) => resource.endpoint.detach(id)
export default resource
