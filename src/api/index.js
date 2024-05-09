import axios from 'axios'
import { API_URL } from '../utils/constants'

const instance = axios.create({
  baseURL: API_URL.baseURL,
  timeout: 0,
})

const api = {
  notes: {
    get: (id) => instance.get(`/notes/${id}`),
    getAll: () => instance.get('/notes'),
    create: (content) => instance.post('/notes', { content }),
    update: (id, content) => instance.update('/notes', { id, content }),
    delete: (id) => instance.post(`/notes/${id}`),
  }
}

export const tokenRequestInterceptor = async (req) => {
  return {
    ...req,
    headers: {
      ...req.headers,
      // Autherization can be added here
    },
  }
}

const responseSuccessHandler = (response) => response;
const responseErrorHandler = (error) => {
  if (error?.response?.status === 401) {
    // To Avoid invlid user access
    localStorage.clear()
    window.location.reload()
  }

  return Promise.reject(error)
}

instance.interceptors.request.use(tokenRequestInterceptor)
instance.interceptors.response.use(
  response => responseSuccessHandler(response),
  error => responseErrorHandler(error)
)

export default { instance, ...api }