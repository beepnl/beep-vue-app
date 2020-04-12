import createEndpoint from '@utils/store/vuex-resource'

const module = createEndpoint({ path: 'hives' })

// add some custom methods before exporting the store module
module.getters.getHivesForApiary = (state) => (locationId) => {
  return (
    (state.data.hives &&
      state.data.hives.filter((hive) => hive.location_id === locationId)) ||
    []
  )
}

export default module
