import { client, getHeaders } from '../client'


const authenticate = (email, password) => {
  return client.post('token-auth', { email, password }, { headers: getHeaders() })
}

const getUserData = () => {
  return client.post('get-user-data', {}, { headers: getHeaders() })
}

const register = (email, username, password, passwordRepeat) => {
  const data = {
    email,
    username,
    password,
    'password_repeat': passwordRepeat
  }
  return client.post('register-user', data, { headers: getHeaders() })
}

export default {
  getHeaders,
  authenticate,
  register,
  getUserData
}
