import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
export default ctx => {
  const ssrMiddleware = setContext((_, { headers }) => {
    if (process.client) return headers
    return {
      headers
    }
  })
const httpLink = new createUploadLink({
    uri: process.env.BACKEND_URL||"http://127.0.0.1:1337/graphql"
  })
const link = from([ httpLink])


  return {
    link,

    defaultHttpLink: false
  }
}
