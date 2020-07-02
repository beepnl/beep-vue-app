import axios from './axios'

export function saveHiveSettings(id, hive) {
  console.log('saving... to: /hives/' + id)
  return axios.put('/hives/' + id, hive)
}

export function deleteHive(id) {
  console.log('deleting hive with id ' + id)
  return axios.delete('/hives/' + id)
}
