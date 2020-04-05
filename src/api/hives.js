import axios from '@api/axios'
import { ApiEndpoint } from 'axios-actions'

const hives = new ApiEndpoint(axios, 'hives/:id')

export default hives
