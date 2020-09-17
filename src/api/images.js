import axios from './axios'

export function saveImage(data, headers) {
  return axios.post('/images', data, { headers })
}

export function deleteImage(data) {
  console.log('deleting image with url ' + data.image_url)
  return axios.delete('/images', { data })
}
