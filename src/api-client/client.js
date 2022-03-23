import { API } from 'aws-amplify'

const apiName = 'swapi'

async function client(endpoint, init = {}) {
  const response = await API.get(apiName, endpoint, init)
  return response
}

export { client }
