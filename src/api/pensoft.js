import axios from 'axios'

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_PENSOFT_API_URL ||
    import.meta.env.VITE_SOFT_API_URL_FALLBACK,
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
    console.log(error)
    const status = error.response ? error.response.status : 'No response'
    const originalRequest = error.config

    if (
      status !== UNAUTHORIZED &&
      status === 'No response' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      return axios(originalRequest)
    }
    return Promise.reject(error)
  }
)

// Dynamically add API token to requests
// Dynamically add Accept-Language to requests
instance.interceptors.request.use(
  function (config) {
    instance.defaults.headers.common['Content-Type'] = 'application/json'

    instance.defaults.headers.common['token'] = 'token_hash'
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default instance
