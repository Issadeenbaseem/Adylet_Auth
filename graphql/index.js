import { setContext } from 'apollo-link-context'
import { from } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { HttpLink } from 'apollo-link-http'

export default ({ $config: { baseUrlGraphql } }) => {
  const headersConfig = setContext(() => ({
    credentials: 'same-origin',

  }))

  return {
    link: from([
      headersConfig,
      // anotherCustomLink,
      createUploadLink({
        credentials: 'include',
        uri:process.env.BACKEND_URL||"http://127.0.0.1:1337/graphql",
        fetch: (uri, options) => {
          return fetch(uri, options)
        },
      }),
    ]),
  }
}



//   uri: process.env.BACKEND_URL||"http://127.0.0.1:1337/graphql"
