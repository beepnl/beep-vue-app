import axios from './axios'

export function saveInspection(inspection) {
  return axios.post('/inspections/store', inspection)
}

export function deleteInspection(id) {
  console.log('deleting inspection with id ' + id)
  return axios.delete('/inspections/' + id)
}
