import createResource from '@utils/store/vuex-resource'
import * as Api from '@api/checklists.js'

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
  saveChecklist: function({ _ }, checklistUpdate) {
    if (checklistUpdate.id !== null) {
      return Api.updateChecklist(checklistUpdate.id, checklistUpdate)
        .then(() => {
          return true
        })
        .catch((error) => {
          // Error 😨
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request)
          } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message)
          }
          console.log(error)
        })
    }
    // TODO: else -> createChecklist
  },
}
