import { client, getHeaders } from '../client'

const getDocs = ({page, limit, filter}) => {
  const url = filter ? 'instruction-documents/search-docs' : 'instruction-documents/list-docs'
  const data = filter ? { page, limit, search: filter } : { page, limit }
  const config = { headers: getHeaders() }
  return client.post(url, data, config)
}

const getDoc = ({slug}) => {
  const url = 'instruction-documents/get-doc'
  const data = { document_slug: slug }
  const config = { headers: getHeaders() }
  return client.post(url, data, config)
}

export default {
  getDocs,
  getDoc
}
