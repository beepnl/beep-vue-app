import axios from './axios'
import pensoft from './pensoft'

class Api {
  pensoftPostRequest(payload = null) {
    return pensoft.post('scan', payload)
  }

  postRequest(url, payload = null) {
    return axios.post(url, payload)
  }

  postRequestWithHeaders(url, payload, headers) {
    return axios.post(url, payload, { headers })
  }

  putRequest(url, payload) {
    return axios.put(url, payload)
  }

  readRequest(url, id = '') {
    return axios.get(url + id)
  }

  updateRequest(url, id, payload) {
    return axios.patch(url + id, payload)
  }

  deleteRequest(url, id, payload = null) {
    return axios.delete(url + id, { data: payload })
  }

  checkConnection() {
    // FIXME: do a lightweight unauthed ping (HEAD?) request to check if API is up
    // return axios.head('/')
    return axios.get('/settings')
  }
}

export default new Api()
