import axios from 'axios';


const getRequestHeaders = () => {
  let headers = {
    'Content-Type': 'application/json'
  }
  const token = window.localStorage.getItem('CUSG_TOKEN')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

const cli = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 60000,
  headers: getRequestHeaders()
})

cli.interceptors.response.use(
  (okResponse) => okResponse,
  (error) => {
    // todo: global err handling? => transofrm into {validationErrors: [], otherErrors[]}
    console.log('error response', error.response)
    return Promise.reject(error.response)
  }
)

export const client = cli
export const getHeaders = getRequestHeaders
