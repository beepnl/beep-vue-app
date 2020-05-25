import createResource from '@utils/store/vuex-resource'

const other = {
  index: 'GET inspections/lists',
  read: 'GET inspections/hive/:id',
  create: 'POST inspections/store',
  update: 'POST inspections/store',
  delete: 'DELETE inspections/:id',
}

const resource = createResource({ path: 'inspections', other })

resource.actions.getInspectionsForHives = function({ _ }, hives) {
  return Promise.all(
    hives.map((hive) => resource.endpoint.read(hive.id))
  ).then((data) => data.reduce((all, item) => all.concat(item.inspections), []))
}

export default resource
