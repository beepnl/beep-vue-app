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
  images: (state) => {
    return state.data.images || []
  },
}
export const mutations = {
  ...resource.mutations,
}
export const actions = {
  ...resource.actions,
  findAll: function({ _ }) {
    const images = resource.endpoint.index()
    if (images) {
      return images // automatically committed by SET_DATA after index()
    }
    return false
  },
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
