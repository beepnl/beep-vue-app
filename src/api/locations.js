import axios from './axios'

export function createApiary(apiary) {
  console.log('creating apiary...' + { apiary })
  return axios.post('/locations', apiary)
}

export function updateApiary(id, apiary) {
  console.log('saving apiary with id: ' + id)
  return axios.patch('/locations/' + id, apiary)
}

export function deleteApiary(id) {
  console.log('deleting apiary with id ' + id)
  return axios.delete('/locations/' + id)
}
