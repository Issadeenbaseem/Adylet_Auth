import { gql } from 'graphql-tag'

import { LocalScheme } from '~auth/runtime'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt,
      user{
        username
        email
      }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation LogOutMutation {
    logOut
  }
`

export const USER_DETAILS_QUERY = gql`
  query UserDetailsQuery {
    me {
      id
      username
      email
    }
  }
`

export default class GraphQLScheme extends LocalScheme {

  constructor(...params) {
    super(...params)

    // This option will prevent $axios methods from being called
    // since we are not using axios
    this.options.token.global = false
  }

  async login(credentials) {
    const {
      apolloProvider: { defaultClient: apolloClient },
      $apolloHelpers,
    } = this.$auth.ctx.app

    // Ditch any leftover local tokens before attempting to log in


    // Make login request
    const response = await apolloClient
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: credentials,
      })
      .then(({ data }) => data && data.login)

      this.token.set(response.jwt)

    // Set your graphql-token
    const res = await $apolloHelpers.onLogin(response.jwt)


    // Fetch user
    await this.fetchUser()

    // Update tokens
    return response.jwt
  }

  fetchUser() {

    const {
      apolloProvider: { defaultClient: apolloClient },
    } = this.$auth.ctx.app

    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // Try to fetch user
    return apolloClient
      .query({
        query: USER_DETAILS_QUERY,
        fetchPolicy: 'no-cache',

      })
      .then(({ data }) => {
        console.log(data)
        if (!data.me) {
          const error = new Error(`User Data response not resolved`)
          return Promise.reject(error)
        }

        this.$auth.setUser(data.me)

        return data.me
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })
  }

  async logout() {
    const {
      apolloProvider: { defaultClient: apolloClient },
      $apolloHelpers,
    } = this.$auth.ctx.app

    // await apolloClient
    //   .mutate({
    //     mutation: LOGOUT_MUTATION,
    //   })
    //   .catch(() => {
    //     // Handle errors
    //   })

    // But reset regardless
    $apolloHelpers.onLogout()
    return this.$auth.reset({ resetInterceptor: false })
   // return this.$auth.reset({ resetInterceptor: false })
  }

  initializeRequestInterceptor() {
 // Instead of initializing axios interceptors, Do nothing
    // Since we are not using axios
  }

  reset() {
    this.$auth.setUser(false)
    this.token.reset()
  }
}
