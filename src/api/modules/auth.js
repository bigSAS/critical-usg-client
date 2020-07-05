import { client, getHeaders } from '../client'


const authenticate = (email, password) => {
  return client.post('token-auth', { email, password }, { headers: getHeaders() })
}

const register = (email, password, passwordRepeat) => {
  const data = {
    email,
    password,
    'password_repeat': passwordRepeat
  }
  return client.post('register-user', data, { headers: getHeaders() })
}

export default {
  getHeaders,
  authenticate,
  register
}
