import axios from 'axios'
import store from '@state/store'
import { ApiEndpoint } from 'axios-actions'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

// Global axios settings
axiosInstance.interceptors.response.use(undefined, function(err) {
  return new Promise((resolve, reject) => {
    // On error, dispatch 'signOut', which redirects to login
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      store.dispatch('auth/signOut')
    }
    throw err
  })
})

axiosInstance.interceptors.request.use(function(config) {
  config.headers.common['Content-Type'] = 'application/json'
  const apiToken = store.getters['auth/apiToken']
  if (apiToken) {
    // Dynamically add API token to requests
    config.headers.common.Authorization = 'Bearer ' + apiToken
  }
  return config
})

/**
 * Extends ApiEndpoint with auto-refresh and auto-commit
 *
 * fetches index after a modifying CUD operation and
 * commits the results to a vuex store module
 *
 */
class VuexResource extends ApiEndpoint {
  constructor(config, mutation) {
    super(axiosInstance, config)
    this
      // auto refresh index after CUD operation
      .when('create update delete', () => this.index())
      // commit data to store
      .when('index', (data) => {
        store.commit(mutation, data)
      })
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
export default function createEndpoint({
  config = {},
  path = config.path,
  mutation = 'SET_DATA',
}) {
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
    ...config,
  }
  const endpoint = new VuexResource(apiConfig, path + '/' + mutation)

  return {
    state: {
      data: {},
    },
    mutations: {
      [mutation]: function(state, data) {
        // axios provides a fresh object.
        state.data = data
      },
    },
    getters: {},
    actions: {
      init() {
        // fetch the models
        endpoint.index()
      },

      index() {
        return endpoint.index()
      },
      read() {
        return endpoint.read()
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
