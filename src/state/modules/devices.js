import createResource from '@utils/store/vuex-resource'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.

const other = {
  multiple: 'POST devices/multiple',
}
const resource = createResource({ path: 'devices', other })

resource.actions.multiple = (devices) => resource.endpoint.multiple(devices)
export default resource
