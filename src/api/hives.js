import axios from '@api/axios'
import { ApiEndpoint } from 'axios-actions'

// Cannot use default config because of CORS redirect
const hives = new ApiEndpoint(axios, {
  index: 'hives', // GET
  create: 'hives', // POST
  read: 'hives/:id', // GET
  update: 'PUT hives/:id',
  delete: 'DELETE hives/:id',
})
hives.use('data')

export default hives
