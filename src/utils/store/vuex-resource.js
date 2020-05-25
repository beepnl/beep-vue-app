import axios from '@api/axios'
import store from '@state/store'
import { ApiEndpoint } from 'axios-actions'

// TODO: proxy loading and error states

/**
 * Extends ApiEndpoint with auto-refresh and auto-commit
 *
 * fetches index after a modifying CUD operation and
 * commits the results to a vuex store module
 *
 */
class VuexResource extends ApiEndpoint {
  constructor(config, mutation) {
    super(axios, config)
    this
      // auto refresh index after CUD operation
      .when('create update delete', () => this.index())
      // commit data to store
      .when('index', (data) => store.commit(mutation, data))
      // return data from the response
      .use('data')
  }
}

/**
 * Constructs an endpoint with default CRUD actions that persists
 * its data to the store
 *
 * @return
 *   An extensible vuex store object with {state, mutations, getters, actions}
 */
export default function createResource({ path, other = {} }) {
  // Merge parameters into axios config record
  const apiConfig = {
    ...{
      // Override default axios-actions simple string config for BEEP backend
      // because verbs differ and CORS preflight fails due to backend redirect
      // for trailing slash
      index: path, // GET
      create: path, // POST
      read: `${path}/:id`, // GET
      update: `PUT ${path}/:id`,
      delete: `DELETE ${path}/:id`,
    },
    ...other,
  }
  const endpoint = new VuexResource(apiConfig, path + '/SET_DATA')

  return {
    endpoint,
    state: {
      data: {},
    },
    mutations: {
      SET_DATA: function(state, data) {
        // axios provides a fresh object.
        state.data = data
      },
    },
    getters: {},
    actions: {
      index() {
        return endpoint.index()
      },
      read(id) {
        return endpoint.read(id)
      },
      create(payload) {
        return endpoint.create(payload)
      },
      update(payload) {
        return endpoint.update(payload)
      },
      delete(payload) {
        return endpoint.delete(payload)
      },
    },
  }
}
