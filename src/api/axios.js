import router from '@router'
import axios from 'axios'
import store from '@state/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

// On error, dispatch 'signOut' (which redirects to login)
instance.interceptors.response.use(undefined, function(err) {
  return new Promise((resolve, reject) => {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // FIXME error object does not have status etc? createError vs enhanceError?
      // store.dispatch('auth/signOut')
      router.push('/sign-in')
    }
    throw err
  })
})

// const UNAUTHORIZED = 401
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error)
//     const { status } = error.response
//     if (status === UNAUTHORIZED) {
//       router.push('/sign-in')
//     }
//     return Promise.reject(error)
//   }
// )

// Dynamically add API token to requests
// Dynamically add Accept-Language to requests
instance.interceptors.request.use(function(config) {
  config.headers.common['Content-Type'] = 'application/json'
  const apiToken = store.getters['auth/apiToken']
  if (apiToken) {
    config.headers.common.Authorization = 'Bearer ' + apiToken
  }
  const locale = store.getters['auth/userLocale']
  if (locale) {
    config.headers.common['Accept-Language'] = locale
  }
  return config
})

export default instance
