import axios from './axios'

export function createChecklist(checklist) {
  return axios.post('/checklists', checklist)
}

export function updateChecklist(id, checklist) {
  console.log('saving checklist with id: ' + id)
  return axios.patch('/checklists/' + id, checklist)
}

export function deleteChecklist(id) {
  console.log('deleting checklist with id ' + id)
  return axios.delete('/checklists/' + id)
}
