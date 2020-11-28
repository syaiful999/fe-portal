import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import ApolloClient from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { GRAPHQL } from '../config/config.json'
import { createBasicAuthentication } from '../utils/basic-auth'

const {
  API_ENDPOINT_EXTERNAL,
  API_ENDPOINT,
  API_USERNAME,
  API_PASSWORD,
  API_SOCKET_ENDPOINT,
  API_SOCKET_USERNAME,
  API_SOCKET_PASSWORD
} = GRAPHQL

const cache = new InMemoryCache()
const originURL = window.location.hostname
const internalURL = /[10.68.11.47|localhost]/
const isInternal = internalURL.test(originURL)
const httpLink = new HttpLink({
  uri: isInternal ? API_ENDPOINT : API_ENDPOINT_EXTERNAL,
  headers: {
    Authorization: createBasicAuthentication({
      username: API_USERNAME,
      password: API_PASSWORD,
    }),
    token: localStorage.getItem('token'),
  },
})
const uploadLink = createUploadLink({
  uri: isInternal ? API_ENDPOINT : API_ENDPOINT_EXTERNAL,
  headers: {
    Authorization: createBasicAuthentication({
      username: API_USERNAME,
      password: API_PASSWORD,
    }),
    token: localStorage.getItem('token'),
  },
})

const wsLink = new WebSocketLink({
  uri:API_SOCKET_ENDPOINT,
  options:{ 
    reconnect:true, 
    connectionParams:{ 
      auth:createBasicAuthentication({
        username: API_SOCKET_USERNAME,
        password: API_SOCKET_PASSWORD
      }),
      token: localStorage.getItem('token'), 
    } 
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink, uploadLink, httpLink
)

const getClientConfig = () => {
  return new ApolloClient({ link, cache })
}
export default getClientConfig
