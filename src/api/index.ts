import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'http://localhost:5110/api'

if (!isDevelopment) {
  baseURL = 'http://localhost:5110/api/v1'
}

const api = axios.create({
  baseURL
})

// use this to handle errors gracefully
 api.interceptors.response.use(
  (response) => response,
 (error) => {
   if (error.response.status === 500) {
    throw new Error(error.response.data)
  }
  })

export default api
