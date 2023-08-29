import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.VUE_APP_PENSOFT_API_URL ||
    process.env.VUE_APP_PENSOFT_API_URL_FALLBACK,
})

// On 401 error, reset user and redirect to login
const UNAUTHORIZED = 401
instance.interceptors.response.use(
  (response) => response,
  (error) => {
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
instance.interceptors.request.use(function(config) {
  config.headers.common['Content-Type'] = 'application/json'
  // eslint-disable-next-line dot-notation
  config.headers.common['token'] = 'token_hash'
  return config
})

export default instance
