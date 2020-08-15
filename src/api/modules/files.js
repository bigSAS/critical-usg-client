import {client, getHeaders} from "src/api/client";

const getFileHeaders = () => {
  let base = getHeaders()
  base['Content-Type'] = 'multipart/form-data'
  return base
}

const uploadFile = (fileData) => {
  return client.post('files/add', fileData, { headers: getFileHeaders() })
}

export default {
  uploadFile
}
