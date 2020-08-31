import axios from './axios'

export function saveInspection(inspection) {
  return axios.post('/inspections/store', inspection)
}
