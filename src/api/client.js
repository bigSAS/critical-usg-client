import axios from 'axios';
const DEBUG = true  // todo: read from env var

const getBaseUrl = () => {
  return DEBUG
    ? 'http://localhost:5000/api/'
    : '???' // todo: read from env var
}

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
  baseURL: getBaseUrl(),
  timeout: 60000,
  headers: getRequestHeaders()
})

cli.interceptors.response.use(
  (okResponse) => okResponse,
  (errorResponse) => {
    // todo: global err handling? => transofrm into {validationErrors: [], otherErrors[]}
    return Promise.reject(errorResponse)
  }
)

export const client = cli
export const getHeaders = getRequestHeaders
