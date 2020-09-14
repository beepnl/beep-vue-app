import createResource from '@utils/store/vuex-resource'
import * as Api from '@api/images.js'

// Make sure the location path matches the module path,
// or provide an explicit mutation otherwise.
const resource = createResource({ path: 'images' })

export const state = {
  ...resource.state,
}
export const getters = {
  ...resource.getters,
}
export const mutations = {
  ...resource.mutations,
}
export const actions = {
  ...resource.actions,
  saveImage: function({ _ }, data, headers) {
    return Api.saveImage(data, headers).then((response) => {
      return response
    })
  },
  deleteImage: function({ _ }, data) {
    return Api.deleteImage(data).then((response) => {
      return response
    })
  },
}
