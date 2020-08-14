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

const addDoc = (docData) => {
  const url = 'instruction-documents/add-doc'
  const config = { headers: getHeaders() }
  return client.post(url, docData, config)
}

const addPage = (pageData) => {
  const url = 'instruction-documents/add-page'
  const config = { headers: getHeaders() }
  return client.post(url, pageData, config)
}

export default {
  getDocs,
  getDoc,
  addDoc,
  addPage
}
