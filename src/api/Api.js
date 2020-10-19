import axios from './axios'

class Api {
  postRequest(url, payload) {
    return axios.post(url, payload)
  }

  readRequest(url, id = '') {
    return axios.get(url + id)
  }

  updateRequest(url, id, payload) {
    return axios.patch(url + id, payload)
  }

  deleteRequest(url, id) {
    return axios.delete(url + id)
  }
}

export default new Api()
