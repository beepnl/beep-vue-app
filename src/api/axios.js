import router from '@router'
import store from '@state/store'
import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.VUE_APP_API_URL || process.env.VUE_APP_BASE_API_URL_FALLBACK,
})

// On 401 error, reset user and redirect to login
const UNAUTHORIZED = 401
instance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    const status = error.response ? error.response.status : 'No response'
    const originalRequest = error.config

    if (status === UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true
      store.dispatch('auth/signOut')
      return router.push('/sign-in')
      // router.push('/sign-in')
      // router.push('/401')
    } else if (status === 'No response' && !originalRequest._retry) {
      // router.push('/loading')
      originalRequest._retry = true
      return axios(originalRequest)
    }

    return Promise.reject(error)
  }
)

// Dynamically add API token to requests
// Dynamically add Accept-Language to requests
instance.interceptors.request.use(
  function(config) {
    // Alter defaults after instance has been created
    instance.defaults.headers.common['Content-Type'] = 'application/json'

    const apiToken = store.getters['auth/apiToken']
    if (apiToken) {
      config.headers.Authorization = 'Bearer ' + apiToken
    }

    const locale = store.getters['auth/userLocale']
    if (locale) {
      instance.defaults.headers.common['Accept-Language'] = locale
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default instance
